import { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import {
	Button,
	TextField,
	CircularProgress,
	Typography,
	Checkbox,
	FormControlLabel,
} from "@mui/material";
import {
	LocalizationProvider,
	StaticDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const TOMORROW = dayjs()
	.add(1, "day")
	.set("hour", dayjs().hour() + 1);
const MAX_SCHEDULE_DATE = dayjs().add(31, "day");

const Checkout = () => {
	// State declarations
	const [customerName, setCustomerName] = useState("");
	const [mobileCountryCode, setMobileCountryCode] = useState("+965");
	const [customerMobile, setCustomerMobile] = useState("");
	const [customerEmail, setCustomerEmail] = useState("");
	const [invoiceValue, setInvoiceValue] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [amount, setAmount] = useState("");
	const [cardNumber, setCardNumber] = useState("");
	const [expiryDate, setExpiryDate] = useState("");
	const [isScheduled, setIsScheduled] = useState(false);
	const [schedule, setSchedule] = useState(null);

	const { t } = useTranslation();
	const textFieldClasses =
		"mb-4 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg rtl:text-right";

	const FormLabel = ({ text }) => (
		<Typography variant="h6" className="mb-2">
			{text}
		</Typography>
	);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		setError(null);
		const paymentData = {
			PaymentMethodId: "2", // The ID of the payment method chosen by the customer
			CustomerName: customerName,
			DisplayCurrencyIso: "KWD", // The currency in ISO format
			MobileCountryCode: mobileCountryCode,
			CustomerMobile: customerMobile, // Customer's mobile number
			CustomerEmail: customerEmail,
			InvoiceValue: parseFloat(invoiceValue), // Total value of the invoice
			CallBackUrl: "https://google.com", // URL to redirect to after payment completion
			ErrorUrl: "https://google.com", // URL to redirect to after a payment error
			Language: "en", // Language of the payment page
			CustomerReference: "ref 1", // A reference ID for the customer
			CustomerAddress: {
				// Customer's address
				Block: "",
				Street: "",
				HouseBuildingNo: "",
				Address: "",
				AddressInstructions: "",
			},
			InvoiceItems: [
				// List of items included in the payment
				{ ItemName: "Product 01", Quantity: 1, UnitPrice: 100 },
			],
		};

		try {
			const response = await axios.post(
				"http://localhost:3001/process-payment",
				paymentData
			);
			console.log(response.data);
			// Handle successful response
		} catch (apiError) {
			console.error("Error:", apiError);
			setError("Payment processing failed.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			className="p-4 md:px-[200px] my-44 flex flex-col gap-y-8"
			onSubmit={handleSubmit}
		>
			<div>
				<FormLabel text={t("checkoutForm.name")} />
				<TextField
					variant="outlined"
					className={textFieldClasses}
					value={customerName}
					onChange={(e) => setCustomerName(e.target.value)}
				/>
			</div>
			<div>
				<FormLabel text={t("checkoutForm.mobileCode")} />
				<TextField
					variant="outlined"
					className={textFieldClasses}
					value={mobileCountryCode}
					onChange={(e) => setMobileCountryCode(e.target.value)}
				/>
			</div>
			<div>
				<FormLabel text={t("checkoutForm.phone")} />
				<TextField
					variant="outlined"
					className={textFieldClasses}
					value={customerMobile}
					onChange={(e) => setCustomerMobile(e.target.value)}
				/>
			</div>
			<div>
				<FormLabel text={t("checkoutForm.email")} />
				<TextField
					variant="outlined"
					className={textFieldClasses}
					value={customerEmail}
					onChange={(e) => setCustomerEmail(e.target.value)}
				/>
			</div>
			<div>
				<FormLabel text={t("checkoutForm.invoice")} />
				<TextField
					variant="outlined"
					className={textFieldClasses}
					value={invoiceValue}
					onChange={(e) => setInvoiceValue(e.target.value)}
					type="number"
				/>
			</div>
			<div>
				<FormLabel text={t("checkoutForm.amount")} />
				<TextField
					variant="outlined"
					className={textFieldClasses}
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					type="number"
				/>
			</div>
			<div>
				<FormLabel text={t("checkoutForm.cardNumber")} />
				<TextField
					variant="outlined"
					className={textFieldClasses}
					value={cardNumber}
					onChange={(e) => setCardNumber(e.target.value)}
				/>
			</div>
			<div>
				<FormLabel text={t("checkoutForm.expiryDate")} />
				<TextField
					variant="outlined"
					className={textFieldClasses}
					value={expiryDate}
					onChange={(e) => setExpiryDate(e.target.value)}
				/>
			</div>
			<div>
				<FormControlLabel
					control={
						<Checkbox
							checked={isScheduled}
							onChange={() => setIsScheduled((prev) => !prev)}
						/>
					}
					label="Schedule"
				/>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<StaticDateTimePicker
						orientation="landscape"
						value={schedule}
						onChange={(newValue) => setSchedule(newValue)}
						minDateTime={TOMORROW}
						maxDateTime={MAX_SCHEDULE_DATE}
						disabled={!isScheduled}
						className={`${isScheduled ? "" : "opacity-50 pointer-events-none"}`}
					/>
				</LocalizationProvider>
			</div>
			<Button
				variant="contained"
				color="primary"
				className="mt-4 w-full bg-blue-500 text-2xl hover:bg-blue-700 text-white font-bold flex  rounded "
				disabled={loading}
				type="submit"
			>
				{loading ? (
					<CircularProgress size={24} />
				) : (
					<span className=" p-2 text-2xl">{t("checkoutForm.pay")}</span>
				)}
			</Button>
			{error && <div className="text-red-500 mt-2 text-lg">{error}</div>}
		</form>
	);
};

export default Checkout;
