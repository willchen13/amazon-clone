import React, {useState} from 'react';
import './Payment.css';
import {useStateValue} from './StateProvider';
import CheckoutProduct from './CheckoutProduct.js';
import {Link} from 'react-router-dom';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import {getCartTotal} from './reducer.js'

function Payment() {

    const [{user,cart}, dispatch] = useStateValue();
    
    const stripe = useStripe();
    const elements = useElements();

    //state
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [succeeded, setSucceeded] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
    }

    const handleChange = e => {
        e.preventDefault();
        setDisabled(e.empty);
        setError(e.error ? e.error.message : '');
    }


    return (
        <div className="payment">
          <div className="payment_container">

            <h1> Checkout (<Link to="/checkout">{cart?.length}</Link>)</h1>
            <div className="payment_section">
                <div className="payment_title"> <h3>Delivery Address</h3></div>
                <div className="payment_address"> 
                    <p> {user?.email} </p>
                    <p> 123 React Lane </p> 
                    <p> San Francisco, CA </p>
                </div>
            </div>
            <div className="payment_section">
                <div className="payment_title"> <h3>Review items and delivery</h3> </div>
                <div className="payment_items">
                    {cart.map(item => (
                        <CheckoutProduct
                            key={item.id}
                            id={item.id}
                            image={item.image}
                            title={item.title}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}
                </div>
            </div>
            <div className="payment_section">
                <div className="payment_title"> <h3>Payment Information</h3> </div>
                <div className="payment_details">
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>
                        <div className="payment_priceContainer">
                            <CurrencyFormat
                            renderText={ (value)=> (
                                    <h3> Order Total : {value} </h3>
                            ) } 
                            decimalScale={2}
                            value={getCartTotal(cart)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                            />
                            <button disabled={processing || disabled || succeeded}>
                                <span>
                                    {processing ? "Processing" : "Buy Now"}
                                </span>
                            </button>
                        </div>
                    </form>

                </div>
            </div>
          </div>
        </div>
    )
}

export default Payment;
