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

	// cors
	if (url?.includes("/api")) {
		NextResponse.next().headers.append("Access-Control-Allow-Origin", "*");
	}
}, {});
