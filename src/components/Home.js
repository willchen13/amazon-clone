import React, {useEffect, useState} from 'react';
import './Home.css';
import Product from './Product.js';
import { v4 as uuidv4 } from 'uuid';
import {db} from '../firebase.js';

function Home() {


    const [products, setProducts] = useState([]);

    useEffect(()=> {
        db.collection('products')
        .orderBy('priority', 'asc')
        .onSnapshot(snapshot => {
            setProducts(snapshot.docs.map(doc => ({
                id: doc.id,
                title: doc.data().title,
                price: doc.data().price,
                rating: doc.data().rating,
                image: doc.data().image,
            })))
        })
    }, [])


    return (
        products.length !== 0 && <div className="home">
            <div className="home_container">
                <img className="home_image" src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" alt="banner"/>
                <div className="home_row">
                    <Product
                        id={products[0].id}
                        title={products[0].title}
                        price={products[0].price}
                        rating={products[0].rating}
                        image={products[0].image}
                    />
                
                    <Product
                        id={products[1].id}
                        title={products[1].title}
                        price={products[1].price}
                        rating={products[1].rating}
                        image={products[1].image}
                    />
                </div>

                <div className="home_row">
                    <Product
                        id={products[2].id}
                        title={products[2].title}
                        price={products[2].price}
                        rating={products[2].rating}
                        image={products[2].image}
                    />
                    <Product
                        id={products[3].id}
                        title={products[3].title}
                        price={products[3].price}
                        rating={products[3].rating}
                        image={products[3].image}
                    />
                    <Product
                        id={products[4].id}
                        title={products[4].title}
                        price={products[4].price}
                        rating={products[4].rating}
                        image={products[4].image}
                    />
                </div>

                <div className="home_row">
                    <Product
                        id={products[5].id}
                        title={products[5].title}
                        price={products[5].price}
                        rating={products[5].rating}
                        image={products[5].image}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home;
