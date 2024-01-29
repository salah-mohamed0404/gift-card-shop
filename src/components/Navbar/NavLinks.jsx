import { useState } from "react";
import { Menu } from "@mui/icons-material";
import NavLink from "./NavLink";
import LanguageSwitcher from "./LanguageSwitcher";
import DrawerWithIconBtn from "../DrawerWithIconBtn";

export default function NavLinks({ t, language }) {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const navLinksList = navLinks.map((link) => (
		<li key={link.title}>
			<NavLink title={t(`navbar.${link.title}`)} link={link.link} onClick={() => setIsDrawerOpen(false)} />
		</li>
	));

	return (
		<>
			<ul className="md:flex hidden items-center text-xl gap-7">
				{navLinksList}

				<li>
					<LanguageSwitcher />
				</li>
			</ul>

			<div className="md:hidden block">
				<DrawerWithIconBtn
					isOpen={isDrawerOpen}
					onOpen={() => setIsDrawerOpen(true)}
					onClose={() => setIsDrawerOpen(false)}
					BtnIcon={Menu}
					language={language}
				>
					<ul className="flex flex-col justify-center items-center gap-12 ps-8  h-full text-3xl">
						{navLinksList}

						<li>
							<LanguageSwitcher />
						</li>
					</ul>
				</DrawerWithIconBtn>
			</div>
		</>
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
	{
		title: "stores",
		link: "/stores",
	},
];
