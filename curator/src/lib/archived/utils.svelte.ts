// export function categorizeMediabyType(content: string) {
// 	const mediaMatch =
// 		/<media\s+src=["']?(?<src>[^"'\s>]+)["']?\s+type=["']?(?<type>[^"'\s>]+)["']?\s*>/g;

// 	const replaceMedia = (match: string, src: string, type: string) => {
// 		if (type.includes('image')) {
// 			return `<img style='max-width: 100%; height: auto' src=${src}>`;
// 		}

// 		if (type == 'video/mp4') {
// 			return `<video style='width:100%' controls class="w-full mx-auto rounded-md shadow-md"><source src=${src} type=${type} />Your browser does not support the video tag.</video>`;
// 		}
// 	};

// 	return content.replace(mediaMatch, replaceMedia);
// }
