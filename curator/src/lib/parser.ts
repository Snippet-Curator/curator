import SparkMD5 from 'spark-md5';
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'

import type { EnNote, EnMedia, EnResource, Resource, PError } from './types';
import pb, { uploadFileToPocketbase } from '$lib/db.svelte'
import { tryCatch } from './utils.svelte';
import type { RecordModel } from 'pocketbase';
import { addAsOnlyFileToRecord, addMediaToContent, addResourcesToRecord, addThumbnailToRecord, createDescription, createThumbnail, deleteAllAttachments, getFileHash, getMimeFromName, getVideoThumb, makeResourceFromFile, mergeResources, parser, parseYouTubeDuration } from './utils';
import { notesCollection } from './const';

dayjs.extend(customParseFormat)

export class htmlImport {
    title: string | 'Untitled'
    content: string
    parsedHTML: Document
    source: string | null
    sourceURL: string | null
    recordID: string
    added: string
    description: string | null
    selectedNotebookdID: string
    selectedTagIdArrays: string[]
    HTMLparser: DOMParser
    resources: Resource[]
    bodyResources: Resource[] // this is for thumbnail generation

    constructor(fileContent: string, selectedNotebookID: string, selectedTagIdArrays: string[]) {
        this.HTMLparser = new DOMParser()
        this.content = fileContent
        this.parsedHTML = this.parseHTML(fileContent)
        this.title = this.getTitle()
        this.description = this.getDescription()
        this.source = this.getSource()
        this.sourceURL = this.getSourceURL()
        this.added = this.getAdded()
        this.recordID = ''
        this.selectedNotebookdID = selectedNotebookID
        this.selectedTagIdArrays = selectedTagIdArrays
        this.resources = []
        this.bodyResources = []
    }

    parseHTML(fileContent: string) {
        return this.HTMLparser.parseFromString(fileContent, 'text/html')
    }

    getTitle() {
        return this.parsedHTML.querySelector('title')?.textContent || 'Untitled'
    }

    getDescription() {
        // parse instagram saves with source meta property
        const description = this.parsedHTML.querySelector('meta[property="description"]')

        if (description) {
            return description.getAttribute('content')
        }

        const ogDescription = this.parsedHTML.querySelector('meta[property="og:description"]')?.getAttribute('content')

        if (!ogDescription) return null

        return createDescription(ogDescription)
    }

    getSource() {
        // parse instagram saves with source meta property
        const source = this.parsedHTML.querySelector('meta[property="source"]')

        if (source) {
            return source.getAttribute('content')
        }

        // if not, use regex to match singleFile source
        const match = this.content.match(/url:\s*(.+?)\s+saved date:\s*(.+?)\s*-->/s);

        if (match) {
            return 'SingleFile Save'
        }

        return null
    }

    getSourceURL() {
        const sourceURL = this.parsedHTML.querySelector('meta[property="source-url"]')

        if (sourceURL) {
            return sourceURL.getAttribute('content')
        }

        const match = this.content.match(/url:\s*(.+?)\s+saved date:\s*(.+?)\s*-->/s);

        if (!match || !match[1]) {
            return null
        }

        return match[1];
    }

    getAdded() {
        const added = this.parsedHTML.querySelector('meta[property="added"]')

        if (added && added.textContent) {
            return added.getAttribute('content') || new Date().toISOString()
        }

        const match = this.content.match(/url:\s*(.+?)\s+saved date:\s*(.+?)\s*-->/s);

        if (match) {
            return new Date(match[2]).toISOString()
        }

        return new Date().toISOString()
    }

    base64ToFile(base64: string, mimeType: string) {
        let extension: string = ''
        let filename: string = ''
        let byteCharacters: string = ''
        let hash: string = ''

        try {
            extension = mimeType.split("/")[1];
            filename = `${uuidv4()}.${extension}`;
            byteCharacters = atob(base64);
            hash = SparkMD5.hashBinary(byteCharacters);
        } catch (err) {
            console.error('Error converting resource: ', err)
        }

        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        return {
            file: new File([byteArray], filename, { type: mimeType }),
            hash: hash
        }
    }

