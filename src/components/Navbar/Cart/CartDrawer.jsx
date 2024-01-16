import { SwipeableDrawer } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function CartDrawer({
	isDrawerOpen,
	onCloseDrawer,
	onOpenDrawer,
}) {
	const {
		i18n: { language },
	} = useTranslation();

	return (
		<SwipeableDrawer
			anchor={`${language === "en" ? "left" : "right"}`}
			open={isDrawerOpen}
			onClose={onCloseDrawer}
			onOpen={onOpenDrawer}
		>
			<div className="w-96" onKeyDown={onCloseDrawer}></div>
		</SwipeableDrawer>
	);
}
