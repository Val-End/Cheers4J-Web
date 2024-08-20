import type { APIRoute } from "astro";
import type { Subscription } from "../../types/subscription";

const clientID = await import.meta.env.CLIENT_ID;

export const GET: APIRoute = async ({ params, request }) => {
	if (request.headers.get("Content-Type") === "application/json") {
		const params = new URL(request.url).searchParams;
		const subscribe = await fetch("https://api.twitch.tv/helix/eventsub/subscriptions", {
			method: "POST",
			headers: {
				"Authorization": "Bearer " + params.get("access_token"),
				"Client-Id": clientID,
				"Content-type": "application/json"
			},
			body: JSON.stringify({
            type: "channel.cheer",
            version: "1",
            condition: {
               broadcaster_user_id: params.get("broadcaster")
            },
            transport: {
               method: "websocket",
               session_id: params.get("session")
            }
         })
		});

      const data = await subscribe.json() as Subscription
	  	return new Response(JSON.stringify(data), {
		 	status: 200
	  	})
	}
	return new Response(null, {
      status: 400
   });
}