    async replaceResources(fileContent: string) {
        if (!fileContent) return
        const bodyContent = this.parsedHTML.querySelector('body')?.outerHTML || ''

        // replaces src with image and font with db file links.
        const mediaMatch = /\b(data:(?:image|font|video)\/[a-zA-Z0-9.+-]+;base64,[A-Za-z0-9+/=]+)\1?/g

        const matches = [...fileContent.matchAll(mediaMatch)].map(m => m[1])
        const bodyMatchSet = new Set([...bodyContent?.matchAll(mediaMatch)].map(m => m[1]))

        let updatedContent = fileContent
        for (const match of matches) {
            const mimeType = match.split(';')[0].split(':')[1] || undefined
            const base64Data = match.split(',')[1]

            if (!base64Data || !mimeType) {
                console.error('Error: invalid data URL format')
                continue
            }

            const { file: resourceFile, hash } = this.base64ToFile(base64Data, mimeType)

            if (!resourceFile) {
                console.error('Error converting resource file')
                continue
            }

            // upload to database
            const fileURL = await uploadFileToPocketbase(this.recordID, resourceFile)

            // add to list of resources
            const resource = makeResourceFromFile(resourceFile, hash, fileURL)
            this.resources.push(resource)

            // replace media with new URL
            if (fileURL) {
                updatedContent = updatedContent.replace(match, fileURL)
            }

            // add matches to bodyMatches
            if (bodyMatchSet.has(match)) {
                this.bodyResources.push(resource)
            }
        }

        this.content = updatedContent;
    }

    stripCSP() {
        const matchPattern = /<meta http-equiv=["]?Content-Security-Policy["]?[^>]*>/ig
        this.content = this.content.replace(matchPattern, '');
    }

    async uploadToDB() {
        const sources = [{
            'source': this.source,
            'source_url': this.sourceURL
        }]

        const skeletonData = {
            'title': this.title,
            'added': this.added,
            'description': this.description,
            'weight': 5,
            'notebook': this.selectedNotebookdID,
            'tags': this.selectedTagIdArrays,
            'last_score_updated': new Date().toISOString(),
            'sources': JSON.stringify(sources),
            'status': 'active'
        }

        const { data: record, error } = await tryCatch(pb.collection(notesCollection).create(skeletonData))

        if (error) {
            if (error.data.data.title.code == "validation_not_unique") {
                throw new Error('Skipped duplicate note')
            }
            throw (error)
        }

        if (!record) return

        this.recordID = record.id

        await this.replaceResources(this.content)
        this.stripCSP()
        const thumbResource = await createThumbnail(this.recordID, this.bodyResources)
        const mergedResource = mergeResources(this.resources, thumbResource) || this.resources

        const data = {
            'content': this.content,
            'original_content': this.content,
            'resources': mergedResource,
        }

        const { data: updatedRecord, error: updatedError } = await tryCatch(pb.collection(notesCollection).update(this.recordID, data))

        if (updatedError) {
            console.error('Error updating record: ', updatedError.message, updatedError.data)
        }
    }
}

export class EnImport {
    enNote: EnNote
    enMedias: EnMedia[] | null
    enResources: EnResource[] | null

    title: string
    content: string
    added: string
    updated: string
    source: string
    sourceURL: string
    tags: string[] | null
    recordID: string
    description: string | null
    selectedNotebookdID: string
    selectedTagsID: string[]

    constructor(fileContent: string, selectedNotebookID: string, selectedTagsID: string[]) {

        this.recordID = ''
        this.selectedNotebookdID = selectedNotebookID
        this.selectedTagsID = selectedTagsID

        const { xmlNote, xmlMedia, xmlContent } = this.parseEnex(fileContent)

        this.enNote = xmlNote
        this.content = xmlContent
        this.enMedias = this.getEnMedias(xmlMedia)
        this.tags = this.getTags()

        this.enResources = this.getEnResources()
        this.title = this.enNote['en-export'].note.title
        this.added = this.getAdded()
        this.updated = this.enNote['en-export'].note.updated
        this.source = this.getSource()
        this.sourceURL = this.getSourceURL()
        this.description = createDescription(this.content)
    }

