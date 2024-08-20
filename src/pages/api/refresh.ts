import type { APIRoute } from "astro";
import type { Tokens } from "../../types/tokens";

const clientID = await import.meta.env.CLIENT_ID;
const clientSecret = await import.meta.env.CLIENT_SECRET;

export const POST: APIRoute = async ({ request }) => {
	if (request.headers.get("Content-Type") === "application/json") {
		const params = new URL(request.url).searchParams;
		const getNewTokens = await fetch("https://id.twitch.tv/oauth2/token", {
			method: "POST",
			headers: {
				"Content-type": "application/x-www-form-urlencoded"
			},
			body: "client_id=" + clientID
				+ "&client_secret=" + clientSecret
				+ "&grant_type=refresh_token"
				+ "&refresh_token=" + params.get("token")
		});

		const response = await getNewTokens.json() as Tokens;
	  	return new Response(JSON.stringify(response), {
		 	status: 200
	  	})
	}
	return new Response(null, {
      status: 400
   });
}