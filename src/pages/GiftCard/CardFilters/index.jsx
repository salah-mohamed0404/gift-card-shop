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

	const [searchParams, setSearchParams] = useSearchParams();
	const [priceRange, setPriceRange] = useState(() => {
		const price = searchParams.get("price");
		return price ? price.split("-").map((p) => parseInt(p)) : [100, 500];
	});

	const [brands, setBrands] = useState(() => {
		const brandsFromParams = searchParams.get("brands")?.split("-") || [];
		return dummyBrands.map(brand => ({
			...brand,
			checked: brandsFromParams.includes(brand.name)
		}));
	});

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
					if (brands.split(",").includes(brand)) {
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

  const priceFilterValue = priceRange.join("-");
  const selectedBrands = brands
    .filter(brand => brand.checked)
    .map(brand => brand.name)
    .join(",");
console.log(selectedBrands)
  // Update search params
  const newSearchParams = new URLSearchParams();
  if (priceFilterValue) newSearchParams.set("price", priceFilterValue);
  if (selectedBrands) newSearchParams.set("brand", selectedBrands);
  setSearchParams(newSearchParams);

  onFilterChange({ price: priceFilterValue, brand: selectedBrands });
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
	{ name: "HEZEL", checked: false },
	{ name: "2 GETHER", checked: false },
	{ name: "THE POP UP", checked: false },
	{ name: "ELCT", checked: false },
	{ name: "DURMA", checked: false },
	{ name: "FUN VIBES", checked: false },
	{ name: "RUMORS", checked: false },
	{ name: "KIN", checked: false },
	{ name: "SHAHIN", checked: false },
	{ name: "4TWINS", checked: false },
	{ name: "CROWD", checked: false },
	{ name: "MOVEN", checked: false },
	{ name: "NAGD", checked: false },
];

