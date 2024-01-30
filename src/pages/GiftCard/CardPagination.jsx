import { Link } from "react-router-dom";
import { Pagination, PaginationItem } from "@mui/material";

export default function CardPagination({ currentPage, setPage, totalPages }) {
	const handlePageChange = (event, value) => {
		setPage(value); // Update page in parent component's state
	};

	return (
		<Pagination
			page={currentPage}
			count={totalPages}
			onChange={handlePageChange}
			renderItem={(item) => (
				<PaginationItem
					component={Link}
					to={`/gift-card${item.page === 1 ? "" : `?page=${item.page}`}`}
					{...item}
				/>
			)}
			size="large"
			sx={{
				"*:where([dir='rtl']) & li:is(:first-child, :last-child)": {
					rotate: "180deg",
				},
			}}
		/>
	);
}