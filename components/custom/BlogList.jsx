import BlogCard from "./BlogCard";

export default function BlogList({ blogs }) {
	return (
		<div className='container mx-auto mb-5'>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				{blogs?.map((blog) => (
					<div key={blog.id}>
						<BlogCard blog={blog} />
					</div>
				))}
			</div>
		</div>
	);
}
