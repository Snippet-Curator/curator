export async function fetchYoutubePlaylist(apiKey: string, playlistID: string) {
	const response = await fetch(
		`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistID}&key=${apiKey}`
	);

	if (!response.ok) {
		throw new Error(`Fetch Youtube error: ${response.status}`);
	}

	const data = await response.json();

	console.log(data);
	return data;
}
