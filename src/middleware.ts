import { defineMiddleware } from "astro:middleware";
const clientID = await import.meta.env.CLIENT_ID;

export const onRequest = defineMiddleware((ctx, nxt) => {
   if(ctx.url.pathname === "/redirect"){
      return Response.redirect("https://id.twitch.tv/oauth2/authorize?" 
         + "response_type=code" 
         + "&client_id=" + clientID
         + "&redirect_uri=" + "http://localhost:4321/info"
         + "&scope=bits%3Aread" 
         + "&state=" + ctx.url.searchParams.get("state"));
   }
   return nxt();
})