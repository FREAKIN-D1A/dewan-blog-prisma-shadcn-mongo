import BlogList from "@/components/custom/BlogList";
import { baseApiUrl } from "@/lib/config";

import Image from "next/image";
import { getSession } from "next-auth/react";
import Link from "next/link";

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
			cache: "no-store",
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

async function BlogsDisplayPage({ searchParams }) {
	const session = await getSession();

	const { blogs, currentPage, totalPages } = await getBlogs(searchParams);

	const hasPreviousPage = currentPage > 1;
	const hasNextPage = currentPage < totalPages;

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<h1 className='lead text-primary text-5xl font-bold text-center my-4'>
				All Blogs
			</h1>
			<BlogList blogs={blogs} />
			<div className='flex justify-center mt-8'>
				<nav aria-label='Page navigation'>
					<ul className='flex gap-2 text-sm font-medium'>
						{hasPreviousPage && (
							<li className='rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200'>
								<Link href={`?page=${currentPage - 1}`} className='px-3 py-2'>
									Previous
								</Link>
							</li>
						)}

						{Array.from({ length: totalPages }, (_, i) => i + 1).map(
							(pageNumber) => (
								<li
									key={pageNumber}
									className={`rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 ${
										pageNumber === currentPage
											? "bg-gray-200 text-gray-900 font-bold"
											: ""
									}`}>
									<Link href={`?page=${pageNumber}`} className='px-3 py-2'>
										{pageNumber}
									</Link>
								</li>
							)
						)}

						{hasNextPage && (
							<li className='rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200'>
								<Link href={`?page=${currentPage + 1}`} className='px-3 py-2'>
									Next
								</Link>
							</li>
						)}
					</ul>
				</nav>
			</div>
		</main>
	);
}

export default BlogsDisplayPage;
