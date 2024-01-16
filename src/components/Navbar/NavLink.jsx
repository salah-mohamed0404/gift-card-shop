import { NavLink as RouterNavLink } from "react-router-dom";

export default function NavLink({ title, link }) {
	return (
		<RouterNavLink
			to={link}
			className={({ isActive }) => {
				return `transition-colors hover:text-primary-500 ${
					isActive ? "text-primary-500" : ""
				}`;
			}}
		>
			{title}
		</RouterNavLink>
	);
}
