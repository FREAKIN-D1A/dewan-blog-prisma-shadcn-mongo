import slugify from "slugify";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import prisma, { connectToDb, disconnectFromDb } from "@/prisma";
import queryString from "query-string";

export async function GET(req) {
	await connectToDb();

	const searchParams = queryString.parseUrl(req.url).query; // ?page=2
	// const _req = await req.json();

	// console.log("\n\n<<<<<=====<<<<<====<<<<<\n");
	// console.log("searchParams  function GET ===>\n");
	// console.log(searchParams);
	// console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");

	const { page } = searchParams || {};
	const pageSize = 6;

	try {
		const currentPage = Number(page) || 1; // current page
		const skip = (currentPage - 1) * pageSize; // skip
		const totalBlogs = await prisma.blog.count(); // count the blogs

		// const blogs = await prisma.blog.findMany();
		const blogs = await prisma.blog.findMany({
			take: pageSize,
			skip: skip,
			orderBy: {
				createdAt: "desc",
			},
			include: { postedBy: true },
		});

		return NextResponse.json(
			{
				success: "Blogs get request. successfully",
				blogs: blogs,
				currentPage,
				totalPages: Math.ceil(totalBlogs / pageSize),
			},
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
		const { title, content, category, location, image } = _req;
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

		console.log("\n\n+=+=+=+=+=+=+=+=+=+=+=+=\n");
		console.log("token  ===>\n");
		console.log(token);
		console.log("\n+=+=+=+=+=+=+=+=+=+=+=+=\n\n");

		// create blog
		const blog = await prisma.blog.create({
			data: {
				title,
				content,
				category,
				location,
				image: image ? image : null,
				postedById: token.user.id,
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
