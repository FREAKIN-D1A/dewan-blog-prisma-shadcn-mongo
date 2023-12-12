import prisma, { connectToDb, disconnectFromDb } from "@/prisma";
import { NextResponse } from "next/server";

export async function PUT(req, context) {
	await connectToDb();

	const _req = await req.json();

	console.log("\n\n<<<<<=====<<<<<====<<<<<\n");
	console.log("_req  ===>\n");
	console.log(_req);
	console.log("context  ===>\n");
	console.log(context);
	console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");

	// const userId = context.params.id;
	try {
		const updatedBlog = await prisma.user.update({
			where: {
				id: context.params.userId,
			},
			data: {
				image: _req.url,
			},
		});

		return NextResponse.json(
			{ success: "updatedBlog. ", updatedBlog },
			{ status: 500 }
		);
	} catch (error) {
		console.log("\n\n++--++--++--++--++--++--");
		console.log("error ======>");
		console.log(error);
		console.log("++--++--++--++--++--++--\n\n");

		return NextResponse.json(
			{ err: "Server error. Try again" },
			{ status: 500 }
		);
	} finally {
		await disconnectFromDb();
	}
}
