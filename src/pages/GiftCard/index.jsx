import React, { useEffect, useState } from "react";
import axios from 'axios';
import CardItem from "./CardItem"; // Adjust the import paths as necessary
import CardPagination from "./CardPagination"; // Adjust the import paths as necessary
import CardFilters from "./CardFilters"; // Adjust the import paths as necessary
import { useTranslation } from "react-i18next";

export default function GiftCard() {
  const { t } = useTranslation();
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    price: '0-500',
    brand: '',
  });
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams();
      queryParams.append("page", currentPage);
      queryParams.append("limit", 6); // or any other limit you prefer

      // Add filters to query params
      if (filters.price !== '0-500') {
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
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  return (
    <main className="mt-40 md:mb-14 mb-12">
      {/* UI Components and handlers */}
      <div className="w-3/4 mx-auto">
        <h1 className="md:text-4xl text-2xl font-medium text-center mb-20">
          <span className="text-primary-500">{t("readyCards.title")}</span>
          {t("readyCards.titleSuffix")}
        </h1>

        <div className="flex justify-between items-center mb-6 pb-2 border-b-2 text-lg">
          <p>{t("readyCards.results", { count: cards && cards.length })}</p>
          <CardFilters t={t} filters={filters} onFilterChange={handleFilterChange} />
        </div>

        <ul className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-10 gap-y-6">
          {cards && cards.map(card => (
			(console.log(card)),
            <CardItem key={card._id} card={card} price={card.price} t={t} />
          ))}
        </ul>

        <div className="grid place-content-center mt-20">
          <CardPagination currentPage={currentPage} setPage={setCurrentPage} totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}
