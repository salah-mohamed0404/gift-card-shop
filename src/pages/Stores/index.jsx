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
		name: "HEZEL",
		logo: "https://i.ibb.co/bBF9Px6/shop0.png",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "2 GETHER",
		logo: "https://i.ibb.co/DkfXmPN/shop1.jpg",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "ELCT",
		logo: "https://i.ibb.co/FVMr576/shop2.png",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "THE POP UP",
		logo: "https://i.ibb.co/PTcKjC2/shop3.png",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "DURMA",
		logo: "https://i.ibb.co/yqvgtWJ/shop4.png",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "FUN VIBES",
		logo: "https://i.ibb.co/6YQbQtg/shop5.png",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "RUMORS",
		logo: "https://i.ibb.co/0XT0TM0/shop6.png",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "KIN",
		logo: "https://i.ibb.co/68ZnHbD/shop7.png",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "SHAHIN",
		logo: "https://i.ibb.co/NZcqYk2/shop8.png",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "4TWINS",
		logo: "https://i.ibb.co/841wCL7/shop9.png",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "CROWD",
		logo: "https://i.ibb.co/2MFhbkb/shop10.png",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	
	
	{
		name: "MOVEN",
		logo: "https://i.ibb.co/XzZtjmt/shop11.png",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	{
		name: "NAGD",
		logo: "https://i.ibb.co/QK0gpFG/shop12.png",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, alias quod ex placeat soluta quis dolore debitis obcaecati hic delectus cumque eaque? In officiis odio, expedita id non blanditiis maxime!",
		link: "#",
	},
	
];
