// page.js
import { authOptions } from "@/lib/authOptions";
import { baseApiUrl } from "@/lib/config";
import { getServerSession } from "next-auth";
import UserEdit from "@/components/custom/UserEdit";
import BlogList from "@/components/custom/BlogList";

async function getUserBlogs(id) {
	try {
		const fetchUrl = baseApiUrl + "/all/blogs/user-blogs/" + id;
		const response = await fetch(fetchUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			next: { revalidate: 60 },
		});
		if (!response.ok) {
			throw new Error("Failed to fetch  blogs");
		}

		const data = await response.json();

		console.log("\n\n<<<<<=====<<<<<====<<<<<\n");
		console.log("data  ===>\n");
		console.log(data);
		console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");

		return data.blogs;
	} catch (error) {
		console.log("\n\n<<<<<=====<<<<<====<<<<<\n");
		console.log("error  ===>\n");
		console.log(error);
		console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");
	}
}

export default async function Profile() {
	const sessionData = await getServerSession(authOptions);
	const user = sessionData.user;

	console.log("\n\n<<<<<=====<<<<<====<<<<<\n");
	console.log("sessionData  ===>\n");
	console.log(sessionData);
	console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");

	const blogs = await getUserBlogs(user.id);

	console.log("\n\n<<<<<=====<<<<<====<<<<<\n");
	console.log("blogs  ===>\n");
	console.log(blogs);
	console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");

	// const handleImas
	return (
		<div className='mx-auto w-full  flex flex-col items-center justify-center bg-gray-50'>
			<h1 className='text-4xl font-bold mb-6'>Profile</h1>
			<UserEdit user={user} />
			<div className='w-1/3 p-8 bg-white shadow-lg rounded-md mt-8'>
				<p className='text-lg font-semibold mb-2'>{user.name}</p>
				<p className='text-gray-600 mb-2'>{user.email}</p>
				<p className='text-gray-600 mb-2'>{user.role}</p>
			</div>
			<div className='mt-4'>
				<h3 className='text-center text-black text-4xl font-bold mb-6'>
					Your Blogs:
				</h3>
				<BlogList blogs={blogs} />
			</div>
		</div>
	);
}
