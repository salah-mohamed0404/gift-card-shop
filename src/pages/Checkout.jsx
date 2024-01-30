import React, { useState ,useEffect} from 'react';
import {
	Button,
	TextField,
	CircularProgress,
	FormControlLabel,
	Checkbox,
	Divider,
	FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    Select,
} from '@mui/material';

import { LocalizationProvider, DatePicker, StaticDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from 'dayjs';

import axios from 'axios';



const Checkout = () => {



	const TOMORROW = dayjs()
		.add(1, "day")
		.set("hour", dayjs().hour() + 1);
	const MAX_SCHEDULE_DATE = dayjs().add(31, "day");

	const [isScheduled, setIsScheduled] = useState(false);
	const [scheduleDate, setScheduleDate] = useState(dayjs().add(1, 'day'));
	const [expiryDate, setExpiryDate] = useState("");
	const [schedule, setSchedule] = useState(null);
	// State declarations
	const [billingDetails, setBillingDetails] = useState({
		firstName: '',
		lastName: '',
		country: 'Saudi Arabia', // Default or detected user's country
		address: '',
		city: '',
		zip: '',
		email: '',
	});
	const [additionalInfo, setAdditionalInfo] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [sessionDetails, setSessionDetails] = useState({ countryCode: '', sessionId: '' });
	const [isSessionLoading, setIsSessionLoading] = useState(false);
	const [sessionError, setSessionError] = useState('');

	// Function to call MyFatoorah InitiateSession API
	const initiateSession = async () => {
		setIsSessionLoading(true);
		try {
			const response = await axios.post('http://localhost:3001/api/initiateSession');
			setSessionDetails({
				countryCode: response.data.countryCode,
				sessionId: response.data.sessionId,
			});
			setIsSessionLoading(false);
		} catch (error) {
			console.error('Error fetching session from server:', error);
			setSessionError('Failed to initiate session.');
			setIsSessionLoading(false);
		}
	};


	// Handle input change for billing details
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setBillingDetails(prevState => ({
			...prevState,
			[name]: value
		}));
	};

	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('applePay');

	const handlePaymentMethodChange = (event) => {
		setSelectedPaymentMethod(event.target.value);
	};



	var config = {
		countryCode: "SA", // Here, add your Country Code you receive from InitiateSession Endpoint.
		sessionId: sessionDetails.sessionId, // Here you add the "SessionId" you receive from InitiateSession Endpoint.
		cardViewId: "card-element",
	};
	myFatoorah.init(config);
	// Add more state as necessary for order summary and payment details

	// Handle input change for billing details
	const handleBillingInputChange = (e) => {
		const { name, value } = e.target;
		setBillingDetails(prevState => ({
			...prevState,
			[name]: value
		}));
	};

	// Replace with your form submission logic
	const handlePayment = async () => {
		// Construct the payment data here based on your MyFatoorah API requirements
		const paymentData = {
			// ... populate with necessary payment data
			paymentMethod: selectedPaymentMethod,
		};

		try {
			const response = await axios.post('https://api.myfatoorah.com/v2/SendPayment', paymentData, {
				headers: {
					Authorization: `Bearer YOUR_API_KEY`, // Replace with your actual API key
					'Content-Type': 'application/json',
				},
			});
			// Handle the response from MyFatoorah
			onPaymentSuccess(response.data);
		} catch (error) {
			console.error('Payment processing failed:', error);
			onPaymentFailure(error);
		}
	};
	// Call InitiateSession when the component mounts
	useEffect(() => {
		initiateSession();
	}, []);

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
		<div className="container mx-auto my-[200px] bg-white shadow-md rounded px-8 py-8 ">
				<form onSubmit={handlePayment} className="flex flex-col gap-6">
				<h2 className="text-2xl font-semibold mb-5">Checkout</h2>

				{/* Billing & Shipping Section */}
				<div>
					<h3 className="font-bold mb-2 text-lg">Billing & Shipping</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
						<TextField label="First Name *" name="firstName" value={billingDetails.firstName} onChange={handleInputChange} required className="w-full" />
						<TextField label="Last Name *" name="lastName" value={billingDetails.lastName} onChange={handleInputChange} required className="w-full" />
						<TextField label="Country / Region *" name="country" value={billingDetails.country} onChange={handleInputChange} required className="w-full" />
						<TextField label="Address *" name="address" value={billingDetails.address} onChange={handleInputChange} required className="w-full" />
						<TextField label="City *" name="city" value={billingDetails.city} onChange={handleInputChange} required className="w-full" />
						<TextField label="ZIP / Postal Code *" name="zip" value={billingDetails.zip} onChange={handleInputChange} required className="w-full" />
						<TextField label="Email Address *" name="email" value={billingDetails.email} onChange={handleInputChange} required type="email" className="w-full" />
					</div>
					<Divider />
				</div>

				{/* Additional Information Section */}
				<div>
					<h3 className="font-bold mb-2 text-lg">Additional Information</h3>
					<TextField
						label="Order Notes (optional)"
						name="additionalInfo"
						value={additionalInfo}
						onChange={(e) => setAdditionalInfo(e.target.value)}
						multiline
						rows={4}
						className="w-full mb-4"
					/>
					<Divider />
				</div>

				{/* Your Order Section */}
				<div>
					<h3 className="font-bold mb-2 text-lg">Your Order</h3>
					<div className="mb-4">
						{/* Map through your order items here */}
						<div className="flex justify-between py-2">
							<span>Product XYZ</span>
							<span>$19.99</span>
						</div>
						{/* Add more products and total cost */}
						<div className="flex justify-between py-2 font-bold">
							<span>Total</span>
							<span>$199.99</span>
						</div>
					</div>
					<Divider />
				</div>

				{/* Payment Section - Assuming PaymentForm includes all necessary payment fields */}
				{/* <PaymentForm /> */}

				{/* Terms and Conditions */}
					<FormControl component="fieldset">
						<RadioGroup
							aria-label="payment method"
							name="paymentMethod"
							value={selectedPaymentMethod}
							onChange={handlePaymentMethodChange}
						>
							<FormControlLabel value="applePay" control={<Radio />} label="Apple Pay" />
							<FormControlLabel value="mada" control={<Radio />} label="Mada" />
							<FormControlLabel value="stcPay" control={<Radio />} label="STC Pay" />
						</RadioGroup>

					</FormControl>
					<div id="card-element"></div>
					<FormControlLabel
						control={<Checkbox name="agreeToTerms" />}
						label="I agree to the terms and conditions *"
						className="my-4"
					/>
					{/* Schedule Delivery Checkbox */}
					<FormControlLabel
						control={
							<Checkbox
								checked={isScheduled}
								onChange={(e) => setIsScheduled(e.target.checked)}
							/>
						}
						label="Schedule Delivery"
						className="self-start"
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


				{/* Submit Button */}
				<Button
					type="submit"
					variant="contained"
					color="primary"
					disabled={isLoading}
					className="w-full py-2 text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
				>
						{isSessionLoading && <CircularProgress />}
						{sessionError && <div className="text-red-500">{sessionError}</div>}
				</Button>

				{/* Error Message */}
				{error && <div className="text-red-500 text-lg mt-2">{error}</div>}
			
			</form>
		</div>
			</LocalizationProvider>
	);
};

export default Checkout;
