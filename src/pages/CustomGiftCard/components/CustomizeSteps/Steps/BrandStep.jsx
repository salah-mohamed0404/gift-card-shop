import React from "react";
import { Typography } from "@mui/material";
import axios from "axios";


export default function BrandStep({ brand, onBrandChange, t }) {
	console.log(brand)
const [stores,setStores] = React.useState([])
	React.useEffect(() => {
		const fetchData = async () => {
		

			
			try {
				const response = await axios.get(`http://localhost:3001/get-shops-logos`)
				console.log(response.data);
				setStores(response.data);
			  console.log(stores)
			} catch (error) {
				console.error('Error fetching cards:', error);
			}
		};

		fetchData();
	}, []);


	return (
		<div className="flex flex-col items-center gap-6">
			<Typography
				variant="h4"
				className="md:!text-4xl !text-3xl capitalize"
				textAlign="center"
			>
				{t("customCard.brand.title")}
			</Typography>

			<ul className="flex justify-center gap-12 flex-wrap">
				{stores.map(({ logoName,logoWithoutBackground, logoImage, }) => (
				
					<li key={logoName}>
						
						<button
							type="button"
							onClick={() => onBrandChange({ logoName, logoWithoutBackground })}
							className={`overflow-hidden rounded-full  shadow-lg ${
								logoName === brand.logoName
									? "outline-none ring-2 ring-offset-2 ring-red-500"
									: ""
							}`}
						>
							<img src={logoImage} alt="shape" className="w-[100px] h-[100px]   object-cover" />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}



