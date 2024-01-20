import NavLink from "./NavLink";
import { Menu } from "@mui/icons-material";
import LanguageSwitcher from "./LanguageSwitcher";
import DrawerWithIconBtn from "../DrawerWithIconBTN";

export default function NavLinks({ t, language }) {
	const navLinksList = navLinks.map((link) => (
		<li key={link.title}>
			<NavLink title={t(`navbar.${link.title}`)} link={link.link} />
		</li>
	));

	return (
		<>
			<ul className="md:flex hidden items-center gap-7">
				{navLinksList}

				<li>
					<LanguageSwitcher />
				</li>
			</ul>

			<div className="md:hidden block">
				<DrawerWithIconBtn BtnIcon={Menu} language={language}>
					<ul className="flex flex-col justify-center items-center gap-12 ps-8 text-3xl h-full">
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
];
