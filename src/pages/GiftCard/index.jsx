import React,{useEffect,useState,forwardRef} from "react";
import { useTranslation } from "react-i18next";
import CardItem from "./CardItem";
import CardPagination from "./CardPagination";
import CardFilters from "./CardFilters";
import axios from 'axios'
export default function GiftCard() {
	const { t } = useTranslation();
	const [cards, setCards] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [filters, setFilters] = useState({
		price: '0-500', // Example range, adjust according to your needs
		brand: '',
	});


	const [totalPages, setTotalPages] = useState(1);
	
	
	

	
	useEffect(() => {
		const fetchData = async () => {
			const queryParams = new URLSearchParams({ page: currentPage });

			if (filters.price && filters.price !== '0-500') { // Check against your default range
				queryParams.set('price', filters.price);
			}
			if (filters.brand) {
				queryParams.set('brands', filters.brand);
			
			}

			try {
				const response = await axios.get(`http://localhost:3001/api/cards?${queryParams}`);
				setCards(response.data.data);
				setTotalPages(response.data.totalPages);
			} catch (error) {
				console.error('Error fetching cards:', error);
			}
		};

		fetchData();
	}, [currentPage, filters]);

	

const handleFilterChange = (newFilters) => {
		console.log('newFilters.price:', newFilters); // Debugging line
newFilters.brand =cards.brand
		if (Array.isArray(newFilters.price)) {
			newFilters.price = newFilters.price.join('-'); // Convert to '100-500' format
		}
if (Array.isArray(newFilters.brand)) {
			newFilters.brand = newFilters.brand.join(','); // Convert to '100-500' format
		}
		setFilters(prevFilters => ({
			...prevFilters,
			...newFilters
		}));
	};



	return (
		<main className="mt-40 md:mb-14 mb-12">
			<div className="w-3/4 mx-auto">
				<h1 className="md:text-4xl text-2xl font-medium text-center mb-20">
					<span className="text-primary-500">{t("readyCards.title")}</span>
					{t("readyCards.titleSuffix")}
				</h1>

				<div className="flex justify-between items-center mb-6 pb-2 border-b-2 text-lg">
					<p>{t("readyCards.results", { count: cards&& cards.length })}</p>
					<CardFilters t={t} filters={filters}
						onFilterChange={handleFilterChange} />
				</div>

				<ul className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-10 gap-y-6">
					
					{cards && cards.map(card => <CardItem key={card.id} front={'/images/front.png'} back={'images/back.png'} brandImage={card.imageUrl} brandName={card.brand} card={card} t={t} />)}
				</ul>

				<div className="grid place-content-center mt-20">
					<CardPagination currentPage={currentPage} setPage={setCurrentPage} totalPages={totalPages} />
				</div>
			</div>
		</main>
	);
}
