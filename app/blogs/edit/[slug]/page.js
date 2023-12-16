import EditBlog from "@/components/custom/EditBlog";
import { authOptions } from "@/lib/authOptions";
import { baseApiUrl } from "@/lib/config";
import { getServerSession } from "next-auth";
import React from "react";

async function getBlog(slug) {
	const fetchUrl = baseApiUrl + "/all/blogs/" + slug;

	console.log("\n\n<<<<<=====<<<<<====<<<<<\n");
	console.log("fetchUrl  ===>\n");
	console.log(fetchUrl);
	console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");
	try {
		const response = await fetch(fetchUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			cache: "no-store",
		});

		if (!response.ok) {
			throw new Error("Failed to fetch  blogs");
		}

		const data = await response.json();

		console.log("\n\n<<<<<=====<<<<<====<<<<<\n");
		console.log("fetchUrl  data ===>\n");
		console.log(data);
		console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");

		return data.blog;
	} catch (error) {
		console.log("\n\n<<<<<=====<<<<<====<<<<<\n");
		console.log("error  ===>\n");
		console.log(error);
		console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");
	}
}

export default async function EditPage(context) {
	const slug = context.params.slug;
	const blog = await getBlog(slug);
	const { user } = await getServerSession(authOptions);

	console.log("\n\n<<<<<=====<<<<<====<<<<<\n");
	console.log("user ===>\n");
	console.log(user);
	console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");

	return (
		<div>
			<h1 className='text-6xl font-bold mb-8'>
				Hello.{user.name} This is your edit page:
			</h1>
			<EditBlog user={user} blog={blog} />
		</div>
	);
}
