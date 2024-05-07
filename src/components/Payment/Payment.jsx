import React, { useState } from 'react';
import Card from 'react-credit-cards-2';
import './Payment.module.css'
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from './utils';


const Payment = () => {
  const [paymentData, setPaymentData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
  });

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setPaymentData((prevState) => ({
        ...prevState,
        issuer
      }));
    }
  };

  const handleInputFocus = ({ target }) => {
    setPaymentData((prevState) => ({
      ...prevState,
      focused: target.name
    }));
  };

  const handleInputChange = ({ target }) => {
    let { name, value } = target;

    if (name === 'number') {
      value = formatCreditCardNumber(value);
    } else if (name === 'expiry') {
      value = formatExpirationDate(value);
    } else if (name === 'cvc') {
      value = formatCVC(value);
    }

    setPaymentData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('You have finished payment!');
    setPaymentData({
      number: '',
      name: '',
      expiry: '',
      cvc: '',
      issuer: '',
      focused: ''
    });
  };

  const { name, number, expiry, cvc, focused, issuer } = paymentData;

  return (
    <div key='Payment'>
      <div className='App-payment'>
        <h1>Enter your payment details</h1>
        <h4>please input your information below</h4>
        <Card
          number={number}
          name={name}
          expiry={expiry}
          cvc={cvc}
          focused={focused}
          callback={handleCallback}
        />
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <small>Name on card:</small>
            <input
              type='text'
              name='name'
              className='form-control'
              placeholder='Name'
              pattern='[a-z A-Z-]+'
              required
              value={name}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className='form-group'>
            <small>Card Number:</small>
            <input
              type='tel'
              name='number'
              className='form-control'
              placeholder='Card Number'
              pattern='[\d| ]{16,22}'
              maxLength='19'
              required
              value={number}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className='form-group'>
            <small>Expiration Date:</small>
            <input
              type='tel'
              name='expiry'
              className='form-control'
              placeholder='Valid Thru'
              pattern='\d\d/\d\d'
              required
              value={expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className='form-group'>
            <small>CVC:</small>
            <input
              type='tel'
              name='cvc'
              className='form-control'
              placeholder='CVC'
              pattern='\d{3}'
              required
              value={cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <input type='hidden' name='issuer' value={issuer} />
          <div className='form-actions'>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { Payment };
