import { NextResponse } from "next/server";
import prisma, { connectToDb, disconnectFromDb } from "@/prisma";

export async function GET(req, context) {
	await connectToDb();
	try {
		const blog = await prisma.blog.findFirst({
			where: { slug: context.params.slug },
			include: { postedBy: true },
		});

		console.log("\n\n<<<<<=====<<<<<====<<<<<\n");
		console.log("blog  ===>\n");
		console.log(blog);
		console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");

		if (blog) {
			return NextResponse.json(
				{ success: "blog found successfully", blog: blog },
				{ status: 200 }
			);
		} else {
			return NextResponse.json({ err: "Blog blog found not" }, { status: 400 });
		}
	} catch (error) {
		console.log("\n\n<<<<<=====<<<<<====<<<<<\n");
		console.log("error  ===>\n");
		console.log(error);
		console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");
	} finally {
		await disconnectFromDb();
	}
}
