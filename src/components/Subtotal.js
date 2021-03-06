import React from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import {useStateValue} from './StateProvider.js';
import {getCartTotal} from './reducer.js';
import {useHistory} from 'react-router-dom';

function Subtotal() {

    const [{cart, user}, dispatch] = useStateValue();
    const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();
        if(user){
            history.push('/payment')
        } else {
            history.push('/login')
        }
    }

    return (
        <div className='subtotal'>
            <CurrencyFormat
                renderText={ (value)=> (
                    <>
                        <p> Subtotal ({cart.length} items): <strong> {value} </strong> </p>
                        <small className="subtotal_gift"> <input type="checkbox"/> This order contains a gift</small>
                    </>
                ) } 
                decimalScale={2}
                value={getCartTotal(cart)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            
            {cart.length > 0 ? <button onClick={handleSubmit}> Proceed to Checkout </button> :
                    <button onClick={()=> (history.push('/home'))}> Return to home page </button>
            }
            
        </div>
    )
}

export default Subtotal;
