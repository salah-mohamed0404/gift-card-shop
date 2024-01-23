import { Typography } from "@mui/material";
import colors from "tailwindcss/colors";

export default function ColorStep({ t, color, onColorChange }) {
	return (
		<div className="flex flex-col items-center gap-6">
			<Typography
				variant="h4"
				className="md:!text-4xl !text-3xl capitalize"
				textAlign="center"
			>
				{t("customCard.color.title")}
			</Typography>

			<ul className="flex justify-center gap-6 flex-wrap">
				{CardColors.map((cardColor) => (
					<li key={cardColor}>
						<button
							className={`w-9 h-9 rounded-full ${
								cardColor === color
									? "outline-none ring-2 ring-offset-8 ring-red-500"
									: ""
							}`}
							style={{ backgroundColor: cardColor }}
							onClick={() => onColorChange(cardColor)}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}

const CardColors = [
	...new Set(
		Object.values(colors)
			.filter((value) => value[200])
			.reduce((acc, value) => {
				const colorValues = [200, 500, 800].map((grade) => value[grade]);
				return [...acc, ...colorValues];
			}, [])
	),
];
