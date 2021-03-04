import React from 'react';
import './Checkout.css';
import Subtotal from './Subtotal.js';
import CheckoutProduct from './CheckoutProduct.js';
import {useStateValue} from './StateProvider.js';

function Checkout() {

    const [{cart}, dispatch] = useStateValue();

    console.log('this is the cart in checkout', cart);

    return (
        <div className="checkout">
            <div className="checkout_left">
                <img className="checkout_ad" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt=""/>
                <div>
                    <h2 className="checkout_title"> Your Shopping Cart </h2>
                    {cart.map(item => 
                        <CheckoutProduct
                            id={item.id}
                            image={item.image}
                            title={item.title}
                            price={item.price}
                            rating={item.rating}

                        />
                    )}
                </div>
                
            </div>

            <div className="checkout_right">
                <Subtotal/>
            </div>
        </div>
    )
}

export default Checkout;
