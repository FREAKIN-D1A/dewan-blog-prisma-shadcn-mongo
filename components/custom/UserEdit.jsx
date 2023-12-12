// UserEdit.jsx
"use client";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export default function UserEdit(props) {
	const user = props.user;
	const router = useRouter();

	const handleImageChange = async (e) => {
		e.preventDefault();
		const file = e.target.files[0];

		if (file) {
			const formData = new FormData();
			formData.append("file", file);

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
				// setImage(data.url);
				user.image = data.url;

				const response2 = await fetch(`/api/register/${user.id}`, {
					method: "PUT",
					body: JSON.stringify({ url: data.url }),
				});

				router.refresh();
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<div className='flex flex-col items-center'>
			<Avatar className='mx-auto mb-4'>
				{user.image ? (
					<AvatarImage src={user.image} alt={user.name} />
				) : (
					<AvatarFallback>
						<h2 className='text-5xl text-center'>
							{user.name.charAt(0).toUpperCase()}
						</h2>
					</AvatarFallback>
				)}
			</Avatar>

			<div className='mb-4 w-full'>
				<label
					htmlFor='imageInput'
					className='text-gray-600 cursor-pointer mx-auto'>
					Change Profile Image:
				</label>
				<input
					type='file'
					id='imageInput'
					accept='image/*'
					onChange={handleImageChange}
					className='mt-2 p-2 border rounded-md w-full'
				/>
			</div>
		</div>
	);
}