    parseEnex(fileContent: string) {
        const xmlNote: EnNote = parser.parse(fileContent)
        const xmlMedia: EnMedia = parser.parse(xmlNote['en-export']['note']['content'])['en-note']['en-media']
        const xmlContent = xmlNote['en-export']['note']['content'].match(/<en-note[\s\S]*<\/en-note>/)?.[0] as string

        return {
            xmlNote,
            xmlMedia,
            xmlContent
        }
    }

    getEnMedias(xmlMedia: EnMedia | EnMedia[]) {
        if (!xmlMedia) return null
        return Array.isArray(xmlMedia) ? xmlMedia : [xmlMedia]
    }

    getTags() {
        const tags = this.enNote['en-export'].note.tag
        if (!tags) return null
        return Array.isArray(tags) ? tags : [tags]
    }

    getEnResources() {
        const resources = this.enNote["en-export"]['note']['resource']
        if (!resources) return null
        return Array.isArray(resources) ? resources : [resources]
    }

    getSource() {
        return this.enNote['en-export'].note['note-attributes'].source
    }

    getSourceURL() {
        return this.enNote['en-export'].note['note-attributes']['source-url']
    }

    getAdded() {
        const addedDate = this.enNote['en-export'].note.created
        if (!addedDate) {
            return new Date().toISOString()
        }
        return dayjs(addedDate, 'YYYYMMDDTHHmmss[Z]').toISOString()
    }

    convertResourceToFile(resource: EnResource) {

        let binaryStr: string = ''
        let byteArray: Uint8Array<ArrayBuffer>

        try {
            binaryStr = atob(resource.data['#text']);
            byteArray = new Uint8Array(binaryStr.length)
        } catch (err) {
            console.error('Error converting resource file')
            return
        }

        for (let i = 0; i < binaryStr.length; i++) {
            byteArray[i] = binaryStr.charCodeAt(i);
        }

        const originalMime = resource.mime;
        const fileName = resource['resource-attributes']['file-name'] || 'unknown';
        const correctedMime = getMimeFromName(fileName, originalMime)

        const blob = new Blob([byteArray], { type: correctedMime });

        return new File([blob], fileName, { type: correctedMime });
    }

    async uploadResources() {
        // let files: File[] = []
        if (!this.enResources || this.enResources.length === 0) return
        for (const resource of this.enResources) {
            if (!resource) continue

            // converts to binary and adds hash
            const binaryStr = atob(resource.data['#text']);
            resource.hash = SparkMD5.hashBinary(binaryStr);

            // adds to file
            resource.file = this.convertResourceToFile(resource)

            if (!resource.file) return

            resource.name = resource.file.name
            resource.mime = resource.file.type
            resource.fileURL = await uploadFileToPocketbase(this.recordID, resource.file)
        }
    }

    replaceEnMedia() {
        // replaces en-media with regular html tags within content
        const mediaMatch = /<en-media[^>]+?hash="([a-zA-Z0-9]+)"[^>]*\/?>/g

        if (!this.enResources || this.enResources.length === 0) return

        const enResources = this.enResources

        const replaceMedia = (match: string, hash: string) => {
            const resource = enResources.filter((resource) => {
                return resource.hash == hash
            })

            if (!resource || resource.length === 0) return ''

            if (!resource[0].fileURL) return

            const fileName = resource[0]["resource-attributes"]['file-name'] || 'untitled'
            const originalMime = resource[0].mime;
            const correctedMime = getMimeFromName(fileName, originalMime)

            return addMediaToContent(correctedMime, resource[0].fileURL, fileName)
        }

        this.content = this.content.replace(mediaMatch, replaceMedia);
    }

