import React from 'react';
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';
import CheckoutProduct from './CheckoutProduct.js';
import {useStateValue} from './StateProvider.js';
import './Order.css';

function Order({order}) {
    
    const [{cart}, dispatch] = useStateValue();

    console.log('order data is', order.data);

    return (
        <div className="order">
            <p>{moment.unix(order.data.created).format('LLL')}</p>
            <p className="order_id">
                <small> {order.id} </small>
            </p>
            {order.data.cart.map(item => 
                <CheckoutProduct
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    title={item.title}
                    price={item.price}
                    rating={item.rating}
                    hideButton={true}

                />
            )}
            <CurrencyFormat
                renderText={ (value)=> (
                    <h3 className="order_total"> Order Total: ({cart.length}): <strong> {value} </strong> </h3>
                ) } 
                decimalScale={2}
                value={(order.data.amount)/100}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
        </div>
    )
}

export default Order;
