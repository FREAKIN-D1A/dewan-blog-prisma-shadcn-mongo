"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSearch } from "@/context/searchContextFile";
import BlogList from "@/components/custom/BlogList";

export default function SearchPage() {
	const { setSearchQuery, searchResults, setSearchResults } = useSearch();

	const searchParams = useSearchParams();
	const query = searchParams.get("searchQuery");

	useEffect(() => {
		fetchResultsOnLoad();
	}, [query]);

	const fetchResultsOnLoad = async () => {
		try {
			const response = await fetch(`api/search?searchQuery=${query}`);
			if (!response.ok) {
				throw new Error("Failed to fetch search results");
			}
			const data = await response.json();

			console.log("\n\n<<<<=====<<<<====<<<<\n");
			console.log("fetchResultsOnLoad resulst  ===>\n");
			console.log(data);
			console.log("\n>>>>>====>>>>>=====>>>>\n\n");

			setSearchResults(data.blogs);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className='container'>
			hello
			<div className='row'>
				<div className='col'>
					<p className='lead'>Search result {searchResults.length}</p>
					{searchResults ? <BlogList blogs={searchResults} /> : ""}
				</div>
			</div>
		</div>
	);
}
