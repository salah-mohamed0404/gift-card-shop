import { Link, useLocation } from "react-router-dom";
import { Pagination, PaginationItem } from "@mui/material";

export default function CardPagination() {
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const page = parseInt(query.get("page") || "1", 10);

	return (
		<Pagination
			page={page}
			count={10}
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
