import BlogList from "@/components/custom/BlogList";
import { baseApiUrl } from "@/lib/config";

import Image from "next/image";
import { getSession } from "next-auth/react";
import { getBlogs } from "@/lib/utils";

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
