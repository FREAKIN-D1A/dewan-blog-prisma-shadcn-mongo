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
		console.log("blog likes ===>\n");
		console.log(blog.likes);
		console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");

		blog.likes = blog.likes.filter((id) => id != _req.userId);

		console.log("\n\n<<<<<=====<<<<<====<<<<<\n");
		console.log("blog likes after* ===>\n");
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
		console.log("updatedBlog  ===>\n");
		console.log(updatedBlog);
		console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");

		return NextResponse.json({ msg: "unliked", updatedBlog }, { status: 200 });
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
