import Link from "next/link";

export default function Logo() {
	return (
		<Link href={"/"}>
			<div className={`flex items-center mb-4`}>
				<span className='text-6xl font-bold text-blue-500'>D</span>
				<span className='text-4xl font-bold text-purple-500'>B</span>
				<span className='text-3xl font-semibold'>log</span>
			</div>
		</Link>
	);
}
