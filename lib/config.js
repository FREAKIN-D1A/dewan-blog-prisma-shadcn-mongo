import path from "path";

export const baseUrl =
	process.env.NODE_ENV === "production"
		? process.env.NEXT_PUBLIC_PRODUCTION_URL
		: process.env.NEXT_PUBLIC_DEV_URL;

// export const baseApiUrl = path.join(baseUrl, "api");
export const baseApiUrl = baseUrl + "/api";
