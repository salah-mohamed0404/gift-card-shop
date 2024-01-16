import { Link } from "react-router-dom";

export default function NavLink({ title, link }) {
	return <Link to={link}>{title}</Link>;
}
