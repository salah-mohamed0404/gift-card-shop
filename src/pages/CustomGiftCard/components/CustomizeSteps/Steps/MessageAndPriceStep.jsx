import { TextField, Typography } from "@mui/material";

export default function MessageAndPriceStep({
	message,
	price,
	onMessageChange,
	onPriceChange,
	onTextColorChange,
}) {
	return (
		<div className="flex flex-col items-center gap-6">
			<Typography variant="h4" className="capitalize">
				fill message and price
			</Typography>

			<div className="flex flex-col gap-6 w-3/4 mx-auto">
				<div className="relative w-full">
					<TextField
						variant="outlined"
						label="Message"
						value={message}
						multiline
						maxRows={2}
						onChange={(e) => onMessageChange(e.target.value)}
						fullWidth
						className="[&_textarea]:pe-20"
					/>

					<div className="absolute end-3 top-0 translate-y-1/3 flex gap-3">
						<button
							className="w-8 h-8 bg-white border-4 rounded-full shadow-lg"
							title="text color black"
							onClick={() => onTextColorChange("white")}
						></button>
						<button
							className="w-8 h-8 bg-black border-4 rounded-full shadow-lg"
							title="text color black"
							onClick={() => onTextColorChange("black")}
						></button>
					</div>
				</div>

				<TextField
					variant="outlined"
					type="number"
					value={price}
					onChange={(e) => onPriceChange(e.target.value)}
					fullWidth
				/>
			</div>
		</div>
	);
}
