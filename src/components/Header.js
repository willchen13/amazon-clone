import React from 'react';
import './Header.css';
import amazonLogo from "../images/amazonLogo.jpg";
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Link} from 'react-router-dom';
import {useStateValue} from './StateProvider.js';
import {auth} from '../firebase.js';

function Header() {

    const [{cart, user}, dispatch] = useStateValue();

    const handleAuthentication = () => {
        if(user){
            auth.signOut();
        }
    }

    return (
        <div className="header">
            <Link to="/">
                <img className="header_logo" alt="amazonLogo" src={amazonLogo}/>
            </Link>

            <div className="header_search">
                <input type="text" className="header_searchInput"/>
                <SearchIcon className="header_searchIcon"></SearchIcon>
            </div>

            <div className="header_nav">
                <Link to={!user && "/login"} onClick={handleAuthentication}>
                    <div className="header_option">
                        <span className="header_optionLineOne">Hello {user?.email ? user.email : 'Guest'} </span>
                        <span className="header_optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
                    </div>
                </Link>

                <Link to={"/orders"}>
                    <div className="header_option">
                        <span className="header_optionLineOne">Returns</span>
                        <span className="header_optionLineTwo">& Orders</span>
                    </div>
                </Link>

                <div className="header_option">
                    <span className="header_optionLineOne">Your</span>
                    <span className="header_optionLineTwo">Prime</span>
                </div>

                {cart.length > 0 && <div className="header_optionCart">
                    <Link to="/checkout">
                        <ShoppingCartIcon/>
                    </Link>
                    <span className="header_optionLineTwo header_cartCount">{cart?.length}</span>
                </div>}
            </div>
        </div>
    )
}

export default Header;

