import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import prisma, { connectToDb, disconnectFromDb } from "@/prisma";
import bcrypt from "bcrypt";

export const authOptions = {
	session: {
		strategy: "jwt",
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		CredentialsProvider({
			async authorize(credentials, req) {
				const { email, password } = credentials;
				// const user = await User.findOne({ email });
				const user = await prisma.user.findFirst({
					where: { email: email },
				});

				if (!user) {
					throw new Error("Invalid email or password");
				}
				if (!user.password) {
					throw new Error("Please login via the method you used to signup");
				}
				const isPasswordMatched = await bcrypt.compare(password, user.password);

				if (!isPasswordMatched) {
					throw new Error("Invalid email or password");
				}

				return user;
			},
		}),
	],
	callbacks: {
		// save user if they login via social networks
		async signIn({ user }) {
			await connectToDb();

			try {
				const { email } = user;

				let dbUser = await prisma.user.findFirst({
					where: { email: email },
				});

				if (!dbUser) {
					dbUser = await prisma.user.create({
						data: {
							name: user.name,
							email: user.email,
							image: user.image,
						},
					});
				}

				console.log("\n\n++--++--++--++--++--++--");
				console.log("dbUser  ======>");
				console.log(dbUser);
				console.log("++--++--++--++--++--++--\n\n");
				
			} catch (error) {
				console.log("\n\n++--++--++--++--++--++--");
				console.log("error  ======>");
				console.log(error);
				console.log("++--++--++--++--++--++--\n\n");
			} finally {
				await disconnectFromDb();
				return true;
			}
		},

		// add additiona user info to the session (jwt, session)
		jwt: async ({ token }) => {
			// console.log("jwt callback", token, user);
			// const userByEmail = await User.findOne({ email: token.email });
			const userByEmail = await prisma.user.findFirst({
				where: { email: token.email },
			});

			userByEmail.password = undefined;
			token.user = userByEmail;
			return token;
		},
		session: async ({ session, token }) => {
			// console.log("session callback", session, token);
			session.user = token.user; // jwt token.user is accessed here
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: "/login",
	},
};
