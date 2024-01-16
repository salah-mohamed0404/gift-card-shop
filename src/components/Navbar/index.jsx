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
					? "fixed bg-gray-50/60 backdrop-blur-sm shadow-sm animate-slide-down"
					: "absolute text-gray-50"
			} top-0 w-full py-4 z-50`}
		>
			<div className="flex justify-between items-center w-3/4 mx-auto">
				<Logo />

				<div className="flex items-center gap-7">
					<NavLinks />
					<LanguageSwitcher />
				</div>

				<Cart />
			</div>
		</nav>
	);
}
