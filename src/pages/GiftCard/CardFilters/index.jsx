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

		const priceFilterValue = priceRange.join("-"); // priceRange should be an array
		const selectedBrands = brands
			.filter(brand => brand.checked)
			.map(brand => brand.name)
			.join(","); // Joining as string

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
	{ name: "GETHER", checked: false },
	{ name: "THE POP UP", checked: false },
	{ name: "ELCT", checked: false },
	{ name: "DURMA", checked: false },
	{ name: "FUN WBES", checked: false },
	{ name: "RUMORS", checked: false },
	{ name: "DURMA", checked: false },
	{ name: "KN", checked: false },
	{ name: "SHAHIN", checked: false },
	{ name: "TWINS", checked: false },
	{ name: "FUN WBES", checked: false },
	{ name: "CROWD", checked: false },
];

const stores = [
	{
		name: "HEZEL",
		logo: "/images/shops/shop0.png",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "GETHER",
		logo: "/images/shops/shop1.jpg",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "ELCT",
		logo: "/images/shops/shop2.png",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "THE POP UP",
		logo: "/images/shops/shop3.png",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "DURMA",
		logo: "/images/shops/shop4.png",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "FUN WBES",
		logo: "/images/shops/shop5.png",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "RUMORS",
		logo: "/images/shops/shop6.png",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "KN",
		logo: "/images/shops/shop7.png",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "SHAHIN",
		logo: "/images/shops/shop8.png",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "TWINS",
		logo: "/images/shops/shop9.png",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "CROWD",
		logo: "/images/shops/shop10.png",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},


];
