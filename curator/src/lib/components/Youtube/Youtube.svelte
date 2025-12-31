<script lang="ts">
	import { onMount } from 'svelte';
	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat';

	async function fetchYoutubeMetadata(videoID: string, apiKey: string) {
		const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,player,contentDetails,statistics&id=${videoID}&key=${apiKey}`;

		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Fetch Youtube error: ${response.status}`);
		}

		const data = await response.json();
		const video = data.items?.[0];

		if (!video) {
			throw new Error('Video not found');
		}

		console.log(video);

		return {
			snippets: video.snippet,
			contentDetails: video.contentDetails,
			player: video.player,
			statistics: video.statistics
		};
	}

	let youtubeURL = $state('Vdy1Jup1jHA');

	let title = $derived('');
	let description = $state('');
	let channelTitle = $state('');
	let thumbnails = $state('');
	let duration = $state('');
	let player = $state('');
	let channelID = $state('');
	let publishedDate = $state('');
	let viewCount = $state('');

	dayjs.extend(customParseFormat);

	function parseYouTubeDuration(duration: string) {
		const regex = /P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
		const matches = duration.match(regex);

		if (!matches) return null;

		const days = parseInt(matches[1] || 0, 10);
		const hours = parseInt(matches[2] || 0, 10);
		const minutes = parseInt(matches[3] || 0, 10);
		const seconds = parseInt(matches[4] || 0, 10);

		const parts = [];
		if (days) parts.push(`${days}d`);
		if (hours) parts.push(`${hours}h`);
		if (minutes) parts.push(`${minutes}m`);
		if (seconds) parts.push(`${seconds}s`);
		return parts.join(' ') || '0s';
	}

	onMount(async () => {
		const video = await fetchYoutubeMetadata(youtubeURL, API);
		const { snippets, contentDetails: details, player: vPlayer, statistics } = video;
		player = vPlayer;
		title = snippets.title;
		description = snippets.description;
		publishedDate = snippets.publishedAt;
		thumbnails = snippets.thumbnails.standard.url;
		duration = details.duration;
		channelTitle = snippets.channelTitle;
		channelID = snippets.channelID;
		viewCount = statistics.viewCount;
	});
</script>

<div style="font-family: Verdana, 'Segoe UI', sans-serif; font-size: 16px">
	<h2 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 1.2rem">{title}</h2>
	<div style="margin-bottom: 1rem">
		<figure style="width: 100%">
			<img style="width: 100%" src={thumbnails} alt="thumbnail" />
		</figure>
	</div>
	<div style="margin-bottom: 1rem">
		<iframe
			style="width: 100%;aspect-ratio: 16/9;"
			src="https://www.youtube.com/embed/vIzopZRbMso?si=Gi26b7n5kpxPLtz5"
			{title}
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
		></iframe>
	</div>
	<div style="font-weight: 600">
		By <a href={channelID}>{channelTitle}</a>
		<div style="font-size: 0.8rem">
			{dayjs(publishedDate).format('MM/DD/YYYY')}<br />
			{parseYouTubeDuration(duration)}<br />
			{Number(viewCount).toLocaleString('en-US')} views
		</div>
	</div>

	<div style="padding: 1.6rem">
		{@html description.replace(/\n/g, '<br/>')}
	</div>
</div>

<!-- <style>
	iframe {
		width: 100%;
		aspect-ratio: 16/9;
	}
</style> -->