    async addTags() {
        if (!this.tags) return ['']
        if (this.tags.length == 1 && this.tags[0] == '') return ['']

        const tagList: string[] = []

        const { data: existingTags, error } = await tryCatch<RecordModel[], PError>(pb.collection('tags').getFullList())

        if (error) {
            console.error('Unable to get all tags: ', error.message)
            return ['']
        }

        if (!existingTags) return ['']

        const existingTagNames = new Set(existingTags.map((tag: { name: string }) => tag.name))

        for (const tag of this.tags) {
            if (existingTagNames.has(tag.toLowerCase())) {
                const record = existingTags.find((record: { name: string }) => record.name === tag.toLowerCase())
                tagList.push(record.id)
            } else {
                const { data: newTag, error: newTagError } = await tryCatch<RecordModel[], PError>(pb.collection('tags').create({ 'name': tag.toLowerCase() }))

                if (newTagError) {
                    console.error('Unable to make new tags: ', newTagError.message, tag)
                    return ['']
                }

                if (!newTag) return ['']

                tagList.push(newTag.id)
            }
        }
        return tagList
    }

    makeResourceFromFiles(enResources: EnResource[] | null) {
        if (!enResources) return
        if (enResources.length === 0) return
        let resources: Resource[] = []
        for (const enResource of enResources) {
            const resource: Resource = {
                name: enResource.name,
                size: enResource.file?.size,
                hash: enResource.hash,
                type: enResource.mime,
                fileURL: enResource.fileURL,
                lastUpdated: new Date().toISOString(),
                sourceURL: enResource['resource-attributes']['source-url'],
                width: enResource.width,
                height: enResource.height,
                latitude: enResource['resource-attributes'].latitude,
                longitude: enResource['resource-attributes'].longitude,
                timestamp: enResource['resource-attributes'].timestamp,
                cameraMake: enResource['resource-attributes']['camera-make']
            }
            resources.push(resource)
        }
        return resources
    }

    async uploadToDB() {
        const oldTags = await this.addTags()
        const newTags = this.selectedTagsID || []
        const tags = [...oldTags, ...newTags]
        const sources = [{
            'source': this.source,
            'source_url': this.sourceURL
        }]
        const skeletonData = {
            'title': this.title,
            'added': this.added,
            'tags': tags,
            'weight': 5,
            'notebook': this.selectedNotebookdID,
            'last_score_updated': new Date().toISOString(),
            'sources': JSON.stringify(sources),
            'status': 'active'
        }

        const { data: record, error } = await tryCatch<RecordModel, PError>(pb.collection(notesCollection).create(skeletonData))

        if (error) {
            if (error.data.data.title.code == "validation_not_unique") {
                throw new Error('Skipped duplicate note')
            }
            console.log('Error uploading file: ', error.message, error.data)
            throw (error)
        }

        this.recordID = record.id

        await this.uploadResources()
        this.replaceEnMedia()
        const resources = this.makeResourceFromFiles(this.enResources)
        const thumbResource = await createThumbnail(this.recordID, resources)
        const mergedResource = mergeResources(resources, thumbResource) || resources

        const data = {
            'content': this.content,
            'original_content': this.content,
            'description': this.description,
            'resources': mergedResource
        }

        const { data: updatedRecord, error: updatedError } = await tryCatch(pb.collection(notesCollection).update(this.recordID, data))

        if (updatedError) {
            console.error('Error updating record: ', updatedError.message, error.data)
        }
    }
}

export class fileImport {
    title: string
    file: File
    mimeType: string
    content: string
    added: string
    fileURL: string
    recordID: string
    selectedNotebookdID: string
    selectedTagIdArrays: string[]

    constructor(file: File, selectedNotebookID: string, selectedTagIdArrays: string[]) {
        this.file = file
        this.mimeType = file.type
        this.recordID = ''
        this.fileURL = ''
        this.content = ''
        this.title = `${file.name} ${dayjs(Date()).format('MM-DD-YYYY')}`
        this.selectedNotebookdID = selectedNotebookID
        this.selectedTagIdArrays = selectedTagIdArrays
        this.added = new Date().toISOString()
    }

