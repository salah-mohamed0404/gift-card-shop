import { NavLink as RouterNavLink } from "react-router-dom";

export default function NavLink({ title, link, onClick }) {
	return (
		<RouterNavLink
			to={link}
			className={({ isActive }) => {
				return `capitalize transition-colors hover:text-secondary-500 ${
					isActive ? "text-secondary-500" : ""
				}`;
			}}
			onClick={onClick}
		>
			{title}
		</RouterNavLink>
	);
}
