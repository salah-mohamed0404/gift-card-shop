import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<footer className="flex justify-center items-center gap-10 py-5 px-2 bg-secondary-500">
			{socialMedia.map(({ name, link, Icon }) => (
				<Link
					key={name}
					href={link}
					target="_blank"
					rel="noopener noreferrer"
					className="text-3xl text-gray-50 transition-colors hover:text-rose-500"
				>
					<Icon fontSize="inherit" />
				</Link>
			))}
		</footer>
	);
}

const socialMedia = [
	{
		name: "facebook",
		link: "https://www.facebook.com/your-page",
		Icon: Facebook,
	},
	{
		name: "instagram",
		link: "https://www.instagram.com/your-page",
		Icon: Instagram,
	},
	{
		name: "twitter",
		link: "https://twitter.com/your-page",
		Icon: Twitter,
	},
];
