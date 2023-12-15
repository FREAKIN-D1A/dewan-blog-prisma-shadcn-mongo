import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { baseApiUrl } from "./config";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export async function getBlogs(searchParams) {
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
