import { useContext, useState } from "react";
import { DeleteOutline, ShoppingBag } from "@mui/icons-material";
import DrawerWithIconBtn from "../DrawerWithIconBtn";
import { CartContext } from "../../store/CartContext";
import { Button, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Cart({ t, language }) {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const { cart, dispatchCart } = useContext(CartContext);

	return (
		<DrawerWithIconBtn
			isOpen={isDrawerOpen}
			onOpen={() => setIsDrawerOpen(true)}
			onClose={() => setIsDrawerOpen(false)}
			BtnIcon={ShoppingBag}
			language={language}
			className="flex flex-col justify-between py-8 px-6"
		>
			<Typography variant="h4" textAlign="center">
				{t("cart.title")} ({cart.length})
			</Typography>

			<ul className="h-[80dvh] overflow-y-auto">
				{cart.map((item, index) => (
					<li
						key={`${item.brand.name}-${item.receiverInfo.name}-${index}`}
						className="flex justify-between items-center bg-primary-500 text-white rounded-lg p-4 my-4"
						style={
							item.color && {
								backgroundColor: item.color,
								color: item.textColor,
							}
						}
					>
						<div>
							<Typography variant="h6">
								{item.color ? t("cart.customCard") : t("cart.readyCard")}
							</Typography>
							<Typography variant="subtitle2">
								{t("cart.receiverInfo")}: {item.receiverInfo.name} - +966
								{item.receiverInfo.phone}
							</Typography>
							<div className="flex gap-5">
								<Typography variant="subtitle2">
									{t("cart.brand")}: {item.brand.name}
								</Typography>
								<Typography variant="subtitle2">
									{t("cart.price")}: {item.price} {t("currency")}
								</Typography>
							</div>
						</div>
						<div>
							<IconButton
								onClick={() =>
									dispatchCart({ type: "REMOVE_ITEM", payload: index })
								}
								className="!text-red-500 !bg-white"
							>
								<DeleteOutline fontSize="inherit" />
							</IconButton>
						</div>
					</li>
				))}
			</ul>

			<div className="grid place-items-center">
				<Button
					variant="contained"
					size="large"
					disabled={!cart.length}
					LinkComponent={Link}
					to="/checkout"
				>
					{t("cart.checkout")}
				</Button>
			</div>
		</DrawerWithIconBtn>
	);
}
