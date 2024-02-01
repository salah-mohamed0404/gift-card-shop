import { Typography } from "@mui/material";

export default function ShapeStep({ t, shape, onShapeChange, color }) {
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
							
								className="w-full h-full objec-cover "
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

const shapes = [
	"/images/Shapes/1-1.png",

	"/images/Shapes/1-2.png",
	"/images/Shapes/1-3.svg",
	"/images/Shapes/1-4.svg",
	"/images/Shapes/1-5.svg",
	"/images/Shapes/1-6.png",


	"/images/Shapes/1.svg",
	"/images/Shapes/10.svg",
	"/images/Shapes/12.svg",
	

	"/images/Shapes/13.png",
	
	"/images/Shapes/13.svg", 
	"/images/Shapes/14.png",
	"/images/Shapes/15.svg",

	"/images/Shapes/18.svg",
	"/images/Shapes/19.svg",

	"/images/Shapes/2.svg", 
	"/images/Shapes/20.svg",
	"/images/Shapes/21.svg",
	"/images/Shapes/22.png",
	"/images/Shapes/22.svg",

	"/images/Shapes/23.png",

	"/images/Shapes/24.png",
	"/images/Shapes/24.svg",
	"/images/Shapes/25.png",
	"/images/Shapes/26.png",
	"/images/Shapes/27.png",
	"/images/Shapes/28.png",
	"/images/Shapes/29.svg",

	"/images/Shapes/30.png",
	"/images/Shapes/31.png",
	"/images/Shapes/32.png",
	"/images/Shapes/33.png",
	"/images/Shapes/34.png",
	"/images/Shapes/35.png",
	"/images/Shapes/36.png",

	"/images/Shapes/38.png",
	"/images/Shapes/4.svg",
	
	"/images/Shapes/7.svg", "/images/Shapes/6.svg", "/images/Shapes/9.svg",







	//  "https://i.ibb.co/7QQMKKY/valentines-day-120-a-ai.png",
	// "https://i.ibb.co/BfxXVKV/90183910-SL-122720-39270-21-ai.png",
	// "https://i.ibb.co/r6yYvV0/26117764-7109696-ai.png",
	// "https://i.ibb.co/KDStSHZ/11952284-11-pattern-ai.png",
	// "https://i.ibb.co/vwLFJRY/9599741.png",
	// "https://i.ibb.co/y0yPSrL/4475791-93294-ai.png",
	// "https://i.ibb.co/kSNkSYQ/3676941-1948701-ai.png",


];
