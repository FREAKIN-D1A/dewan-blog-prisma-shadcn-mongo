import BlogLike from "@/components/custom/BlogLike";
import { baseApiUrl } from "@/lib/config";

async function getBlog(slug) {
	const fetchUrl = baseApiUrl + "/all/blogs/" + slug;

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
			next: { revalidate: 2 },
		});

		if (!response.ok) {
			throw new Error("Failed to fetch  blogs");
		}

		const data = await response.json();

		// console.log("\n\n<<<<<=====<<<<<====<<<<<\n");
		// console.log("fetchUrl  data ===>\n");
		// console.log(data);
		// console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");

		return data.blog;
	} catch (error) {
		console.log("\n\n<<<<<=====<<<<<====<<<<<\n");
		console.log("error  ===>\n");
		console.log(error);
		console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");
	}
}

export default async function Blog(context) {
	const slug = context.params.slug;

	// console.log("\n\n<<<<<=====<<<<<====<<<<<\n");
	// console.log("slug  ===>\n");
	// console.log(slug);
	// console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");

	const blog = await getBlog(slug);

	// console.log("\n\n<<<<<=====<<<<<====<<<<<\n");
	// console.log("blog final****  ===>\n");
	// console.log(blog);
	// console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");

	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
			<h1 className='text-6xl font-bold mb-8'>{blog.title}</h1>
			<img src={blog.image} alt={blog.title} className='w-3/4 mb-8' />

			<div className='w-3/4 p-8 bg-white shadow-lg rounded-md'>
				<h1 className='text-2xl font-bold mb-8'>content :</h1>
				<div
					className='text-xl mb-8'
					dangerouslySetInnerHTML={{
						__html: blog.content,
					}}></div>

				<div className='grid grid-cols-2 gap-4'>
					<div>
						<p className='text-gray-600 mb-4'>
							<span className='font-bold'>Category:</span> {blog.category}
						</p>
						<p className='text-gray-600 mb-4'>
							<span className='font-bold'>Location:</span> {blog.location}
						</p>
						{/* <small className='text-slate-600 '>
							❤️ {blog?.likes?.length} likes
						</small> */}
						<BlogLike blog={blog} />
					</div>
					<div>
						<p className='text-gray-600 mb-4'>
							<span className='font-bold'>Posted By:</span> {blog.postedBy.name}
						</p>
						<p className='text-gray-600 mb-4'>
							<span className='font-bold'>Posted At:</span>{" "}
							{new Date(blog.createdAt).toLocaleString()}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
