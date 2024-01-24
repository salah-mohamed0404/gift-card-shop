import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
} from "@mui/material";

export default function BrandsCheckBoxes({ t, brands, onBrandsChange }) {
	const handleChange = (event) => {
		onBrandsChange((prev) =>
			prev.map((brand) =>
				brand.name === event.target.name
					? { ...brand, checked: event.target.checked }
					: brand
			)
		);
	};

	return (
		<FormControl fullWidth>
			<FormLabel>{t("readyCards.filters.brands")}</FormLabel>
			<FormGroup>
				{brands.map((brand, index) => (
					<FormControlLabel
						key={`${brand.name}-${index}`}
						control={
							<Checkbox
								checked={brand.checked}
								onChange={handleChange}
								name={brand.name}
							/>
						}
						label={brand.name}
						className="w-fit"
					/>
				))}
			</FormGroup>
		</FormControl>
	);
}
