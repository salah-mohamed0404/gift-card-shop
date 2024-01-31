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
							className="w-full h-full"
							onClick={() => onShapeChange(cardShape)}
						>
							<img
								src={cardShape}
								alt="shape"
								className="w-full h-full object-cover"
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
	"/images/Shapes/1.png",
	"/images/Shapes/2.png",
	"/images/Shapes/3.png",
	"/images/Shapes/4.png",
	"/images/Shapes/5.png",
	"/images/Shapes/6.png",
	"/images/Shapes/7.png",

	"/images/Shapes/8.png",
	"/images/Shapes/9.png",
	"/images/Shapes/10.png",

	"/images/Shapes/11.png",
	"/images/Shapes/12.png",
	"/images/Shapes/13.png",
	"/images/Shapes/14.png",
	"/images/Shapes/15.png",
	"/images/Shapes/16.png",
	"/images/Shapes/17.png",
	"/images/Shapes/18.png", 
	"/images/Shapes/19.png",
	"/images/Shapes/20.png",
	"/images/Shapes/21.png",
	"/images/Shapes/22.png", 
	"/images/Shapes/23.png",
	"/images/Shapes/24.png",
	"/images/Shapes/25.png",
	"/images/Shapes/26.png", 
	"/images/Shapes/27.png",
	"/images/Shapes/28.png",
	"/images/Shapes/29.png",
	"/images/Shapes/30.png",
	 "/images/Shapes/31.png",
	"/images/Shapes/32.png",
	"/images/Shapes/33.png",
	"/images/Shapes/34.png",
	"/images/Shapes/35.png",
	"/images/Shapes/36.png",
	"/images/Shapes/37.png",
	"/images/Shapes/38.png",
	"/images/Shapes/39.png",
	"/images/Shapes/40.png",
	"/images/Shapes/41.png",
	"/images/Shapes/42.png",
	"/images/Shapes/43.png",
	"/images/Shapes/44.png",
	"/images/Shapes/45.png",
	"/images/Shapes/46.png",
	"/images/Shapes/47.png",
	"/images/Shapes/48.png",
	"/images/Shapes/49.png",
	"/images/Shapes/50.png",







	//  "https://i.ibb.co/7QQMKKY/valentines-day-120-a-ai.png",
	// "https://i.ibb.co/BfxXVKV/90183910-SL-122720-39270-21-ai.png",
	// "https://i.ibb.co/r6yYvV0/26117764-7109696-ai.png",
	// "https://i.ibb.co/KDStSHZ/11952284-11-pattern-ai.png",
	// "https://i.ibb.co/vwLFJRY/9599741.png",
	// "https://i.ibb.co/y0yPSrL/4475791-93294-ai.png",
	// "https://i.ibb.co/kSNkSYQ/3676941-1948701-ai.png",


];
