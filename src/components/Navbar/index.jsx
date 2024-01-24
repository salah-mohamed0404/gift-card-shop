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
					? "fixed top-0 w-full bg-gray-50/60 backdrop-blur-sm shadow-sm animate-slide-down"
					: "absolute top-0 w-full bg-opacity-0 text-gray-50 py-5"
			} z-50 px-4 py-5 sm:px-6 lg:px-8`} // Adjusted padding for different screen sizes
		>
			<div className="flex  items-center mx-auto max-w-7xl">
				<Logo />

				<div className="hidden sm:flex sm:justify-end  flex-grow lg:justify-center">
					{/* NavLinks component */}
					<NavLinks t={t} language={language} />
				</div>

				<div>
					{/* Cart component */}
					<Cart t={t} language={language} />

					{/* Optional: Hamburger menu for smaller screens */}
					<div className="sm:hidden float-right">
						{/* Hamburger menu icon */}
					</div>
				</div>
			</div>
		</nav>
	);
}
