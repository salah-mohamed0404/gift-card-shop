import { AddCircle } from "@mui/icons-material";
import { Avatar, Card, CardContent, IconButton } from "@mui/material";
import AddToCartModal from "./AddToCartModal";
import { useState } from "react";
import { useTranslation } from "react-i18next";
export default function CardItem({ card, t }) {
	const { front, back, brand, price,title } = card;
	const [openCart, setOpenCart] = useState(false);

	return (
		<div
			
			className="!rounded-2xl"
		>
			<div className="relative group flex">
				<img
					className="w-full  rounded-2xl aspect-[2/1] object-cover transition duration-500 group-hover:opacity-0 group:hover:scale-75 z-10"
					src={'/images/front.png'}
					alt="card front face"
				/>
				<img
					className="absolute top-0 w-full  aspect-[2/1] rounded-2xl object-cover opacity-0 scale-x-75 transition group-hover:opacity-100 group-hover:scale-x-100"
					src={'/images/back.png'}
					alt="card back face"
				/>
			</div>
			<CardContent>
				<div className="flex justify-between items-center">
					<h3 className="flex items-center gap-2 text-lg">
						<Avatar
							src={card.imageUrl}
							alt={card.name}
							className="[&_img]:object-contain"
						/>
						{card.name}
					</h3>

					<IconButton
						className="!text-primary-500 !text-3xl"
						onClick={() => setOpenCart(true)}
					>
						<AddCircle fontSize="inherit" />
					</IconButton>
					<AddToCartModal
						t={t}
						open={openCart}
						onClose={() => setOpenCart(false)}
						card={card}
					/>
				</div>
				<p>
					{card.price} {t("currency")}
				</p>
			</CardContent>
		</div>
	);
}
