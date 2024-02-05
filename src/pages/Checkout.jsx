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
import { useTranslation } from "react-i18next";
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
	const [customerDetails, setCustomerDetails] = useState({
  name: '',
  email: '',
  mobile: ''
});

const handleCustomerDetailsChange = (event) => {
  const { name, value } = event.target;
  setCustomerDetails({
    ...customerDetails,
    [name]: value
  });
};
const { t } = useTranslation();
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
 // Add states
    const [myFatoorahInitialized, setMyFatoorahInitialized] = useState(false);
    const [paymentSubmitted, setPaymentSubmitted] = useState(false);
  // State for selected payment method
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('applePay');

    // Function to handle change in payment method selection
    const handlePaymentMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
    };
    // Function to dynamically load the MyFatoorah script
    const loadMyFatoorahScript = (src, callback) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.onload = callback;
        document.head.appendChild(script);
    };

    // Function to initiate MyFatoorah
    const initMyFatoorah = () => {
        if (window.myFatoorah) {
            var config = {
                countryCode: "SAU",
                sessionId: sessionDetails.sessionId,
                cardViewId: "card-element",
            };
            window.myFatoorah.init(config);
		
            setMyFatoorahInitialized(true);
        }
		console.log(myFatoorahInitialized)
    };

    // Function to call MyFatoorah InitiateSession API
   const initiateSession = async () => {
  setIsSessionLoading(true);
  try {
    const response = await axios.post('http://localhost:3001/api/initiateSession');
    
    setSessionDetails({
      countryCode: 'SAU', // Assuming SA for Saudi Arabia
      sessionId: response.data.Data.SessionId,
    });
    setIsSessionLoading(false);
  } catch (error) {
    console.error('Error fetching session from server:', error);
    setSessionError('Failed to initiate session.');
    setIsSessionLoading(false);
  }
};

    useEffect(() => {
			console.log(sessionDetails)
        initiateSession();
    }, []);

    useEffect(() => {
	
        if (sessionDetails.sessionId && !myFatoorahInitialized) {
            loadMyFatoorahScript(
                "https://sa.myfatoorah.com/cardview/v2/session.js",
                initMyFatoorah
            );
        }
    }, [sessionDetails.sessionId]);
const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBillingDetails({
            ...billingDetails,
            [name]: value,
        });
    };

    // Handle form submission
    const handlePayment = async (e) => {
        e.preventDefault();
        if (window.myFatoorah && !paymentSubmitted) {
            setPaymentSubmitted(true);
            window.myFatoorah.submit().then(
                function (response) {
                    // Handle the response from MyFatoorah
                    console.log('Payment successful', response);
                    // You might want to send the response to your server
                },
                function (error) {
                    // Handle errors
                    console.log('Payment failed', error);
                    setPaymentSubmitted(false);
                }
            );
        }
		  const paymentData = {
    paymentMethod: selectedPaymentMethod,
    amount: 199.99, // example amount
    currency: 'SAR', // example currency
    customerDetails
  };
 try {
    // Make API call to process payment
    const response = await axios.post('http://localhost:3001/process-payment', paymentData);
	console.log(response)
    // Handle response...
  } catch (error) {
    // Handle error...
  }

 
    };

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
		<div className="container mx-auto my-[200px] bg-white shadow-md rounded px-8 py-8 ">
				<form onSubmit={handlePayment} className="flex flex-col gap-6">
				<h2 className="text-2xl font-semibold mb-5">{t("checkout.title")}</h2>

				{/* Billing & Shipping Section */}
				<div>
					<h3 className="font-bold mb-2 text-lg" >{t("checkout.billing")}</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
						<TextField label="First Name *" name="firstName"  onChange={handleInputChange} required className="w-full" />
						<TextField label="Last Name *" name="lastName"  onChange={handleInputChange} required className="w-full" />
						<TextField label="Email Address *" name="email" onChange={handleInputChange} required type="email" className="w-full" />
							
							<TextField
								label="Phone Number"
								name="phoneNumber"
								
							   onChange={handleCustomerDetailsChange}
								required
								className="w-full"
							/>
					</div>
					<Divider />
				</div>

				{/* Additional Information Section */}
				<div>
					<h3 className="font-bold mb-2 text-lg">{t("checkout.additional")}</h3>
					<TextField
						label="Order Notes (optional)"
						name="additionalInfo"
	
				   onChange={handleCustomerDetailsChange}
						multiline
						rows={4}
						className="w-full mb-4"
					/>
					<Divider />
				</div>

				{/* Your Order Section */}
				<div>
					<h3 className="font-bold mb-2 text-lg">{t("checkout.order")}</h3>
					<div className="mb-4">
						{/* Map through your order items here */}
						<div className="flex justify-between py-2">
							<span>{t("checkout.product")}</span>
							<span>$19.99</span>
						</div>
						{/* Add more products and total cost */}
						<div className="flex justify-between py-2 font-bold">
							<span>{t("checkout.productTotal")}</span>
							<span>$199.99</span>
						</div>
					</div>
					<Divider />
				</div>


				{/* Payment Section - Assuming PaymentForm includes all necessary payment fields */}
				{/* <PaymentForm /> */}

				{/* Terms and Conditions */}
					
					
					
					<div id="card-element"></div>
			<FormControlLabel
						control={<Checkbox name="agreeToTerms" />}
						label={t("checkout.rules")}
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
						label={t("checkout.scheduled")}
						className="self-start"
					/>
						<StaticDateTimePicker
							orientation="landscape"
							value={schedule}
							onChange={(newValue) => setSchedule(newValue)}
							minDateTime={TOMORROW}
							maxDateTime={MAX_SCHEDULE_DATE}
							disabled={!isScheduled}
							className={`${isScheduled ? "" : "opacity-50 pointer-events-none"}`}
						/>
			


				{/* Submit Button */}
				<Button
					type="submit"
					variant="contained"
					color="primary"
					disabled={isLoading}
					value={'submit'}
					className="w-full py-[20px] h-[50px	] text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
				>
						{isSessionLoading && <CircularProgress />}
						<span>{t("checkout.submit")}</span>
			
				</Button>

				{/* Error Message */}
				{error && <div className="text-red-500 text-lg mt-2">{error}</div>}
			
			</form>
		</div>
			</LocalizationProvider>
	);
};

export default Checkout;
