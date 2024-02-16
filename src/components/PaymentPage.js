import React from 'react'
import '../css/Payment.css'
import {  useNavigate } from 'react-router-dom';
import CurrencyInput from 'react-currency-input-field';

function PaymentPage() {
    const navigate = useNavigate();
    function goHome(){
        navigate('/');
    }
  return (
    <>
        <div className='payment_container'>
            
            <div className='payment-box'>
                <h1>JETTRADE FX</h1>
                <h4>Payment Details</h4>
                <div className='input-box container'>
                    <CurrencyInput value={3500} intlConfig={{ locale: 'en-IN', currency: 'INR' }} />
                </div>

                <div className='payment-button'>
                    <button className='btn btn-primary btn-sm btn-block'>Pay Now1</button>
                </div>
                <div className='payment-button'>
                    <button className='btn btn-secondary btn-sm btn-block' onClick={goHome}>Cancel</button>
                </div>
                <div className='note-para'>
                    <p> <strong><mark>NOTE:-</mark></strong> After successfull payment you will be a member of <strong>JETTRADE FX</strong></p>
                </div>
                
                
            </div>
        </div>
    </>
  )
}

export default PaymentPage