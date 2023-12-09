export const baseUrl =
	process.env.NODE_ENV === "production"
		? process.env.NEXT_PUBLIC_PRODUCTION_URL
		: process.env.NEXT_PUBLIC_DEV_URL;

export const baseApiUrl = path.join(baseApiUrl, "api");