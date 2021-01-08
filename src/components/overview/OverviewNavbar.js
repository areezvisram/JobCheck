import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/OverviewComponents.css'

function OverviewNavbar() {
    return (
        <div className="overview-navbar">
            <Link to="/" className="link">Log Out</Link>            
            <Link to="/register" className="link">Contact</Link>
        </div>
    )
}

export default OverviewNavbar;

