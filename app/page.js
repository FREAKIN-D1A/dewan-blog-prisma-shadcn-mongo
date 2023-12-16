import BlogList from "@/components/custom/BlogList";
import { baseApiUrl } from "@/lib/config";

import Image from "next/image";
import { getSession } from "next-auth/react";
import Logo from "@/components/custom/Logo";
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

export default async function Home({ searchParams }) {
	const { blogs, currentPage, totalPages } = await getBlogs(searchParams);

	const session = await getSession();

	// console.log("\n\n+=+=+=+=+=+=+=+=+=+=+=+=\n");
	// console.log("session response  ===>\n");
	// console.log(session);
	// console.log("\n+=+=+=+=+=+=+=+=+=+=+=+=\n\n");

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<section className='bg-white bg-opacity-90 text-gray-800 py-16'>
				<div className='container mx-auto text-center flex flex-row justify-center items-center '>
					{/* <Image
					src={
						"https://img.freepik.com/free-photo/online-message-blog-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg?w=1380&t=st=1700922551~exp=1700923151~hmac=211b9c9d15076a6cb9e011ec554dc6f6b20736484d457172b02648b6f4b0120d"
					}
					alt='Welcome Image'
					width={800}
					height={800}
					objectFit='cover'
					className='rounded-md mb-8'
				/> */}
					<div className='m-4'>
						<h1 className='text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4'>
							Welcome to DBlog
						</h1>
						<p className='text-base md:text-lg lg:text-xl'>
							Share your thoughts....
							<br />
							Register or Login to write a new blog.
						</p>
					</div>
				</div>
				<hr className='p-2 m-4' />
			</section>

			<h1 className='lead text-4xl text-center font-bold mb-5'>Latest Blogs</h1>
			<BlogList blogs={blogs} />
		</main>
	);
}
