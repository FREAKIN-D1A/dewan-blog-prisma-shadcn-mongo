"use client";

import Appbar from "@/components/custom/AppBar";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/custom/Footer";
import { SearchProvider } from "@/context/searchContextFile";

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>
				<SessionProvider>
					<SearchProvider>
						<Appbar />
						{children}
						<Footer />
						<Toaster />
					</SearchProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
