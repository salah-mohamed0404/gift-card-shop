import { Link } from "react-router-dom";
import { Pagination, PaginationItem } from "@mui/material";

export default function StoresPagination({ page, storesCount }) {
	return (
		<Pagination
			page={page}
			count={storesCount}
			renderItem={(item) => (
				<PaginationItem
					component={Link}
					to={`/stores${item.page === 1 ? "" : `?page=${item.page}`}`}
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