import slugify from "slugify";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import prisma, { connectToDb, disconnectFromDb } from "@/prisma";

export async function GET(req) {
	await connectToDb();
	const _req = await req.json();

	try {
		const blogs = await prisma.blog.findMany();
		return NextResponse.json(
			{ success: "Blogs get request. successfully", blogs: blogs },
			{ status: 200 }
		);
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

export async function POST(req) {
	await connectToDb();
	const _req = await req.json();

	try {
		const { title, content, category, image } = _req;
		switch (true) {
			case !title:
				return NextResponse.json({ err: "Title is required" }, { status: 400 });
			case !content:
				return NextResponse.json(
					{ err: "Content is required" },
					{ status: 400 }
				);
			case !category:
				return NextResponse.json(
					{ err: "Category is required" },
					{ status: 400 }
				);
		}

		// check if blog title is taken

		// const existingBlog = await Blog.findOne({
		// 	slug: slugify(title?.toLowerCase()),
		// });
		const existingBlog = await prisma.blog.findFirst({
			where: { slug: slugify(title?.toLowerCase()) },
		});

		if (existingBlog) {
			return NextResponse.json({ err: "Blog title is taken" }, { status: 400 });
		}

		// get current user's id
		const token = await getToken({
			req,
			secret: process.env.NEXTAUTH_SECRET,
		});

		// create blog
		const blog = await prisma.blog.create({
			data: {
				title,
				content,
				category,
				image: image ? image : null,
				postedBy: token.user._id,
				slug: slugify(title),
			},
		});

		return NextResponse.json(
			{ success: "new blog created successfully", blog: blog },
			{ status: 200 }
		);
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
