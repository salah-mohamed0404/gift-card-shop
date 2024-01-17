import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function CustomCard({ imgUrl, title, description }) {
	return (
		<Card className="!shadow-none text-center w-full">
			<Link to="/gift-card">
				<CardMedia sx={{ height: 260 }} image={imgUrl} title={title} />
			</Link>

			<CardContent>
				<Link to="/gift-card">
					<Typography variant="h4" className="text-primary-700 !mb-1">
						{title}
					</Typography>
				</Link>
				<Typography>{description}</Typography>
			</CardContent>
		</Card>
	);
}
