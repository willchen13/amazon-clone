import React from 'react';
import './Header.css';
import amazonLogo from "./images/amazonLogo.jpg";

function Header() {
    return (
        <div className="header">
            <img className="header_logo" alt="amazonLogo" src={amazonLogo}/>

            <div className="header_search">
                <input type="text" className="header_searchInput"/>
                <img src="" alt="" className="header_searchLogo"/>
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
            </div>
        </div>
    )
}

export default Header;

