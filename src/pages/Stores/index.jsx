import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import StoreItem from "./StoreItem";
import StoresPagination from "./StoresPagination";

const STORES_PER_PAGE = 9;

export default function Stores() {
	const { t } = useTranslation();
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const page = parseInt(query.get("page") || "1", 10);

	const preparedStores = useMemo(
		() => stores.slice((page - 1) * STORES_PER_PAGE, page * STORES_PER_PAGE),
		[page]
	);

	return (
		<main className="mt-40 md:mb-14 mb-12">
			<div className="w-3/4 mx-auto">
				<h1 className="md:text-4xl text-2xl font-medium text-center mb-20">
					<span className="text-primary-500">{t("stores.title")}</span>{" "}
					{t("stores.titleSuffix")}
				</h1>

				<ul className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-10 gap-y-6">
					{preparedStores.map((store, index) => (
						<li key={`${store.name}-${index}`}>
							<StoreItem store={store} />
						</li>
					))}
				</ul>

				<div className="grid place-content-center mt-20">
					<StoresPagination
						page={page}
						storesCount={Math.ceil(stores.length / STORES_PER_PAGE)}
					/>
				</div>
			</div>
		</main>
	);
}

const stores = [
	{
		name: "test",
		logo: "/images/logos/shop.jpg",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "test",
		logo: "/images/HEZEL.png",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "test",
		logo: "/images/logos/shop.jpg",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "test",
		logo: "/images/HEZEL.png",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "test",
		logo: "/images/logos/shop.jpg",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "test",
		logo: "/images/HEZEL.png",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "test",
		logo: "/images/logos/shop.jpg",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "test",
		logo: "/images/HEZEL.png",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "test",
		logo: "/images/logos/shop.jpg",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "test",
		logo: "/images/HEZEL.png",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "test",
		logo: "/images/logos/shop.jpg",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "test",
		logo: "/images/HEZEL.png",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "test",
		logo: "/images/logos/shop.jpg",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "test",
		logo: "/images/HEZEL.png",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "test",
		logo: "/images/logos/shop.jpg",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "test",
		logo: "/images/HEZEL.png",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "test",
		logo: "/images/logos/shop.jpg",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
];
