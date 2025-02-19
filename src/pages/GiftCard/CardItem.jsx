import { AddCircle } from "@mui/icons-material";
import { Avatar, Card, CardContent, IconButton } from "@mui/material";
import AddToCartModal from "./AddToCartModal";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function CardItem({ card, front, back, brandImage, brandName ,price}) {
	const [openCart, setOpenCart] = useState(false);
	const { t } = useTranslation();

	return (
		<div className="rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
			<div className="relative group flex justify-center md:h-[240px] h-[180px]" style={{ maxWidth: '480px',margin:'auto' }}>
				<div style={{ position: 'relative', width: '100%' }}> {/* Aspect ratio container */}
					<img
						className="rounded-2xl object-cover transition duration-500 group-hover:opacity-0 group-hover:scale-75 z-10"
						src={card.cardFront}
						style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',objectFit: 'fill' }} 
						alt="card front face"
					/>
					<img
						className="rounded-2xl object-cover opacity-0 scale-x-75 transition group-hover:opacity-100 group-hover:scale-x-100"
						src={card.cardBack}
						style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' ,objectFit: 'fill'}}
						alt="card back face"
					/>
				</div>
			</div>
			<CardContent>
				<div className="flex justify-between items-center p-4 py-0">
					<div>
						<div className="flex items-center gap-2">
							<Avatar
								src={card.logoImage}
								alt={card.logoName}
								style={{ width: '80px', height: '80px', objectFit: 'cover',border: '1px solid #000'}}
							/>
							<div>
								<h3 className="text-2xl font-semibold text-gray-700">{card.logoName}</h3>
								<p className="text-gray-800 text-xl">{`${price} ${t("currency")}`}</p>
							</div>
						</div>
					</div>
					<IconButton
						className="text-primary-500 text-3xl"
						onClick={() => setOpenCart(true)}
					>
						<AddCircle fontSize="inherit" />
					</IconButton>
				</div>
			</CardContent>
			<AddToCartModal
				t={t}
				open={openCart}
				onClose={() => setOpenCart(false)}
				card={card}
			/>
		</div>
	);
}
