import { FormControl, FormLabel, TextField, Typography } from "@mui/material";
import { PRICE_LIMITS } from "../../../hooks/useCardSittingReducer";

export default function MessageAndPriceStep({
	t,
	message,
	price,
	onMessageChange,
	onPriceChange,
	onTextColorChange,
}) {
	return (
		<div className="flex flex-col items-center gap-6">
			<Typography variant="h4" className="capitalize">
				{t("customCard.message.title")}
			</Typography>

			<div className="flex flex-col gap-6 w-3/4 mx-auto">
				<FormControl fullWidth className="relative">
					<FormLabel className="capitalize" classes={{ root: "!text-lg" }}>
						{t("customCard.message.message")}
					</FormLabel>
					<TextField
						variant="outlined"
						value={message}
						multiline
						maxRows={2}
						onChange={(e) => onMessageChange(e.target.value)}
						fullWidth
						className="[&_textarea]:pe-20"
					/>

					<div className="absolute end-3 bottom-0 -translate-y-3 flex gap-3">
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
				</FormControl>

				<FormControl fullWidth>
					<FormLabel className="capitalize" classes={{ root: "!text-lg" }}>
						{t("customCard.message.price")}
					</FormLabel>
					<TextField
						variant="outlined"
						value={price}
						onChange={(e) => {
							const value = e.target.value;
							if (!isNaN(value)) {
								onPriceChange(value);
							}
						}}
						fullWidth
						error={price < PRICE_LIMITS.min || price > PRICE_LIMITS.max}
						helperText={
							price < PRICE_LIMITS.min || price > PRICE_LIMITS.max
								? `price must be between ${PRICE_LIMITS.min} and ${PRICE_LIMITS.max}`
								: `Enter price in SAR between ${PRICE_LIMITS.min} and ${PRICE_LIMITS.max}`
						}
					/>
				</FormControl>
			</div>
		</div>
	);
}
