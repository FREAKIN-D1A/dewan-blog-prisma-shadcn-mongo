import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
	prisma = new PrismaClient();
} else {
	if (!global.prisma) {
		global.prisma = new PrismaClient();
	}
	prisma = global.prisma;
}

export default prisma;

export const connectToDb = async () => {
	console.log("<<<<<<<< connectToDb >>>>>>>");
	await prisma.$connect();
};

export const disconnectFromDb = async () => {
	console.log("<<<<<<<< disconnectFromDb >>>>>>>");
	await prisma.$disconnect();
};
