import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { authOptions } from "@/lib/authOptions";
import Link from "next/link";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getServerSession } from "next-auth";
import BlogLike from "./BlogLike";
dayjs.extend(relativeTime);

export default async function BlogCard({ blog }) {
	const sessionData = await getServerSession(authOptions);

	return (
		<Card className='min-h-[490px] flex flex-col justify-evenly'>
			<CardHeader>
				<div style={{ height: "200px", overflow: "hidden" }}>
					<img
						src={blog?.image || "/images/default-blog.jpg"}
						className='card-img-top'
						style={{ objectFit: "cover", height: "100%", width: "100%" }}
						alt={blog.title}
					/>
				</div>
				<CardTitle>
					<h3 className='card-title'>
						<Link
							href={`/blogs/${blog.slug}`}
							className='font-semibold hover:text-purple-500'>
							{blog.title}
						</Link>
					</h3>
				</CardTitle>
				<CardDescription className='w-full flex flex-row justify-between'>
					<div className='flex flex-col'>
						<small className='text-slate-600'>Category: {blog.category}</small>
						<small className='text-slate-600'>
							Author: {blog?.postedBy?.name || "Random user"}
						</small>
					</div>

					<div className='flex flex-col'>
						<small className='text-slate-600'>
							Location: {blog?.location || "Random user"}
						</small>
						<small className='text-slate-600'>
							Posted {dayjs(blog.createdAt).fromNow()}
						</small>
					</div>
				</CardDescription>
			</CardHeader>

			<CardContent>
				<div
					dangerouslySetInnerHTML={{
						__html:
							blog.content.length > 120
								? `${blog.content.substring(0, 120)}...<br/> `
								: blog.content,
					}}></div>

				<Link
					href={`/blogs/${blog.slug}`}
					className='font-semibold hover:text-purple-500'>
					see more
				</Link>
			</CardContent>

			<CardFooter className='flex justify-between content-end'>
				{/* <small className='text-slate-600 '>
					❤️ {blog?.likes?.length} likes
				</small> */}

				<BlogLike blog={blog} />

				<div className='w-1/2 flex flex-row justify-evenly '>
					<Link href={`/blogs/${blog.slug}`}>
						<Button variant='outline' className=' hover:text-purple-800'>
							View More
						</Button>
					</Link>

					{sessionData?.user?.id == blog?.postedBy?.id ? (
						<div className='flex flex-row justify-between'>
							<Link href={"/blogs/edit/" + blog.slug}>
								<Button variant='outline' className=' hover:text-purple-800'>
									Edit
								</Button>
							</Link>
						</div>
					) : null}
				</div>
			</CardFooter>
		</Card>
	);
}
