import { useState } from "react";
import CartOpenBtn from "./CartOpenBtn";
import CartDrawer from "./CartDrawer";

export default function Cart() {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const openDrawer = () => {
		setIsDrawerOpen(true);
	};

	const closeDrawer = () => {
		setIsDrawerOpen(false);
	};

	return (
		<>
			<CartOpenBtn onOpenDrawer={openDrawer} />
			<CartDrawer
				isDrawerOpen={isDrawerOpen}
				onCloseDrawer={closeDrawer}
				onOpenDrawer={openDrawer}
			/>
		</>
	);
}
