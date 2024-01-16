import { useEffect, useState } from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import LanguageSwitcher from "./LanguageSwitcher";
import Cart from "./Cart";

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
			}, 100);
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			clearTimeout(timeoutId);
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<nav
			className={`${
				isFixed
					? "fixed backdrop-blur-sm shadow-sm animate-slide-down"
					: "absolute"
			} top-0 w-full py-4`}
		>
			<div className="flex justify-between items-center w-3/4 mx-auto">
				<Logo />

				<div className="flex items-center gap-6">
					<NavLinks />
					<LanguageSwitcher />
				</div>

				<Cart />
			</div>
		</nav>
	);
}
