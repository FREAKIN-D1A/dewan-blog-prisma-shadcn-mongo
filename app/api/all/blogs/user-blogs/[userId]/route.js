import { NextResponse } from "next/server";
import prisma, { connectToDb, disconnectFromDb } from "@/prisma";

export async function GET(req, context) {
	await connectToDb();

	try {
		const blogs = await prisma.blog.findMany({
			where: { postedById: context.params.userId },
			include: { postedBy: true },
		});

		console.log("\n\n<<<<<=====<<<<<====<<<<<\n");
		console.log("blogs  ===>\n");
		console.log(blogs);
		console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");

		return NextResponse.json(
			{ success: "user blogs found successfully", blogs: blogs },
			{ status: 200 }
		);
	} catch (error) {
		console.log("\n\n<<<<<=====<<<<<====<<<<<\n");
		console.log("error  ===>\n");
		console.log(error);
		console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");

		return NextResponse.json({ err: "user blog found not" }, { status: 400 });
	} finally {
		await disconnectFromDb();
	}
}
