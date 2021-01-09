import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import './styles/Burger.css'

function Burger() {

    const [menuOpen, setMenuOpen] = useState(false);

    const handleStateChange = state => {
        setMenuOpen(state.isOpen)
    }

    const closeMenu = () => {
        setMenuOpen(false);
    }

    return (
        <div className="burger-menu">
            <Menu right isOpen={menuOpen} onStateChange={state => handleStateChange(state)} >
                <Link to="/"><span onClick={() => {closeMenu()}}>Home</span></Link>
                <Link to="/login"><span onClick={() => {closeMenu()}}>Login</span></Link>
                <Link to="/register"><span onClick={() => {closeMenu()}}>Register</span></Link>
                <Link to="/contact"><span onClick={() => {closeMenu()}}>Contact</span></Link>
            </Menu>
        </div>
    )
}

export default Burger;