import { signOut, useSession } from "next-auth/react";
import Logo from "./Logo";
import Link from "next/link";
// import { useSearch } from "@/context/searchContextFile";

const authLinks = [
	{ id: "1-1", name: "Blogs", url: "/blogs" },
	{ id: "1-2", name: "Write", url: "/blogs/add" },
	{ id: "1-3", name: "Profile", url: "/profile" },
	// { id: "1-4", name: "Search", url: "/search" },
];

const noAuthLinks = [
	{ id: "2-1", name: "Blogs", url: "/blogs" },
	{ id: "2-2", name: "Login", url: "/login" },
	{ id: "2-3", name: "Register", url: "/register" },
	// { name: 'Search', url: '/search' },
];

export default function Appbar() {
	const { data, status, update } = useSession();
	// const { searchQuery, setSearchQuery, fetchSearchResults } = useSearch();
	// const sss = useSearch();

	const links = status === "authenticated" ? authLinks : noAuthLinks;
	return (
		<section className='sticky top-0 bg-gray-100 z-50'>
			<nav className='flex items-center justify-between px-4 md:px-8 py-4 '>
				<div className='container mx-auto flex justify-between items-center'>
					<Logo />

					<div className='flex justify-between items-center space-x-4'>
						{links.map(({ id, name, url }) => (
							<Link
								className='text-gray-900 hover:text-violet-600 text-lg'
								key={id}
								href={url}>
								{name}
							</Link>
						))}
						{status === "authenticated" ? (
							<button
								className='text-gray-100 bg-gray-700 hover:bg-violet-600 rounded-md py-2 px-4 text-lg font-semibold hover:text-white transition-all duration-300'
								onClick={() => {
									signOut();
								}}>
								Log Out
							</button>
						) : null}
					</div>
				</div>
			</nav>
		</section>
	);
}