    async uploadToDB() {

        const sources = [{
            'source': 'Desktop',
            'source_url': ''
        }]

        const skeletonData = {
            'title': this.title,
            'notebook': this.selectedNotebookdID,
            'tags': this.selectedTagIdArrays,
            'last_score_updated': new Date().toISOString(),
            'weight': 5,
            'added': this.added,
            'status': 'active',
            'sources': sources
        }

        const { data: record, error } = await tryCatch<RecordModel, PError>(pb.collection(notesCollection).create(skeletonData))

        if (error) {
            if (error.data.data.title.code == "validation_not_unique") {
                throw new Error('Skipped duplicate note')
            }
            throw (error)
        }

        if (!record) return
        this.recordID = record.id

        this.fileURL = await uploadFileToPocketbase(this.recordID, this.file)
        this.content = addMediaToContent(this.mimeType, this.fileURL, this.file.name)
        const hash = await getFileHash(this.file)
        const resources = [makeResourceFromFile(this.file, hash, this.fileURL)]
        const thumbResource = await createThumbnail(this.recordID, resources)
        const mergedResource = mergeResources(resources, thumbResource) || resources

        const data = {
            'content': this.content,
            'original_content': this.content,
            'resources': mergedResource
        }

        const { data: updatedRecord, error: updatedError } = await tryCatch(pb.collection(notesCollection).update(this.recordID, data))

        if (updatedError) {
            console.error('Error updating record: ', updatedError.message)
        }
    }
}

export class youtubeImport {
    title: string | 'Untitled'
    channelTitle: string
    channelID: string
    source: string | null
    recordID: string
    description: string | null
    content: string
    resources: Resource[]
    youtubeFullURL: string
    youtubeThumbURL: string
    thumbURL: string
    youtubeID: string | undefined
    youtubeAPI: string
    selectedNotebookID: string
    selectedTagIdArrays: string[]
    viewCount: string
    publishedDate: string
    duration: string

    constructor(youtubeFullURL: string, selectedNotebookID: string, selectedTagIdArrays: string[], youtubeAPI: string) {
        this.youtubeFullURL = youtubeFullURL
        this.youtubeID = this.getYoutubeID(youtubeFullURL)
        this.selectedNotebookID = selectedNotebookID
        this.selectedTagIdArrays = selectedTagIdArrays
        this.youtubeAPI = youtubeAPI
        this.youtubeThumbURL = ''
        this.thumbURL = ""
        this.title = ''
        this.channelTitle = ''
        this.description = ''
        this.content = ''
        this.source = 'Youtube'
        this.recordID = ''
        this.resources = []
        this.channelID = ""
        this.viewCount = ""
        this.publishedDate = ""
        this.duration = ""
    }

