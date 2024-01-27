import { CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function CustomCard({ title, description, front, back }) {
	return (
		<div
			className="text-center !rounded-2xl"
			style={{
				boxShadow:
					" rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
			}}
		>
			<div className=" text-center  ">
				<Link to="/gift-card">
					<div className="relative group flex">
						<img
							className="w-full md:h-64 h-40 rounded-2xl object-cover transition duration-500 group-hover:opacity-0 group:hover:scale-75 z-10"
							src={front}
							alt="card front face"
						/>
						<img
							className="absolute top-0 w-full md:h-64 h-40 rounded-2xl object-cover opacity-0 scale-x-75 transition group-hover:opacity-100 group-hover:scale-x-100"
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
