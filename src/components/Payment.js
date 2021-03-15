import React from 'react';
import './Payment.css';
import {useStateValue} from './StateProvider';
import CheckoutProduct from './CheckoutProduct.js';
import {Link} from 'react-router-dom';

function Payment() {

    const [{user,cart}, dispatch] = useStateValue();

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
                <div className="payment_details"></div>
            </div>
          </div>
        </div>
    )
}

export default Payment;
