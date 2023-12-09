import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma, { connectToDb, disconnectFromDb } from "@/prisma";

export async function POST(req) {
	await connectToDb();
	const _req = await req.json();
	const { name, email, password } = _req;

	if (!name || !email || !password) {
		return NextResponse.json(
			{ err: "!name || !email || !password)" },
			{ status: 500 }
		);
	}

	try {
		// const existingUser = await User.findOne({ email });
		const existingUser = await prisma.user.findFirst({
			where: { email: email },
		});
		if (existingUser) {
			return NextResponse.json(
				{ err: "Email already exists" },
				{ status: 409 }
			);
		}

		const newUser = await prisma.user.create({
			data: {
				name: name,
				email: email,
				password: await bcrypt.hash(password, 10),
			},
		});

		return NextResponse.json({
			success: "Registration successful",
			newUser: newUser,
		});
	} catch (err) {
		console.log("\n\n++--++--++--++--++--++--");
		console.log("err ======>");
		console.log(err);
		console.log("++--++--++--++--++--++--\n\n");

		return NextResponse.json(
			{ err: "Server error. Try again" },
			{ status: 500 }
		);
	} finally {
		await disconnectFromDb();
	}
}
