"use client";
import { useEffect, useState } from "react";
import prisma, { connectToDb, disconnectFromDb } from "@/prisma";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";

export default function BlogLike(props) {
	let blog = props.blog;
	const pathname = usePathname();
	const router = useRouter();
	const { toast } = useToast();

	const { data, status } = useSession();
	const [likes, setLikes] = useState(blog.likes) || [];
	const isLiked = likes?.includes(data?.user?.id);

	// console.log("\n\n<<<<<=====<<<<<====<<<<<\n");
	// console.log(" { data, status } = useSession();  ===>\n");
	// console.log({ data, status });

	// console.log("likes ===>\n");
	// console.log(likes);

	// console.log(" data?.user?.id ===>\n");
	// console.log(data?.user?.id);
	// console.log(typeof data?.user?.id);

	// console.log(" props.blog?.likes ===>\n");
	// console.log(props.blog?.likes);
	// console.log(typeof props.blog?.likes);

	// console.log("isLiked ===>\n");
	// console.log(isLiked);
	// console.log(typeof isLiked);

	// console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");

	// console.log("\n\n<<<<<=====<<<<<====<<<<<\n");
	// console.log(" { likes, isLiked, pathname }  ===>\n");
	// console.log({ likes, isLiked, pathname });
	// console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");

	const handleLike = async () => {
		if (status !== "authenticated") {
			router.push(`/login?callbackUrl=${pathname}`);
			return;
		}
		try {
			if (isLiked) {
				// already liked? unlike
				const answer = window.confirm("Are you sure you want to unlike?");
				if (answer) {
					toast({
						title: " Blog unliked successfully !",
					});
					handleUnlike();
					// router.push(`${pathname}`);
				}
			} else {
				toast({
					title: " Blog liked successfully !",
				});

				// like
				const response = await fetch(`/api/all/blogs/like`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ blogId: blog?.id, userId: data?.user?.id }),
					cache: "no-store",
				});

				const res = await response.json();

				console.log("\n\n<<<<<=====<<<<<====<<<<<\n");
				console.log("res client  ===>\n");
				console.log(res);
				console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");

				blog = res.updatedBlog;
				setLikes(blog.likes);
				// router.refresh();
				// router.push(`${pathname}`);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleUnlike = async () => {
		try {
			const response = await fetch(`/api/all/blogs/unlike`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ blogId: blog?.id, userId: data?.user?.id }),
				cache: "no-store",
			});

			if (!response.ok) {
				throw new Error("Failed to handleUnlike blog");
			} else {
				// toast({
				// 	title: " Blog unliked successfully !",
				// });

				const res = await response.json();

				console.log("\n\n<<<<<=====<<<<<====<<<<<\n");
				console.log("res client  ===>\n");
				console.log(res);
				console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");

				blog = res.updatedBlog;
				setLikes(blog.likes);
				// router.refresh();
				// router.push(`${pathname}`);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<small onClick={handleLike} className='cursor-pointer'>
				{/* {JSON.stringify(likes)} */}
				<span>❤️ {likes?.length} likes</span>
			</small>
		</>
	);
}
