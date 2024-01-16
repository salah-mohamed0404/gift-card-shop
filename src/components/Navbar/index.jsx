import { useEffect, useState } from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

export default function Navbar() {
	const [isFixed, setIsFixed] = useState(false);

	useEffect(() => {
		let timeoutId;

		const handleScroll = () => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				if (window.scrollY > 150) {
					setIsFixed(true);
				} else {
					setIsFixed(false);
				}
			}, 200);
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			clearTimeout(timeoutId);
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<header
			className={`${
				isFixed ? "fixed" : "absolute"
			} top-0 flex justify-between items-center px-32 py-4`}
		>
			<Logo />
			<NavLinks />
			<div>
				{/* <LanguageSwitcher /> */}
				{/* <Cart /> */}
			</div>
		</header>
	);
}
