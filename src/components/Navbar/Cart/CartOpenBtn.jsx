import { ShoppingBag } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function CartOpenBtn({ onOpenDrawer }) {
	return (
		<IconButton
			type="button"
			onClick={onOpenDrawer}
			className="!text-inherit !text-3xl"
		>
			<ShoppingBag fontSize="inherit" />
		</IconButton>
	);
}
