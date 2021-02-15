import React from 'react';
import './Header.css';
import amazonLogo from "./images/amazonLogo.jpg";
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

function Header() {
    return (
        <div className="header">
            <img className="header_logo" alt="amazonLogo" src={amazonLogo}/>

            <div className="header_search">
                <input type="text" className="header_searchInput"/>
                <SearchIcon className="header_searchIcon"></SearchIcon>
            </div>

            <div className="header_nav">
                <div className="header_option">
                    <span className="header_optionLineOne">Hello Guest</span>
                    <span className="header_optionLineTwo">Sign In</span>
                </div>

                <div className="header_option">
                    <span className="header_optionLineOne">Returns</span>
                    <span className="header_optionLineTwo">& Orders</span>
                </div>

                <div className="header_option">
                    <span className="header_optionLineOne">Your</span>
                    <span className="header_optionLineTwo">Prime</span>
                </div>

                <div className="header_optionCart">
                    <ShoppingCartIcon/>
                    <span className="header_optionLineTwo header_cartCount">0</span>
                </div>
            </div>
        </div>
    )
}

export default Header;

