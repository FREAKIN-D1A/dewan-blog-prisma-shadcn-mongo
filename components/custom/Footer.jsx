//@ts-nocheck
import Logo from "./Logo";
import { FaInstagram, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IoMdCopy } from "react-icons/io";

const links = [FaInstagram, FaGithub, FaLinkedin, FaTwitter];

function IconContainer(props) {
	return <props.icon size={25} className='cursor-pointer' />;
}

export default function Footer() {
	return (
		<section className='bg-gray-100 w-full h-full'>
			<hr className='p-3' />
			<div className='flex flex-col p-20 xs:gap-8 md:gap-6'>
				<div className='flex ms:flex-col xs:flex-col md:flex-row md:justify-between xs:justify-start items-center'>
					<div className='mb-4 md:mb-0'>
						<Logo />
					</div>

					<div className='flex flex-col md:flex-row md:gap-6'>
						{links.map((item) => (
							<IconContainer icon={item} key={item.toString()} />
						))}
					</div>
				</div>

				<div className='flex flex-col '>
					<p className='md:text-xl xs:text-md  font-semibold gap-2'>
						<span>{new Date().getFullYear()}</span>
						<span>{/* <IoMdCopy className='mx-1' /> */}© Copyright </span>
						<span className='font-bold'>Dewan Org</span>
					</p>
				</div>
			</div>
		</section>
	);
}
