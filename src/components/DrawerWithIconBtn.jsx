import { useState } from "react";
import { IconButton, SwipeableDrawer } from "@mui/material";

export default function DrawerWithIconBtn({ BtnIcon, language, children }) {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const openDrawer = () => {
		setIsDrawerOpen(true);
	};

	const closeDrawer = () => {
		setIsDrawerOpen(false);
	};

	return (
		<>
			<IconButton
				type="button"
				onClick={openDrawer}
				className="!text-inherit !text-3xl"
			>
				<BtnIcon fontSize="inherit" />
			</IconButton>
			<SwipeableDrawer
				anchor={`${language === "en" ? "left" : "right"}`}
				open={isDrawerOpen}
				onClose={closeDrawer}
				onOpen={openDrawer}
			>
				<div className="w-96 h-full" onKeyDown={closeDrawer}>
					{children}
				</div>
			</SwipeableDrawer>
		</>
	);
}
