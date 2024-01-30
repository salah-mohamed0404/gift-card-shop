import { CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function CustomCard({ title, description, front, back }) {
	return (
		<div
			className="text-center !rounded-2xl"
			
		>
			<div className=" text-center  ">
				<Link to="/custom-gift-card">
					<div className="relative group max-w-[30rem] flex">
						<img
							className="w-full rounded-2xl  aspect-[2/1]  object-fill transition duration-500 group-hover:opacity-0 group:hover:scale-75 z-10"
							src={front}
				           
							alt="card front face"
						/>
						<img
							className="absolute top-0 w-full aspect-[2/1]    rounded-2xl object-fill opacity-0 scale-x-75 transition group-hover:opacity-100 group-hover:scale-x-100"
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
