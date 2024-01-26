import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function CustomCard({ imgUrl, title, description }) {
	return (
		<div className=" text-center  " >
			<Link to="/gift-card">
				<CardMedia
					sx={{ height: 260, objectFit: "cover"}}
					image={imgUrl}
					title={title}
				/>
			</Link>

			<CardContent>
				<Link to="/gift-card">
					<Typography variant="h4" className="text-primary-700 sm:fs-5 !mb-1 sm-mt-4 sm-text-center" >
						{title}
					</Typography>
				</Link>
				<Typography>{description}</Typography>
			</CardContent>
		</div>
	);
}
