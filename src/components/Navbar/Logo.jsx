import { Link } from "react-router-dom";

export default function Logo() {
	return (
		<Link to="/">
			<img src="/images/logo.webp" alt="logo" width={128} height={128} />
		</Link>
	);
}
