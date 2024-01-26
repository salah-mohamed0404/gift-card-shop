import {
	FormControl,
	FormLabel,
	IconButton,
	InputAdornment,
	Menu,
	MenuItem,
	TextField,
	Typography,
} from "@mui/material";
import { PRICE_LIMITS } from "../../../hooks/useCardSittingReducer";
import { TextFields } from "@mui/icons-material";
import { useState } from "react";

export default function MessageAndPriceStep({
	t,
	message,
	price,
	font,
	onMessageChange,
	onPriceChange,
	onTextColorChange,
	onFontChange,
}) {
	const [fontAnchorEl, setFontAnchorEl] = useState(null);
	const isFontMenuOpen = Boolean(fontAnchorEl);
	const fontClassName =
		font === "Noto Sans Arabic"
			? "*:!font-notoSansArabic"
			: font === "Amiri"
			? "*:!font-amiri"
			: font === "Cairo"
			? "*:!font-cairo"
			: "";

	const handleFontChange = (e) => {
		onFontChange(e.target.textContent);
		setFontAnchorEl(null);
	};

	return (
		<div className="flex flex-col items-center gap-6">
			<Typography
				variant="h4"
				className="md:!text-4xl !text-3xl capitalize"
				textAlign="center"
			>
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
						className={`[&_textarea]:pe-28 ${fontClassName}`}
					/>

					<div className="absolute end-3 bottom-0 -translate-y-3 flex items-center gap-3">
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
						<div>
							<IconButton
								onClick={(e) => setFontAnchorEl(e.target)}
								id="fonts-menu"
								aria-controls={open ? "fonts-menu" : undefined}
								aria-haspopup="true"
								aria-expanded={open ? "true" : undefined}
							>
								<TextFields />
							</IconButton>
							<Menu
								id="fonts-menu"
								anchorEl={fontAnchorEl}
								open={isFontMenuOpen}
								onClose={() => setFontAnchorEl(null)}
								MenuListProps={{
									"aria-labelledby": "fonts-menu",
								}}
								dir="ltr"
							>
								<MenuItem onClick={handleFontChange}>default</MenuItem>
								<MenuItem onClick={handleFontChange}>Noto Sans Arabic</MenuItem>
								<MenuItem onClick={handleFontChange}>Amiri</MenuItem>
								<MenuItem onClick={handleFontChange}>Cairo</MenuItem>
							</Menu>
						</div>
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
								: `Enter price in SAR between ${PRICE_LIMITS.min} and ${PRICE_LIMITS.max} in english numbers`
						}
						InputProps={{
							endAdornment: (
								<InputAdornment
									position="end"
									className="*:!text-gray-800 rtl:px-2"
								>
									{t("currency")}
								</InputAdornment>
							),
						}}
						className={`${fontClassName}`}
					/>
				</FormControl>
			</div>
		</div>
	);
}
