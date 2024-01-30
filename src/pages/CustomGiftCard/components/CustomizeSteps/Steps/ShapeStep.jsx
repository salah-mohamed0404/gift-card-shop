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
							className="aspect-[2/1] w-full h-full"
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
	"/images/card-shapes/ribbon-2.png",
	"/images/card-shapes/stars-2.png",
	"/images/card-shapes/12.png",

	"/images/card-shapes/14.png",
	"/images/card-shapes/15.png",
	"/images/card-shapes/16.png",
	"/images/card-shapes/17.png",

	"https://i.ibb.co/7QQMKKY/valentines-day-120-a-ai.png",
	"https://i.ibb.co/BfxXVKV/90183910-SL-122720-39270-21-ai.png",
	"https://i.ibb.co/r6yYvV0/26117764-7109696-ai.png",
	"https://i.ibb.co/KDStSHZ/11952284-11-pattern-ai.png",
	"https://i.ibb.co/vwLFJRY/9599741.png",
	"https://i.ibb.co/y0yPSrL/4475791-93294-ai.png",
	"https://i.ibb.co/kSNkSYQ/3676941-1948701-ai.png",


];
