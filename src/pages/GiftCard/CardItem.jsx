import { AddCircle } from "@mui/icons-material";
import { Avatar, Card, CardContent, IconButton } from "@mui/material";
import AddToCartModal from "./AddToCartModal";
import { useState } from "react";
import { useTranslation } from "react-i18next";
export default function CardItem({ card, t,front,back }) {
	const { brand, price,title } = card;
	const [openCart, setOpenCart] = useState(false);

	return (
		<div
			
			className="!rounded-2xl"
		>
			<div className="relative group flex justify-center" style={{ maxWidth: '480px', height: '290px' }}>
				<div style={{ position: 'relative', width: '100%', paddingBottom: '50%' }}> {/* Aspect ratio container */}
					<img
						className="rounded-2xl object-cover transition duration-500 group-hover:opacity-0 group-hover:scale-75 z-10"
						src={front}
						style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
						alt="card front face"
					/>
					<img
						className="rounded-2xl object-cover opacity-0 scale-x-75 transition group-hover:opacity-100 group-hover:scale-x-100"
						src={back}
						style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
						alt="card back face"
					/>
				</div>
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
