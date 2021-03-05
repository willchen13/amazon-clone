import React from 'react';
import './CheckoutProduct.css';
import {useStateValue} from './StateProvider.js'


function CheckoutProduct({id,image,title,price,rating}) {

    const [{cart},dispatch] = useStateValue();

    const removeFromCart = () => {
        dispatch({
            type: "REMOVE_FROM_CART",
            id: id,
        })
    }

    return (
        <div className="checkoutProduct">
            <img src={image} alt="" className="checkoutProduct_image"/>
            <div className="checkoutProduct_info">
                <p className="checkoutProduct_title"> {title} </p>
                <p className="checkoutProduct_price">
                    <small> $ </small> 
                    <strong> {price} </strong>
                 </p>
                <d className="checkoutProduct_rating">
                    {Array(rating).fill().map((_,i)=>
                        <p key={i}> ⭐️ </p>
                    )}
                </d>

                <button onClick={removeFromCart}> Remove from Cart </button>


            </div>
        </div>
    )
}

export default CheckoutProduct;
