import React from 'react';
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';
import CheckoutProduct from './CheckoutProduct.js';
import {useStateValue} from './StateProvider.js';

function Order({order}) {
    
    const [{cart}, dispatch] = useStateValue();

    console.log('order data is', order.data);

    return (
        <div className="order">
            <h2> Order </h2>
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

                />
            )}
            <CurrencyFormat
                renderText={ (value)=> (
                    <p> Items ordered: ({cart.length}): <strong> {value} </strong> </p>
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
