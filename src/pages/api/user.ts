import type { APIRoute } from "astro";
import type { GetUser } from "../../types/user";

const clientID = await import.meta.env.CLIENT_ID;

export const GET: APIRoute = async ({ params, request }) => {
	if (request.headers.get("Content-Type") === "application/json") {
		const params = new URL(request.url).searchParams;
		const userGet = await fetch("https://api.twitch.tv/helix/users?login=" + params.get("broadcaster"), {
			headers: {
				"Authorization": "Bearer " + params.get("access_token"),
				"Client-Id": clientID
			}
		});

		const response = await userGet.json() as GetUser;
	  	return new Response(JSON.stringify(response), {
		 	status: 200
	  	})
	}
	return new Response(null, {
      status: 400
   });
}