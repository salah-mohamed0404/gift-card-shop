import { useTranslation } from "react-i18next";
import NavLink from "./NavLink";

export default function NavLinks() {
	const { t } = useTranslation();

	return (
		<ul className="flex items-center gap-7">
			{navLinks.map((link) => (
				<li key={link.title}>
					<NavLink title={t(`navbar.${link.title}`)} link={link.link} />
				</li>
			))}
		</ul>
	);
}

const navLinks = [
	{
		title: "home",
		link: "/",
	},
	{
		title: "about",
		link: "/about",
	},
	{
		title: "buy a card",
		link: "/gift-card",
	},
	{
		title: "create a card",
		link: "/custom-gift-card",
	},
];
