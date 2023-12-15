import { NextResponse } from "next/server";
import prisma, { connectToDb, disconnectFromDb } from "@/prisma";

export async function PUT(req, context) {
	await connectToDb();
	const _req = await req.json();
	console.log("context params => ", context.params);

	console.log("\n\n-=-=-=-=-=-=-=-=-=-=-=");
	console.log("context params => ");
	console.log(context.params);
	console.log("\n\n-=-=-=-=-=-=-=-=-=-=-=");

	try {
		const updatedBlog = await prisma.blog.update({
			where: { id: context.params.id },
			data: { ..._req },
		});

		console.log("\n\n-=-=-=-=-=-=-=-=-=-=-=");
		console.log(" updatedBlog => ");
		console.log(updatedBlog);
		console.log("\n\n-=-=-=-=-=-=-=-=-=-=-=");

		return NextResponse.json({ updatedBlog: updatedBlog }, { status: 200 });
	} catch (err) {
		console.log("\n\n-=-=-=-=-=-=-=-=-=-=-=");
		console.log("err err => ");
		console.log(err);
		console.log("\n\n-=-=-=-=-=-=-=-=-=-=-=");
		return NextResponse.json(
			{ err: "An error occurred. Try again." },
			{ status: 500 }
		);
	} finally {
		disconnectFromDb();
	}
}

export async function DELETE(req, context) {
	await connectToDb();
	try {
		const deletedBlog = await prisma.blog.delete({
			where: { id: context.params.id }, // Specify the identifier of the record to delete
		});

		console.log("\n\n<<<<<=====<<<<<====<<<<<\n");
		console.log("deletedBlog  ===>\n");
		console.log(deletedBlog);
		console.log("\n>>>>>====>>>>>=====>>>>>>\n\n");

		return NextResponse.json(deletedBlog, { status: 200 });
	} catch (err) {
		console.log("\n\n-=-=-=-=-=-=-=-=-=-=-=");
		console.log("err err => ");
		console.log(err);
		console.log("\n\n-=-=-=-=-=-=-=-=-=-=-=");
		return NextResponse.json(
			{ err: "An error occurred. Try again." },
			{ status: 500 }
		);
	} finally {
		disconnectFromDb();
	}
}
