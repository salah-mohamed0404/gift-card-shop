import { Link } from "react-router-dom";

export default function Logo() {
	return (
		<Link to="/">
			<img alt="logo" width={62} height={63} />
		</Link>
	);
}
