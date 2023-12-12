"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function AdminBlogCreate() {
	const router = useRouter();
	const { toast } = useToast();

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [location, setLocation] = useState("");
	const [category, setCategory] = useState("");
	const [image, setImage] = useState("");
	const [loading, setLoading] = useState(false);

	const uploadImage = async (e) => {
		e.preventDefault();
		const file = e.target.files[0];

		if (file) {
			setLoading(true);

			const formData = new FormData();
			formData.append("file", file);
			// formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);

			console.log("\n\n-=-=-=-=--==-=--=-=-=-=--=-=");
			console.log("FormData.file: ---------->");
			console.log(formData.get("file"));
			console.log("\n\n-=-=-=-=--==-=--=-=-=-=--=-=");

			// upload to cloudinary
			try {
				console.log("FormData.file: ---------->");
				console.log(formData.get("file"));
				const response = await fetch(`/api/all/blogs/upload-img`, {
					method: "POST",
					body: formData,
				});

				// setLoading(false);
				const data = await response.json();
				console.log("image upload response >>>>\n ", data.url);
				setImage(data.url);
			} catch (err) {
				setLoading(false);
				console.log(err);
			}

			setLoading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const body = JSON.stringify({ title, content, category, location, image });
		const response = await fetch(`/api/all/blogs`, {
			method: "POST",
			body: body,
		});

		const data = await response.json();

		console.log("\n\n+=+=+=+=+=+=+=+=+=+=+=+=\n");
		console.log("data.blog  ===>\n");
		console.log(data.blog);
		console.log("\n+=+=+=+=+=+=+=+=+=+=+=+=\n\n");

		toast({
			title: " Blog created successfully !",
		});

		setLoading(false);
		router.push("/");
	};

	return (
		<div className='container mx-auto mt-8'>
			<form onSubmit={handleSubmit}>
				<div className='mb-4'>
					<label
						htmlFor='title'
						className='block text-sm font-medium text-gray-600'>
						Title
					</label>
					<input
						type='text'
						id='title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className='mt-1 p-2 w-full border rounded-md'
						placeholder='Enter the title of your blog'
					/>
				</div>

				<div className='mb-4'>
					<label
						htmlFor='category'
						className='block text-sm font-medium text-gray-600'>
						Category
					</label>
					<input
						type='text'
						id='title'
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						className='mt-1 p-2 w-full border rounded-md'
						placeholder='Enter the Category of your blog'
					/>
				</div>

				<div className='mb-4'>
					<label
						htmlFor='location'
						className='block text-sm font-medium text-gray-600'>
						Location
					</label>
					<input
						type='text'
						id='location'
						value={location}
						onChange={(e) => setLocation(e.target.value)}
						className='mt-1 p-2 w-full border rounded-md'
						placeholder='Enter the location of your blog'
					/>
				</div>

				<div className='mb-4'>
					<label
						htmlFor='content'
						className='block text-sm font-medium text-gray-600'>
						Content
					</label>
					<ReactQuill
						className='min-h-fit border rounded-md block'
						value={content}
						id='content'
						onChange={(e) => setContent(e)}
					/>
				</div>

				<div className='flex flex-col justify-between'>
					{image ? (
						<img src={image} alt='preview image' className='w-[500px] mt-3' />
					) : null}
					<div>
						<label className='btn btn-outline-secondary cursor-pointer'>
							{loading ? "Uploading..." : "Upload image"}
						</label>
						<input
							type='file'
							accept='image/*'
							onChange={uploadImage}
							className='block'
							// hidden
						/>
					</div>
				</div>

				<button
					type='submit'
					className='w-full my-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600'>
					Submit
				</button>
			</form>
		</div>
	);
}
