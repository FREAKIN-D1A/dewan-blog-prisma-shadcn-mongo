import prisma, { connectToDb, disconnectFromDb } from "@/prisma";
import { v2, UploadApiResponse } from "cloudinary";
import { NextResponse } from "next/server";

const uploadImageFcn = async (file) => {
	console.log("\n\n-=-=-=-=--=-=-=-=--=-=-");
	console.log("endtered uploadImageFcn");
	console.log("file type >", typeof file);
	console.log("file  >", file);
	console.log("-=-=-=-=--=-=-=-=--=-=-\n\n");

	let fileBuffer = await file.arrayBuffer();
	let mime = file.type;
	let encoding = "base64";
	let base64Data = Buffer.from(fileBuffer).toString("base64");
	let fileUri = "data:" + mime + ";" + encoding + "," + base64Data;

	return new Promise(async (resolve, reject) => {
		let result = v2.uploader
			.upload(fileUri, {
				invalidate: true,
			})
			.then((result) => {
				console.log(result);

				console.log("\n\n-=-=-=-=--=-=-=-=--=-=-\n\n");
				console.log("result +========+>>");
				console.log(result);
				console.log("-=-=-=-=--=-=-=-=--=-=-\n\n");

				resolve(result);
			})
			.catch((error) => {
				console.log("-=-=-=-=--=-=-=-=--=-=-\n\n");
				console.log("error +========+>>");
				console.log(error);
				console.log("-=-=-=-=--=-=-=-=--=-=-\n\n");
				console.log(error);
				reject(error);
			});

		return result;
	});
};

export const POST = async (req) => {
	try {
		console.log("\n\n-=-=-=-=--=-=-=-=--=-=-");
		console.log("endtered server");
		console.log("-=-=-=-=--=-=-=-=--=-=-\n\n");

		v2.config({
			cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
			api_secret: process.env.CLOUDINARY_API_SECRET,
			api_key: process.env.CLOUDINARY_API_KEY,
		});

		const formData = await req.formData();

		console.log("-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-");
		console.log("formData server >>>\n", formData);
		console.log("formData.get file server >>>\n", formData.get("file"));
		console.log("-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-");

		const file = formData.get("file");

		// let uploadedFile: UploadApiResponse | null = null;

		const uploadedFile = await uploadImageFcn(file);

		console.log("\n\n-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-");
		console.log("uploadedFile =====>>>", uploadedFile);
		console.log("\n\n-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-");

		return NextResponse.json(
			{ message: "image upload POST data", url: uploadedFile.secure_url },
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "error. image POST", error },
			{ status: 500 }
		);
	}
};
