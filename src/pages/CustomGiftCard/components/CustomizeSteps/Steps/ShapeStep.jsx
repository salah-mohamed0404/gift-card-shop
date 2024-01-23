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

			<ul className="grid md:grid-cols-2 justify-center gap-6 flex-wrap">
				{shapes.map((cardShape) => (
					<li
						key={cardShape}
						className={`overflow-hidden rounded-xl shadow-lg ${
							cardShape === shape
								? "outline-none ring-2 ring-offset-8 ring-red-500"
								: ""
						}`}
						style={{
							backgroundColor: color,
						}}
					>
						<button type="button" onClick={() => onShapeChange(cardShape)}>
							<img
								src={cardShape}
								alt="shape"
								className="w-60 h-36 object-cover"
							/>
						</button>
					</li>
				))}

				<li
					className={`overflow-hidden rounded-xl shadow-lg ${
						!shape ? "outline-none ring-2 ring-offset-[10px] ring-red-500" : ""
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
	"/images/card-shapes/stars-1.png",
	"/images/card-shapes/ribbon-1.png",
	"/images/card-shapes/ribbon-2.png",
	"/images/card-shapes/stars-2.png",
];
