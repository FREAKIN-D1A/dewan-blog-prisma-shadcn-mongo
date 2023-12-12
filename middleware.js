import { withAuth } from "next-auth/middleware";
// export { default } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const config = {
	matcher: [
		"/:path*/test/:path*",
		"/:path*/profile/:path*",
		"/:path*/blogs/add/:path*",
	],
};

export default withAuth(async function middleware(req) {
	const url = req.nextUrl.pathname;
	const userRole = req?.nextauth?.token?.user?.role;

	console.log("\n\n<*<*<*<*<*<*<*<*<*<*<*<*<*<*\n");
	console.log(" {url,userRole}  ===>\n");
	console.log({ url, userRole });
	console.log("\n>*>*>*>*>*>*>*>*>**>*>*>*>*>*\n\n");

	// cors
	if (url?.includes("/api")) {
		NextResponse.next().headers.append("Access-Control-Allow-Origin", "*");
	}
}, {});
