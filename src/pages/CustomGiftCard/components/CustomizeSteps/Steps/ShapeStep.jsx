import React,{useEffect} from "react";
import { Typography } from "@mui/material";
import  axios  from "axios";

export default function ShapeStep({ t, shape, onShapeChange, color }) {
const [shapes,setShapes] =React.useState([])

	useEffect(() => {
		const fetchData = async () => {
			
			try {
				const response = await axios.get(`http://localhost:3001/shapes`)
			

				console.log(response.data.shapes);
				setShapes(response.data.shapes);
				
			} catch (error) {
				console.error('Error fetching cards:', error);
			}
		};

		fetchData();
	}, []);



	return (
		<div className="flex flex-col items-center gap-6">
			<Typography
				variant="h4"
				className="md:!text-4xl !text-3xl capitalize"
				textAlign="center"
			>
				{t("customCard.shape.title")}
			</Typography>

			<ul className="grid md:grid-cols-3 justify-center gap-4 flex-wrap">
				{shapes.map((cardShape) => (
					<li
						key={cardShape}
						className={`rounded-2xl shadow-lg ${
							cardShape === shape ? "outline-none  ring-red-500" : ""
						}`}
						style={{
							backgroundColor: color,
						}}
					>
						<button
							type="button"
							className="w-full relative h-full"
							onClick={() => onShapeChange(cardShape)}
						>
							<img
								src={cardShape}
								alt="shape"
							
								className="w-full h-full  "
							/>
						</button>
					</li>
				))}

				<li
					className={`rounded-2xl shadow-lg ${
						!shape ? "outline-none  ring-red-500" : ""
					}`}
					style={{
						backgroundColor: color,
					}}
				>
					<button
						type="button"
						className="aspect-[2/1] w-full h-full"
						onClick={() => onShapeChange(null)}
					></button>
				</li>
			</ul>
		</div>
	);
}


