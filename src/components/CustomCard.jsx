import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function CustomCard({ imgUrl, title, description }) {
	return (
		<Card className=" text-center w-full" sx={{boxShadow:' rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px' }}>
			<Link to="/gift-card">
				<CardMedia
					sx={{ height: 260, objectFit: "cover"}}
					image={imgUrl}
					title={title}
				/>
			</Link>

			<CardContent>
				<Link to="/gift-card">
					<Typography variant="h4" className="text-primary-700 !mb-1 sm-mt-4 sm-text-center" >
						{title}
					</Typography>
				</Link>
				<Typography>{description}</Typography>
			</CardContent>
		</Card>
	);
}
