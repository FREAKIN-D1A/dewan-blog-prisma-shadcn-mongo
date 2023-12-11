"use client";

import Appbar from "@/components/custom/AppBar";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>
				<SessionProvider>
					<Appbar />
					{children}
					<Toaster />
				</SessionProvider>
			</body>
		</html>
	);
}
