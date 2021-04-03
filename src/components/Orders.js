import React, {useState, useEffect} from 'react';
import './Orders.css';
import {db} from '../firebase.js';
import {useStateValue} from './StateProvider.js';
import Order from './Order.js';
import {useHistory} from 'react-router-dom';

function Orders() {

    const history = useHistory();
    const [orders,setOrders] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(()=> {
        if(user) {
            db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot(snapshot => (
            setOrders(snapshot.docs.map(doc => ({
                id: doc.id, data: doc.data()
            })))
        ))
        } else {
            history.push('/Login')
        }
        
    }, [])
    return (
        <div className="orders">
            <h1>Orders</h1>

            <div className="orders_order">
                {orders?.map((order, i) => (
                    <>
                        <h2> Order#{[i+1]}</h2>
                        <Order order={order}/>
                    </>
                ))}
            </div>
            
        </div>
    )
}

export default Orders;
