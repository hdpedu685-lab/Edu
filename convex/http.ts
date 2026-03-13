import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { auth } from "./auth";

const http = httpRouter();

http.route({
	path: "/",
	method: "GET",
	handler: httpAction(async () => {
		return new Response(
			JSON.stringify({
				ok: true,
				service: "convex",
				authConfig: "/.well-known/openid-configuration",
				jwks: "/.well-known/jwks.json",
			}),
			{
				status: 200,
				headers: {
					"content-type": "application/json; charset=utf-8",
					"cache-control": "no-store",
				},
			},
		);
	}),
});

auth.addHttpRoutes(http);

export default http;
