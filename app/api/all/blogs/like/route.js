import prisma, { connectToDb, disconnectFromDb } from "@/prisma";
import { NextResponse } from "next/server";

export async function PUT(req) {
	await connectToDb();
	const _req = await req.json();

	console.log("\n\n<<<<<=====<<<<<====<<<<<\n");
	console.log("_req  ===>\n");
	console.log(_req);
	console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");

	try {
		const blog = await prisma.blog.findFirst({
			where: { id: _req.blogId },
		});

		console.log("\n\n<<<<<=====<<<<<====<<<<<\n");
		console.log("server blog likes ===>\n");
		console.log(blog.likes);
		console.log("blog _req.userId ===>\n");
		console.log(_req.userId.toString());
		console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");

		// blog.likes = blog.likes.push(`${25522}`);
		blog.likes.splice(0, 0, _req.userId.toString());

		console.log("\n\n<<<<<=====<<<<<====<<<<<\n");
		console.log(" server blog likes after* ===>\n");
		console.log(blog.likes);
		console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");

		delete blog.id;
		const updatedBlog = await prisma.blog.update({
			where: { id: _req.blogId },
			data: {
				...blog,
			},
		});

		console.log("\n\n<<<<<=====<<<<<====<<<<<\n");
		console.log("updatedBlog server  ===>\n");
		console.log(updatedBlog);
		console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");

		return NextResponse.json({ updatedBlog, msg: "liked" }, { status: 200 });

		// const updatedBlog = await prisma.blog.update({
		// 	where: { id: _req.blogId },
		// 	data: {
		// 		likes: {
		// 			connect: {
		// 				where: { id: _req.userId },
		// 			},
		// 		},
		// 	},
		// });
		// const updatedBlog = await prisma.blog.update({
		// 	where: { id: _req.blogId },
		// 	data: {
		// 		likes: {
		// 			push: _req.userId,
		// 		},
		// 	},
		// });
	} catch (err) {
		console.log("\n\n++--++--++--++--++--++--");
		console.log("err ======>");
		console.log(err);
		console.log("++--++--++--++--++--++--\n\n");

		return NextResponse.json({ err: err.message }, { status: 500 });
	} finally {
		await disconnectFromDb();
	}
}
