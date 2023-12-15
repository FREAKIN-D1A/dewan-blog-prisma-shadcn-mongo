import BlogList from "@/components/custom/BlogList";
import { baseApiUrl } from "@/lib/config";

import Image from "next/image";
import { getSession } from "next-auth/react";
// import { getBlogs } from "@/lib/utils";
async function getBlogs(searchParams) {
	// console.log("\n\n<<<<<=====<<<<<====<<<<<\n");
	// console.log("searchParams  ===>\n");
	// console.log(searchParams);
	// console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");

	const urlParams = {
		page: searchParams.page || 1,
	};
	const searchQuery = new URLSearchParams(urlParams).toString();
	const fetchUrl = baseApiUrl + "/all/blogs/?" + searchQuery;

	// console.log("\n\n<<<<<=====<<<<<====<<<<<\n");
	// console.log("fetchUrl  ===>\n");
	// console.log(fetchUrl);
	// console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");

	try {
		const response = await fetch(fetchUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			// cache: "force-cache",
		});

		if (!response.ok) {
			throw new Error("Failed to fetch  blogs");
		}

		const data = await response.json();
		return data; // {blogs, currentPage, totalPages}
	} catch (error) {
		console.log("\n\n<<<<<=====<<<<<====<<<<<\n");
		console.log("error  ===>\n");
		console.log(error);
		console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");
	}
}

export default async function Home({ searchParams }) {
	const { blogs, currentPage, totalPages } = await getBlogs(searchParams);

	const session = await getSession();

	console.log("\n\n+=+=+=+=+=+=+=+=+=+=+=+=\n");
	console.log("session response  ===>\n");
	console.log(session);
	console.log("\n+=+=+=+=+=+=+=+=+=+=+=+=\n\n");

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<p className='lead text-primary text-center'>Latest Blogs</p>

			<BlogList blogs={blogs} />
		</main>
	);
}
