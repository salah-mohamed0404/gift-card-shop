import { forwardRef, useContext, useState } from "react";
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	FormControl,
	FormLabel,
	InputAdornment,
	Slide,
	TextField,
} from "@mui/material";
import { CartContext } from "../../store/CartContext";
import { AddCircleOutlineRounded } from "@mui/icons-material";
import ErrorHandler from "../../components/ErrorHandler";

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />;
});

export default function AddToCartModal({ t, open, onClose, card }) {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const { dispatchCart } = useContext(CartContext);

	const handleAddToCart = () => {
		if (name.trim() === "") return setErrorMsg("Please enter a name");
		else if (phone.trim() === "")
			return setErrorMsg("Please enter a phone number");

		dispatchCart({
			type: "ADD_ITEM",
			payload: {
				...card,
				receiverInfo: {
					name,
					phone,
				},
			},
		});

		onClose();
	};

	return (
		<ErrorHandler errorMsg={errorMsg} setErrorMsg={setErrorMsg}>
			<Dialog
				open={open}
				onClose={onClose}
				fullWidth
				maxWidth="sm"
				TransitionComponent={Transition}
			>
				<DialogTitle textAlign="center" textTransform="capitalize">
					{t("readyCards.modalTitle")}
				</DialogTitle>
				<DialogContent>
					<form className="px-8">
						<div className="flex flex-col gap-4">
							<FormControl fullWidth>
								<FormLabel
									className="capitalize"
									classes={{ root: "!text-lg" }}
								>
									{t("readyCards.name")}
								</FormLabel>
								<TextField
									variant="outlined"
									value={name}
									onChange={(e) => setName(e.target.value)}
									fullWidth
								/>
							</FormControl>

							<FormControl fullWidth>
								<FormLabel
									className="capitalize"
									classes={{ root: "!text-lg" }}
								>
									{t("readyCards.phone")}
								</FormLabel>
								<TextField
									variant="outlined"
									value={phone}
									InputProps={{
										startAdornment: (
											<InputAdornment
												position="start"
												className="*:!text-gray-800"
											>
												+966
											</InputAdornment>
										),
									}}
									onChange={(e) => {
										const value = e.target.value;
										if (!isNaN(value)) return setPhone(value);
									}}
									fullWidth
								/>
							</FormControl>
						</div>

						<div className="grid place-content-center mt-4">
							<Button
								type="button"
								startIcon={
									<AddCircleOutlineRounded className="rtl:-mr-2 rtl:ml-2" />
								}
								onClick={handleAddToCart}
							>
								{t("readyCards.addToCart")}
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>
		</ErrorHandler>
	);
}
