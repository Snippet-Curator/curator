// ------ Pocketbase ------
// attachments
export type Resource = {
    name: string
    size: number
    hash: string
    type: string
    lastUpdated: string
    fileURL: string // this is pocketbase url
    oldFileURL?: string // this is original pocketbase URL if merge notes. Used to replace to new URL after merge
    sourceURL?: string
    width?: number
    height?: number
    timestamp?: string
    latitude?: number
    longitude?: number
    cameraMake?: string
}

export type PError = {
    data: {
        data: {
            added: {
                code: string,
                message: string
            },
            title: {
                code: string,
                message: string
            },
            name: {
                code: string,
                message: string
            },
        },

    },
    message: string,
    status: number,
}

export type Note = {
    id: string,
    title: string
    content: string
    "original_content": string
    notebook: string
    added: string
    last_opened: string
    created: string
    updated: string
    status: 'active' | 'archived' | 'deleted'
    attachments: string[]
    tags: string[]
    expand?: {
        notebook?: Notebook,
        tags?: Tag[]
    }
    weight: number
    score: number
    rating: number
    description: string,
    thumbnail: string,
    sources?:
    {
        source: string,
        source_url: string
    }[],
    resources?: Resource[]
}

export type NoteRecord = {
    items: Note[]
    page: number,
    perPage: number,
    totalItems: number,
    totalPages: number
}

export type Notebook = {
    id: string
    name: string
    children?: Notebook[]
    parent?: string
    note_count: number
}

export type Tag = {
    id: string
    name: string
    children?: Tag[],
    expand: {
        notes_via_tags: Note[]
    },
    parent?: string
    note_count: number
    status: 'pinned' | undefined
}

export type NoteList = {
    items: Note[]
}

export type Setting = {
    id: string
    name: string
    value: string | number
}

// ------ Frontend ------
export interface Props {
    data: {
        note?: Note
        notes?: Note[]
        notebook?: Notebook
        notebooks?: Notebook[]
        tag?: Tag
        tags?: Tag[]
    }
}

// ------ Parser ------ 

export type EnResource = {
    data: {
        "#text": string
    },
    hash?: string,
    file?: File,
    fileURL?: string,
    name?: string,
    height: number,
    size?: number,
    width: number,
    mime: string,
    "resource-attributes": {
        "file-name": string,
        "source-url": string,
        'camera-make'?: string,
        timestamp?: string,
        latitude?: number
        longitude?: number
    }
}

export type EnMedia = {
    hash: string,
    style: string,
    type: string
}

export type EnMedias = {
    "en-note": {
        "en-media": EnMedia | EnMedia[]
    }
}

export type EnNote = {
    "en-export": {
        note: {
            title: string,
            content: string,
            created: string,
            updated: string,
            "note-attributes": {
                source: string,
                "source-url": string
            },
            tag: string | string[],
            resource?: EnResource | EnResource[]
        }
    }
}

// ------ DB ------


export type NoteType = {
    type: 'tags' | 'notebooks' | 'default' | 'archive' | 'trash',
    id?: string
}

