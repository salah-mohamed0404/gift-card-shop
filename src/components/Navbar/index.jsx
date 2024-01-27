import { useEffect, useState } from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import Cart from "./Cart";
import { useTranslation } from "react-i18next";
import { useResolvedPath } from "react-router-dom";

export default function Navbar() {
	const [isFixed, setIsFixed] = useState(false);
	const {
		t,
		i18n: { language },
	} = useTranslation();
	const { pathname } = useResolvedPath();

	useEffect(() => {
		if (pathname !== "/") return setIsFixed(true);

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
	}, [pathname]);

	return (
		<nav
			className={`${
				isFixed
					? "fixed bg-gray-50/60 backdrop-blur-sm shadow-sm  animate-slide-down"
					: "absolute text-gray-50"
			} top-0 w-full py-4 z-50 text-lg font-semibold`}
		>
			<div className="flex justify-between items-center w-3/4 mx-auto">
				<Logo />

				<NavLinks t={t} language={language} />

				<Cart t={t} language={language} />
			</div>
		</nav>
	);
}
