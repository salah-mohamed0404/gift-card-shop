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
	InputLabel,
    MenuItem,
    InputAdornment,
    Grid,
    Card,
} from '@mui/material';

import { LocalizationProvider, DatePicker, StaticDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from 'dayjs';

import axios from 'axios';



const Checkout = () => {

	const countries = [
		{ code: 'AF', label: 'Afghanistan' },
		{ code: 'AX', label: 'Åland Islands' },
		{ code: 'AL', label: 'Albania' },
		{ code: 'DZ', label: 'Algeria' },
		{ code: 'AS', label: 'American Samoa' },
		{ code: 'AD', label: 'Andorra' },
		{ code: 'AO', label: 'Angola' },
		{ code: 'AI', label: 'Anguilla' },
		{ code: 'AQ', label: 'Antarctica' },
		{ code: 'AG', label: 'Antigua and Barbuda' },
		{ code: 'AR', label: 'Argentina' },
		{ code: 'AM', label: 'Armenia' },
		{ code: 'AW', label: 'Aruba' },
		{ code: 'AU', label: 'Australia' },
		{ code: 'AT', label: 'Austria' },
		{ code: 'AZ', label: 'Azerbaijan' },
		{ code: 'BS', label: 'Bahamas' },
		{ code: 'BH', label: 'Bahrain' },
		{ code: 'BD', label: 'Bangladesh' },
		{ code: 'BB', label: 'Barbados' },
		{ code: 'BY', label: 'Belarus' },
		{ code: 'BE', label: 'Belgium' },
		{ code: 'BZ', label: 'Belize' },
		{ code: 'BJ', label: 'Benin' },
		{ code: 'BM', label: 'Bermuda' },
		{ code: 'BT', label: 'Bhutan' },
		{ code: 'BO', label: 'Bolivia' },
		{ code: 'BQ', label: 'Bonaire, Sint Eustatius and Saba' },
		{ code: 'BA', label: 'Bosnia and Herzegovina' },
		{ code: 'BW', label: 'Botswana' },
		{ code: 'BV', label: 'Bouvet Island' },
		{ code: 'BR', label: 'Brazil' },
		{ code: 'IO', label: 'British Indian Ocean Territory' },
		{ code: 'BN', label: 'Brunei Darussalam' },
		{ code: 'BG', label: 'Bulgaria' },
		{ code: 'BF', label: 'Burkina Faso' },
		{ code: 'BI', label: 'Burundi' },
		{ code: 'CV', label: 'Cabo Verde' },
		{ code: 'KH', label: 'Cambodia' },
		{ code: 'CM', label: 'Cameroon' },
		{ code: 'CA', label: 'Canada' },
		{ code: 'KY', label: 'Cayman Islands' },
		{ code: 'CF', label: 'Central African Republic' },
		{ code: 'TD', label: 'Chad' },
		{ code: 'CL', label: 'Chile' },
		{ code: 'CN', label: 'China' },
		{ code: 'CX', label: 'Christmas Island' },
		{ code: 'CC', label: 'Cocos (Keeling) Islands' },
		{ code: 'CO', label: 'Colombia' },
		{ code: 'KM', label: 'Comoros' },
		{ code: 'CD', label: 'Congo (the Democratic Republic of the)' },
		{ code: 'CG', label: 'Congo' },
		{ code: 'CK', label: 'Cook Islands' },
		{ code: 'CR', label: 'Costa Rica' },
		{ code: 'CI', label: "Côte d'Ivoire" },
		{ code: 'HR', label: 'Croatia' },
		{ code: 'CU', label: 'Cuba' },
		{ code: 'CW', label: 'Curaçao' },
		{ code: 'CY', label: 'Cyprus' },
		{ code: 'CZ', label: 'Czechia' },
		{ code: 'DK', label: 'Denmark' },
		{ code: 'DJ', label: 'Djibouti' },
		{ code: 'DM', label: 'Dominica' },
		{ code: 'DO', label: 'Dominican Republic' },
		{ code: 'EC', label: 'Ecuador' },
		{ code: 'EG', label: 'Egypt' },
		{ code: 'SV', label: 'El Salvador' },
		{ code: 'GQ', label: 'Equatorial Guinea' },
		{ code: 'ER', label: 'Eritrea' },
		{ code: 'EE', label: 'Estonia' },
		{ code: 'SZ', label: 'Eswatini' },
		{ code: 'ET', label: 'Ethiopia' },
		{ code: 'FK', label: 'Falkland Islands [Malvinas]' },
		{ code: 'FO', label: 'Faroe Islands' },
		{ code: 'FJ', label: 'Fiji' },
		{ code: 'FI', label: 'Finland' },
		{ code: 'FR', label: 'France' },
		{ code: 'GF', label: 'French Guiana' },
		{ code: 'PF', label: 'French Polynesia' },
		{ code: 'TF', label: 'French Southern Territories' },
		{ code: 'GA', label: 'Gabon' },
		{ code: 'GM', label: 'Gambia' },
		{ code: 'GE', label: 'Georgia' },
		{ code: 'DE', label: 'Germany' },
		{ code: 'GH', label: 'Ghana' },
		{ code: 'GI', label: 'Gibraltar' },
		{ code: 'GR', label: 'Greece' },
		{ code: 'GL', label: 'Greenland' },
		{ code: 'GD', label: 'Grenada' },
		{ code: 'GP', label: 'Guadeloupe' },
		{ code: 'GU', label: 'Guam' },
		{ code: 'GT', label: 'Guatemala' },
		{ code: 'GG', label: 'Guernsey' },
		{ code: 'GN', label: 'Guinea' },
		{ code: 'GW', label: 'Guinea-Bissau' },
		{ code: 'GY', label: 'Guyana' },
		{ code: 'HT', label: 'Haiti' },
		{ code: 'HM', label: 'Heard Island and McDonald Islands' },
		{ code: 'VA', label: 'Holy See' },
		{ code: 'HN', label: 'Honduras' },
		{ code: 'HK', label: 'Hong Kong' },
		{ code: 'HU', label: 'Hungary' },
		{ code: 'IS', label: 'Iceland' },
		{ code: 'IN', label: 'India' },
		{ code: 'ID', label: 'Indonesia' },
		{ code: 'IR', label: 'Iran' },
		{ code: 'IQ', label: 'Iraq' },
		{ code: 'IE', label: 'Ireland' },
		{ code: 'IM', label: 'Isle of Man' },
		{ code: 'IL', label: 'Israel' },
		{ code: 'IT', label: 'Italy' },
		{ code: 'JM', label: 'Jamaica' },
		{ code: 'JP', label: 'Japan' },
		{ code: 'JE', label: 'Jersey' },
		{ code: 'JO', label: 'Jordan' },
		{ code: 'KZ', label: 'Kazakhstan' },
		{ code: 'KE', label: 'Kenya' },
		{ code: 'KI', label: 'Kiribati' },
		{ code: 'KP', label: "Korea (the Democratic People's Republic of)" },
		{ code: 'KR', label: 'Korea (the Republic of)' },
		{ code: 'KW', label: 'Kuwait' },
		{ code: 'KG', label: 'Kyrgyzstan' },
		{ code: 'LA', label: "Lao People's Democratic Republic" },
		{ code: 'LV', label: 'Latvia' },
		{ code: 'LB', label: 'Lebanon' },
		{ code: 'LS', label: 'Lesotho' },
		{ code: 'LR', label: 'Liberia' },
		{ code: 'LY', label: 'Libya' },
		{ code: 'LI', label: 'Liechtenstein' },
		{ code: 'LT', label: 'Lithuania' },
		{ code: 'LU', label: 'Luxembourg' },
		{ code: 'MO', label: 'Macao' },
		{ code: 'MG', label: 'Madagascar' },
		{ code: 'MW', label: 'Malawi' },
		{ code: 'MY', label: 'Malaysia' },
		{ code: 'MV', label: 'Maldives' },
		{ code: 'ML', label: 'Mali' },
		{ code: 'MT', label: 'Malta' },
		{ code: 'MH', label: 'Marshall Islands' },
		{ code: 'MQ', label: 'Martinique' },
		{ code: 'MR', label: 'Mauritania' },
		{ code: 'MU', label: 'Mauritius' },
		{ code: 'YT', label: 'Mayotte' },
		{ code: 'MX', label: 'Mexico' },
		{ code: 'FM', label: 'Micronesia (Federated States of)' },
		{ code: 'MD', label: 'Moldova (the Republic of)' },
		{ code: 'MC', label: 'Monaco' },
		{ code: 'MN', label: 'Mongolia' },
		{ code: 'ME', label: 'Montenegro' },
		{ code: 'MS', label: 'Montserrat' },
		{ code: 'MA', label: 'Morocco' },
		{ code: 'MZ', label: 'Mozambique' },
		{ code: 'MM', label: 'Myanmar' },
		{ code: 'NA', label: 'Namibia' },
		{ code: 'NR', label: 'Nauru' },
		{ code: 'NP', label: 'Nepal' },
		{ code: 'NL', label: 'Netherlands' },
		{ code: 'NC', label: 'New Caledonia' },
		{ code: 'NZ', label: 'New Zealand' },
		{ code: 'NI', label: 'Nicaragua' },
		{ code: 'NE', label: 'Niger' },
		{ code: 'NG', label: 'Nigeria' },
		{ code: 'NU', label: 'Niue' },
		{ code: 'NF', label: 'Norfolk Island' },
		{ code: 'MK', label: 'North Macedonia' },
		{ code: 'MP', label: 'Northern Mariana Islands' },
		{ code: 'NO', label: 'Norway' },
		{ code: 'OM', label: 'Oman' },
		{ code: 'PK', label: 'Pakistan' },
		{ code: 'PW', label: 'Palau' },
		{ code: 'PS', label: 'Palestine, State of' },
		{ code: 'PA', label: 'Panama' },
		{ code: 'PG', label: 'Papua New Guinea' },
		{ code: 'PY', label: 'Paraguay' },
		{ code: 'PE', label: 'Peru' },
		{ code: 'PH', label: 'Philippines' },
		{ code: 'PN', label: 'Pitcairn' },
		{ code: 'PL', label: 'Poland' },
		{ code: 'PT', label: 'Portugal' },
		{ code: 'PR', label: 'Puerto Rico' },
		{ code: 'QA', label: 'Qatar' },
		{ code: 'RE', label: 'Réunion' },
		{ code: 'RO', label: 'Romania' },
		{ code: 'RU', label: 'Russian Federation' },
		{ code: 'RW', label: 'Rwanda' },
		{ code: 'BL', label: 'Saint Barthélemy' },
		{ code: 'SH', label: 'Saint Helena, Ascension and Tristan da Cunha' },
		{ code: 'KN', label: 'Saint Kitts and Nevis' },
		{ code: 'LC', label: 'Saint Lucia' },
		{ code: 'MF', label: 'Saint Martin (French part)' },
		{ code: 'PM', label: 'Saint Pierre and Miquelon' },
		{ code: 'VC', label: 'Saint Vincent and the Grenadines' },
		{ code: 'WS', label: 'Samoa' },
		{ code: 'SM', label: 'San Marino' },
		{ code: 'ST', label: 'Sao Tome and Principe' },
		{ code: 'SA', label: 'Saudi Arabia' },
		{ code: 'SN', label: 'Senegal' },
		{ code: 'RS', label: 'Serbia' },
		{ code: 'SC', label: 'Seychelles' },
		{ code: 'SL', label: 'Sierra Leone' },
		{ code: 'SG', label: 'Singapore' },
	]

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
		phoneNumber: '',
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
						<TextField label="Email Address *" name="email" value={billingDetails.email} onChange={handleInputChange} required type="email" className="w-full" />
							<FormControl fullWidth>
								<InputLabel id="phone-country-label">Country</InputLabel>
								<Select
									labelId="phone-country-label"
									id="phone-country-select"
									value={billingDetails.country}
									label="Country"
									onChange={(e) => setBillingDetails({ ...billingDetails, country: e.target.value })}
								>
									{countries.map((country) => (
										<MenuItem key={country.code} value={country.code}>
											{country.label}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<TextField
								label="Phone Number"
								name="phoneNumber"
								value={billingDetails.phoneNumber}
								onChange={(e) => setBillingDetails({ ...billingDetails, phoneNumber: e.target.value })}
								required
								className="w-full"
							/>
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
