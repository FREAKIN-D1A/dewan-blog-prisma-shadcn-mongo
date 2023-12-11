"use client";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { baseApiUrl } from "@/lib/config";
import path from "path";
import { useRouter, useSearchParams } from "next/navigation";

const Register = () => {
	const { toast } = useToast();
	const router = useRouter();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/";

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Your registration logic here
		// Example: Send registration data to the server

		try {
			const response = await fetch(`api/register`, {
				method: "POST",
				body: JSON.stringify({ name, email, password }),
			});

			const data = await response.json();

			console.log("\n\n++--++--++--++--++--++--");
			console.log("data  ======>");
			console.log(data);
			console.log("data.newUser  ======>");
			console.log(data.newUser);
			console.log("++--++--++--++--++--++--\n\n");

			toast({
				title: " Registration successful!",
				description: data.success,
			});

			// Redirect to login page or any other desired action
		} catch (error) {
			// Display error message
			toast({
				variant: "destructive",
				title: " Registration error!",
				description: "Friday, February 10, 2023 at 5:57 PM",
			});
			console.error("Registration error:", error.message);
		}
	};

	const handleLoginWithGoogle = async (e) => {
		signIn("google", { callbackUrl });
	};

	return (
		<div className='max-w-md m-auto mt-52 p-6 bg-white shadow-md rounded-md border'>
			<h1 className='text-2xl font-bold mb-4'>Register</h1>
			<form onSubmit={handleSubmit}>
				<div className='mb-4'>
					<label
						htmlFor='name'
						className='block text-sm font-medium text-gray-600'>
						Name:
					</label>
					<input
						type='text'
						id='name'
						value={name}
						onChange={(e) => setName(e.target.value)}
						className='mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500'
					/>
				</div>
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
					Register
				</button>
			</form>

			<button
				onClick={() => router.push("/login")}
				className=' w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-red-300'>
				Already Registered ? Login
			</button>

			<button
				onClick={handleLoginWithGoogle}
				className=' w-full mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300'>
				Login with Google
			</button>
		</div>
	);
};

export default Register;
