import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import '../styles/Burger.css'

function OverviewBurger() {

    const [menuOpen, setMenuOpen] = useState(false);

    const handleStateChange = state => {
        setMenuOpen(state.isOpen)
    }

    const closeMenu = () => {
        setMenuOpen(false);
    }

    const styles = {
        bmMenu: {
            background: "linear-gradient(to right, #1c9954, #155294)",
            boxSizing: "border-box"
        }
    }

    return (
        <div className="contact-burger-menu">
            <Menu right isOpen={menuOpen} onStateChange={state => handleStateChange(state)} styles={ styles } >
                <Link to="/"><span onClick={() => {closeMenu()}}>Log Out</span></Link>
                <Link to="/contact"><span onClick={() => {closeMenu()}}>Contact</span></Link>
            </Menu>
        </div>
    )
}

export default OverviewBurger;