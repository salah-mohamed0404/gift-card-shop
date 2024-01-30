import React, { useState } from 'react';
import { Button, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import axios from 'axios';

const PaymentOptions = ({ onPaymentSuccess, onPaymentFailure }) => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('applePay');

    const handlePaymentMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
    };

  

    return (
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
    );
};

export default PaymentOptions;
