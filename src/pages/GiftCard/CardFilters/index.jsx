import { forwardRef, useEffect, useState } from "react";
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	Slide,
} from "@mui/material";
import { Tune } from "@mui/icons-material";
import PriceRange from "./PriceRange";
import BrandsCheckBooks from "./BrandsCheckBoxes";
import { useSearchParams } from "react-router-dom";

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />;
});

export default function CardFilters({ t,onFilterChange ,filters}) {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [priceRange, setPriceRange] = useState([100, 500]);
	const [brands, setBrands] = useState(dummyBrands);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		// TODO: filter cards from API
	}, [searchParams]);

	useEffect(() => {
		const price = searchParams.get("price");
		if (price) {
			setPriceRange(price.split("-").map((price) => parseInt(price)));
		}

		const brands = searchParams.get("brands");
		if (brands) {
			setBrands((prev) => {
				return prev.map((brand) => {
					if (brands.split("-").includes(brand.name)) {
						return { ...brand, checked: true };
					} else {
						return { ...brand, checked: false };
					}
				});
			});
		}
	}, [searchParams]);

	const handleFilter = (e) => {
		e.preventDefault();

		// Assuming the priceRange state is already set to reflect the slider's values
		const priceFilterValue = priceRange.join("-");

		// Brands are captured in an array of selected brands
		const selectedBrands = brands
			.filter(brand => brand.checked)
			.map(brand => brand.name);

		// Construct the query parameters
		const queryParams = new URLSearchParams();

		// Only add price filter to the query if both values are not at their default
		if (priceRange[0] !== 100 || priceRange[1] !== 500) {
			queryParams.set("price", priceFilterValue);
		}

		// Only add brands filter to the query if at least one brand is selected
		if (selectedBrands.length > 0) {
			queryParams.set("brands", selectedBrands.join(","));
		}

		// Here we call the function that would send the query to the server
		// This could be a call to fetchData or another method if you're using Redux or Context
	

		setIsDrawerOpen(false);
	};



	return (
		<>
			<Button
				type="button"
				startIcon={<Tune className="rtl:-mr-2 rtl:ml-2" />}
				onClick={() => setIsDrawerOpen(true)}
			>
				{t("readyCards.filters.button")}
			</Button>
			<Dialog
				open={isDrawerOpen}
				onClose={() => setIsDrawerOpen(false)}
				fullWidth
				maxWidth="xs"
				TransitionComponent={Transition}
			>
				<DialogTitle textAlign="center" textTransform="capitalize">
					{t("readyCards.filters.title")}
				</DialogTitle>
				<DialogContent>
					<form
						className="flex flex-col gap-4 px-4 py-5"
						onSubmit={handleFilter}
					>
						<PriceRange
							t={t}
							priceRange={priceRange}
							onPriceRangeChange={setPriceRange}
						/>

						<BrandsCheckBooks
							t={t}
							brands={brands}
							onBrandsChange={setBrands}
						/>

						<div className="grid place-content-center mt-4">
							<Button variant="contained" size="large" onClick={handleFilter}>
								{t("readyCards.filters.apply")}
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
}

const dummyBrands = [
	{ name: "Amazon", checked: false },
	{ name: "Apple", checked: false },
	{ name: "Google Play", checked: false },
	{ name: "iTunes", checked: false },
	{ name: "PlayStation", checked: false },
	{ name: "Steam", checked: false },
	{ name: "Xbox", checked: false },
];
