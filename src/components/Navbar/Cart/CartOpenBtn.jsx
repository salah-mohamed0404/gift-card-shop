import { ShoppingBag } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function CartOpenBtn({ onOpenDrawer }) {
	return (
		<IconButton onClick={onOpenDrawer} className="!text-inherit">
			<ShoppingBag />
		</IconButton>
	);
}
