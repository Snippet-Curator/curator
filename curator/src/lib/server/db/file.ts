import { type Note, type Resource } from '$lib/types';
import * as cheerio from 'cheerio';

/**
 * Merges sources into a list of unique sources
 */
export function mergeSources(notes: Note[]) {
	const allSources = notes.flatMap((n) => n.sources || []);

	const uniqueSources = Array.from(
		new Map(allSources.map((src) => [`${src.source}|${src.source_url}`, src])).values()
	);
	return uniqueSources;
}

/**
 * Merge old resource list and/or new resource list. If both are empty, return undefined
 */
export function mergeResources(
	originalResources: Resource[] | undefined | null,
	newResources: Resource | Resource[] | undefined | null
) {
	const newResourceList = Array.isArray(newResources)
		? newResources
		: newResources
			? [newResources]
			: [];
	const oldResourceList = Array.isArray(originalResources)
		? originalResources
		: originalResources
			? [originalResources]
			: [];

	if (oldResourceList.length === 0 && newResourceList.length === 0) return [];

	const all = [...oldResourceList, ...newResourceList];

	try {
		// Deduplicate by resource.hash
		const seen = new Set();
		const deduped = [];

		for (const res of all) {
			if (!seen.has(res.hash)) {
				seen.add(res.hash);
				deduped.push(res);
			}
		}
		return deduped;
	} catch (e) {
		console.log(e);
		return all;
	}
}

/**
 * parses out head and body of content, clears out all min-h and h-screen styles. Return cleaned version
 */
function getContentBeforeMerge(noteContent: string) {
	const $ = cheerio.load(noteContent);

	const head = $('head');
	const body = $('body');

	if (!head.length || !body.length) {
		return {
			head: '',
			body: ''
		};
	}

	// Remove problematic Tailwind-style classes from all elements
	body.find('[class]').each((_, el) => {
		const classAttr = $(el).attr('class') || '';

		const classes = classAttr.split(/\s+/);

		const filtered = classes.filter(
			(c) =>
				!c.startsWith('min-h-') &&
				!c.startsWith('min-w-') &&
				!c.startsWith('h-screen') &&
				!c.startsWith('w-screen')
		);

		$(el).attr('class', filtered.join(' '));
	});

	// Remove min-height inline styles
	body.find('[style]').each((_, el) => {
		const style = $(el).attr('style') || '';

		if (style.includes('min-height')) {
			const newStyle = style
				.split(';')
				.filter((s) => !s.trim().startsWith('min-height'))
				.join(';');

			$(el).attr('style', newStyle);
		}
	});

	// removes style min-height
	head.find('style').each((_, el) => {
		const cleaned =
			$(el)
				.html()
				?.replace(/min-height\s*:[^;]+;?/gi, '') ?? '';

		$(el).html(cleaned);
	});

	const wrapped = `<div style="all: unset; display: block;">${body.html()}</div>`;

	return {
		head: head.html() ?? '',
		body: wrapped
	};
}

/**
 * gets a list of notes and then merge their content into one final HTML
 */
export function mergeNotesContent(notes: Note[]) {
	let mergedHead: string[] = [];
	let mergedBody: string[] = [];

	for (const note of notes) {
		const { head, body } = getContentBeforeMerge(note.content);
		mergedHead.push(head);
		mergedBody.push(body);
	}

	const finalHead = mergedHead.join('\n');
	const finalBody = mergedBody.join('\n\n<br/>\n\n');

	const finalHTML = `
			<!DOCTYPE html>
			<html>
			<head>
				${finalHead}
			</head>
			<body>
				${finalBody}
			</body>
			</html>`.trim();
	return finalHTML;
}

/**
 * creates pocketbase merged data from set of notes ready to be added to db
 */
export function createMergedNoteData(notes: Note[], newResources: Resource[]) {
	const [base, ...rest] = notes;
	let content = mergeNotesContent(notes);

	for (const resource of newResources) {
		if (!resource.oldFileURL) continue;
		content = content.replace(resource.oldFileURL, resource.fileURL);
	}

	return {
		title: base.title,
		notebook: base.notebook,
		tags: [...new Set(notes.flatMap((n) => n.tags || []))],
		last_opened: new Date().toISOString(),
		sources: mergeSources(notes),
		resources: mergeResources(base.resources, newResources),
		description: notes.map((n) => n.description).join('\n\n'),
		content: content,
		original_content: content
	};
}
