import React, {useState, useEffect} from 'react';
import './Payment.css';
import {useStateValue} from './StateProvider';
import CheckoutProduct from './CheckoutProduct.js';
import {Link} from 'react-router-dom';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import {getCartTotal} from './reducer.js'
// import axios from './axios.js';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {db} from '../firebase.js';

function Payment() {

    const [{user,cart}, dispatch] = useStateValue();
    
    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();

    //state
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const [clientSecret, setClientSecret] = useState('null');

    useEffect(()=>{
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post', 
                url: `http://localhost:5001/clone-2fd96/us-central1/api/payments/create?total=${getCartTotal(cart)*100}`
        })
        setClientSecret(response.data.clientSecret);
    }
    getClientSecret();
    } 
    ,[cart]);

    console.log('client secret is', clientSecret);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=> {

            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                cart: cart,
                amount: paymentIntent.amount,
                created: paymentIntent.created,
            })


            setProcessing(false);
            setError(null);
            setSucceeded(true);

            dispatch({
                type: 'EMPTY_CART'
            })

            history.replace('/orders');
        })

    }

    const handleChange = e => {
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
                            <button disabled={processing || disabled || succeeded || !clientSecret}>
                                <span>
                                    {processing ? "Processing" : "Buy Now"}
                                </span>
                            </button>
                        </div>
                        
                       {/*fail safe for errors */}
                        {error && <div>{error}</div>}
                    </form>

                </div>
            </div>
          </div>
        </div>
    )
}

export default Payment;
