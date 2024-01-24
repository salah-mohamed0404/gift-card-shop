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

export default function CardFilters({ t }) {
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

		if (priceRange[0] === 100 && priceRange[1] === 500) {
			setSearchParams((prev) => {
				prev.delete("price");
				return prev;
			});
		} else {
			setSearchParams((prev) => {
				prev.set("price", priceRange.join("-"));
				return prev;
			});
		}

		const checkedBrands = brands.filter((brand) => brand.checked);
		if (checkedBrands.length === 0) {
			setSearchParams((prev) => {
				prev.delete("brands");
				return prev;
			});
		} else {
			setSearchParams((prev) => {
				prev.set("brands", checkedBrands.map((brand) => brand.name).join("-"));
				return prev;
			});
		}

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
