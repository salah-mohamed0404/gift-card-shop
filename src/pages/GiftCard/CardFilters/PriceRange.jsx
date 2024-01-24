import { FormControl, FormLabel, Slider } from "@mui/material";

export default function PriceRange({ t, priceRange, onPriceRangeChange }) {
	const handleChange2 = (_, newValue) => {
		onPriceRangeChange(newValue);
	};

	return (
		<FormControl fullWidth>
			<FormLabel>{t("readyCards.filters.price")}</FormLabel>

			<Slider
				value={priceRange}
				onChange={handleChange2}
				valueLabelDisplay="auto"
				min={100}
				max={500}
				disableSwap
			/>
		</FormControl>
	);
}
