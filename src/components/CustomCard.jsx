import { CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function CustomCard({ title, description, front, back }) {
	return (
		<div
			className="text-center !rounded-2xl"
			
		>
			<div className=" text-center  ">
				<Link to="/custom-gift-card">
					<div className="relative group flex">
						<img
							className="w-full md:h-42  rounded-2xl  h-52   object-cover transition duration-500 group-hover:opacity-0 group:hover:scale-75 z-10"
							src={front}
				           
							alt="card front face"
						/>
						<img
							className="absolute top-0 w-full md:h-42  h-52 rounded-2xl object-cover opacity-0 scale-x-75 transition group-hover:opacity-100 group-hover:scale-x-100"
							src={back}
				
							alt="card back face"
						/>
					</div>
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
		</div>
	);
}
