/**
 * Fetches current user information from Karakeep
 */
export async function getKarakeepUser(serverUrl: string, apiKey: string) {
	// Removes trailing slash and adds api path
	const baseUrl = serverUrl.replace(/\/$/, '') + '/api/v1';

	const response = await fetch(`${baseUrl}/users/me`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json'
		}
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || `Error: ${response.status}`);
	}

	return await response.json();
}
