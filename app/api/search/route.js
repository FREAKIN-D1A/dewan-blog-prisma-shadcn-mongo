import prisma, { connectToDb, disconnectFromDb } from "@/prisma";
import { NextResponse } from "next/server";
import queryString from "query-string";

export async function GET(req) {
	try {
		await connectToDb();
		const { searchQuery } = queryString.parseUrl(req.url).query;

		console.log("\n\n<<<<=====<<<<====<<<<\n");
		console.log("searchQuery route ===>\n");
		console.log(searchQuery);
		console.log("\n>>>>>====>>>>>=====>>>>\n\n");

		const searchQuerySafe = searchQuery ? searchQuery.trim() : undefined;

		const blogs = await prisma.blog.findMany({
			where: {
				OR: [
					//@ts-ignore
					{ title: { contains: searchQuerySafe } }, //@ts-ignore
					// { content: { contains: searchQuerySafe } }, //@ts-ignore
					// { description: { contains: searchQuerySafe } }, //@ts-ignore
					// { category: { contains: searchQuerySafe } }, //@ts-ignore
				],
			},
		});

		console.log("\n\n<<<<=====<<<<====<<<<\n");
		console.log("searchQuery blogs  route ===>\n");
		console.log(blogs);
		console.log("\n>>>>>====>>>>>=====>>>>\n\n");

		return NextResponse.json(
			{ message: "success. all blogs get", blogs },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "error. all blogs get", error },
			{ status: 500 }
		);
	} finally {
		await disconnectFromDb();
	}
}
