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

			<ul className="grid md:grid-cols-3 justify-center gap-6 flex-wrap">
				{shapes.map((cardShape) => (
					<li
						key={cardShape}
						className={`overflow-hidden rounded-xl shadow-lg ${
							cardShape === shape
								? "outline-none  ring-red-500"
								: ""
						}`}
						style={{
							backgroundColor: color,
						}}
					>
						<button type="button" className="h-[100%]" onClick={() => onShapeChange(cardShape)}>
							<img
								src={cardShape}
								alt="shape"
								className="w-60 h-[100%] object-fill"
							/>
						</button>
					</li>
				))}

				<li
					className={`overflow-hidden rounded-xl shadow-lg ${
						!shape ? "outline-none  ring-red-500" : ""
					}`}
					style={{
						backgroundColor: color,
					}}
				>
					<button
						type="button"
						className="w-60 h-36"
						onClick={() => onShapeChange(null)}
					></button>
				</li>
			</ul>
		</div>
	);
}

const shapes = [
	
	"/images/card-shapes/ribbon-2.png",
	"/images/card-shapes/stars-2.png",
	"https://i.ibb.co/7QQMKKY/valentines-day-120-a-ai.png",
	"https://i.ibb.co/BfxXVKV/90183910-SL-122720-39270-21-ai.png",
	"https://i.ibb.co/r6yYvV0/26117764-7109696-ai.png",
	"https://i.ibb.co/KDStSHZ/11952284-11-pattern-ai.png",
	"https://i.ibb.co/vwLFJRY/9599741.png",
	"https://i.ibb.co/y0yPSrL/4475791-93294-ai.png",
	"https://i.ibb.co/kSNkSYQ/3676941-1948701-ai.png",
	

	
	"./images/11.png",
	"./images/8.png",
	"./images/10.png",
	

	

	

];
