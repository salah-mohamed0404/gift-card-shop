import { IconButton, SwipeableDrawer } from "@mui/material";

export default function DrawerWithIconBtn({
	isOpen,
	onOpen,
	onClose,
	BtnIcon,
	language,
	className = "",
	children,
}) {
	return (
		<>
			<IconButton
				type="button"
				onClick={onOpen}
				className="!text-inherit !text-3xl"
			>
				<BtnIcon fontSize="inherit" />
			</IconButton>
			<SwipeableDrawer
				anchor={`${language === "en" ? "left" : "right"}`}
				open={isOpen}
				onClose={onClose}
				onOpen={onOpen}
			>
				<div
					className={`md:w-[26rem] w-dvw h-full ${className}`}
					onKeyDown={onClose}
				>
					{children}
				</div>
			</SwipeableDrawer>
		</>
	);
}
