import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function CustomCard({ imgUrl, title, description }) {
	return (
		<Card
			className="text-center !rounded-2xl"
			sx={{
				boxShadow:
					" rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
			}}
		>
			<div className=" text-center  ">
				<Link to="/gift-card">
					<CardMedia
						image={imgUrl}
						title={title}
						className="!rounded-2xl object-cover md:h-64 h-40"
					/>
				</Link>

				<CardContent>
					<Link to="/gift-card">
						<Typography variant="h4" className="text-primary-700 !mb-1">
							{title}
						</Typography>
					</Link>
					<Typography>{description}</Typography>
				</CardContent>
			</div>
		</Card>
	);
}
