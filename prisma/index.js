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
	console.log("\n\n\n<<<< <<<< connectToDb >>>> >>>>>\n\n\n");
	await prisma.$connect();
};

export const disconnectFromDb = async () => {
	console.log("\n\n\n<<<<<<<< <<< disconnectFromDb >>> >>>>>>>\n\n\n");
	await prisma.$disconnect();
};
