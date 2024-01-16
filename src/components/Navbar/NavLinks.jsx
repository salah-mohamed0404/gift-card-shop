import NavLink from "./NavLink";

export default function NavLinks() {
	return (
		<ul className="flex items-center gap-6">
			{navLinks.map((link) => (
				<li key={link.title}>
					<NavLink title={link.title} link={link.link} />
				</li>
			))}
		</ul>
	);
}

const navLinks = [
	{
		title: "Home",
		link: "/",
	},
	{
		title: "About",
		link: "/about",
	},
	{
		title: "Buy a card",
		link: "/gift-card",
	},
	{
		title: "Create a card",
		link: "/custom-gift-card",
	},
];