    getYoutubeID(url: string) {
        if (!url) return

        const patterns = [
            /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
            /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?&]+)/,
            /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([^?&]+)/,
            /^(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?&]+)/,
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match?.[1]) return match[1];
        }

        this.youtubeFullURL = `https://www.youtube.com/watch?v=${url}`
        return url;
    }

    async fetchYoutubeMetadata(videoID: string, apiKey: string) {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoID}&key=${apiKey}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Fetch Youtube error: ${response.status}`);
        }

        const data = await response.json();
        const video = data.items?.[0];

        if (!video) {
            await pb.collection(notesCollection).delete(this.recordID)
            throw new Error('Video not found');
        }

        this.title = video.snippet.title
        this.content = video.snippet.description
        this.description = createDescription(this.content)
        this.youtubeThumbURL = video.snippet.thumbnails.standard?.url ??
            video.snippet.thumbnails.high?.url ??
            video.snippet.thumbnails.medium?.url ??
            video.snippet.thumbnails.default?.url
        this.channelTitle = video.snippet.channelTitle;
        this.channelID = `https://www.youtube.com/${video.snippet.channelID}`
        this.viewCount = video.statistics.viewCount;
        this.publishedDate = video.snippet.publishedAt ?? "";
        this.duration = video.contentDetails.duration ?? "";
    }

    async addThumbnailandResource(youtubeThumbURL: string) {
        if (!youtubeThumbURL) {
            console.log('No youtube thumb')
            return
        }
        // download from youtube
        const response = await fetch(youtubeThumbURL)
        if (!response.ok) {
            console.error(`Error fetching Youtube thumbnail: ${response.status}`);
            return
        }
        const blob = await response.blob();
        const thumbFile = new File([blob], 'youtube-thumbnail.jpg', { type: blob.type });

        // upload file to db
        this.thumbURL = await addAsOnlyFileToRecord(this.recordID, thumbFile)

        // add thumbnail to record
        await addThumbnailToRecord(this.recordID, this.thumbURL)

        // get hash
        const hash = await getFileHash(thumbFile)

        // get and add resource
        const resource = makeResourceFromFile(thumbFile, hash, this.thumbURL)
        this.resources = [resource]
    }

    makeHTML() {
        return `
        <style>
            body {
            font-family: "Concourse4", "Segoe UI", sans-serif;
            font-size: 16px
            }
        </style>
        <body>
        <div style="font-family: var(--font-sans)">
	<h2 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 1.2rem">${this.title}</h2>
	<div style="margin-bottom: 1rem">
	<img style="width: 100%; height: auto" src=${this.thumbURL} alt="thumbnail" />
	</div>
	
	<div style="font-weight: 600">By <a href=${this.channelID}>${this.channelTitle}</a>
        <div style="font-size: 0.8rem">
			${this.publishedDate}<br />
			${this.duration}<br />
			${this.viewCount} views
		</div>
    </div>

	<div style="padding: 1.6rem">
		${this.content?.replace(/\n/g, '<br/>') ?? ""}
	</div>
    <div style="margin-bottom: 1rem">
		<iframe
			style="width: 100%;aspect-ratio: 16/9"
			src="https://www.youtube-nocookie.com/embed/${this.youtubeID}"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
		></iframe>
	</div>
    </div>
    </body> 
`
    }

    async uploadToDB() {
        const skeletonData = {
            'title': this.title,
            'notebook': this.selectedNotebookID,
            'tags': this.selectedTagIdArrays,
            'last_score_updated': new Date().toISOString(),
            'weight': 5,
            'added': new Date().toISOString(),
            'status': 'active',
        }

        const filter = `sources.0.source = "Youtube" && sources.0.source_url ~ "${this.youtubeID}"`

        const { data: record, error } = await tryCatch<RecordModel, PError>(pb.collection(notesCollection).getFirstListItem(filter))

        if (error || !record) {
            const newRecord = await pb.collection(notesCollection).create(skeletonData)
            this.recordID = newRecord.id
        } else {
            this.recordID = record.id
        }

        await this.fetchYoutubeMetadata(this.youtubeID, this.youtubeAPI)
        this.publishedDate = dayjs(this.publishedDate).format('MM/DD/YYYY') ?? ""
        this.duration = parseYouTubeDuration(this.duration) ?? ""
        this.viewCount = Number(this.viewCount).toLocaleString('en-US')

        // add thumbnail and resource
        await this.addThumbnailandResource(this.youtubeThumbURL)

        // make html
        this.content = this.makeHTML()

        const sources = [{
            'source': this.source,
            'source_url': this.youtubeFullURL
        }]

        const data = {
            'title': this.title,
            'sources': sources,
            'description': this.description,
            'content': this.content,
            'original_content': this.content,
            'resources': this.resources
        }

        const { data: updatedRecord, error: updatedError } = await tryCatch(pb.collection(notesCollection).update(this.recordID, data))

        if (updatedError) {
            console.error('Error updating record: ', updatedError.message)
        }
    }

}
