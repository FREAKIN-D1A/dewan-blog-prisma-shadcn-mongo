"use client";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { baseApiUrl } from "@/lib/config";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Login() {
	const { toast } = useToast();
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/";

	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log(JSON.stringify({ email, password }));
		
		try {
			const result = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});

			if (result.error) {
				toast({
					title: " Login error!",
					description: result.error,
				});
			} else {
				toast({
					title: " Login Success!",
				});
				router.push(callbackUrl);
			}
		} catch (err) {
			console.log("\n\n++--++--++--++--++--++--");
			console.log("err  ======>");
			console.log(err);
			console.log("++--++--++--++--++--++--\n\n");

			toast({
				title: " Login error!",
				description: err.message,
			});
		}
	};

	const handleLoginWithGoogle = async (e) => {
		await signIn("google", { callbackUrl });
	};

	return (
		<div className='max-w-md m-auto mt-52 p-6 bg-white shadow-md rounded-md border'>
			<h1 className='text-2xl font-bold mb-4'>Login</h1>
			<form onSubmit={handleSubmit}>
				<div className='mb-4'>
					<label
						htmlFor='email'
						className='block text-sm font-medium text-gray-600'>
						Email:
					</label>
					<input
						type='email'
						id='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500'
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='password'
						className='block text-sm font-medium text-gray-600'>
						Password:
					</label>
					<input
						type='password'
						id='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500'
					/>
				</div>
				<button
					type='submit'
					className=' w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'>
					Login
				</button>
			</form>

			<button
				onClick={() => router.push("/register")}
				className=' w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-red-300'>
				Not Registered yet ? Register here...
			</button>

			<button
				onClick={handleLoginWithGoogle}
				className=' w-full mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300'>
				Login with Google
			</button>
		</div>
	);
}
