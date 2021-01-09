import React from 'react'
import { useHistory } from 'react-router-dom'
import './styles/Home.css'
import background from '../images/bottom.png'
import logo from '../images/logo.png'
import Navbar from './Navbar'
import Burger from './Burger'

function Home() {

    const history = useHistory();

    function navigateToLogin() {
        history.push({
            pathname: "/login"
        });
    }

    return (
        <div className="home-page">
            <Navbar />
            <Burger />
            <img src={background} alt="background" className="bottom"></img>
            <img src={logo} alt="logo" className="logo"></img>
            <div className="button-wrapper">
                <h1 className="title">Job Tracking Made Easy</h1>
                <p className="text">Employment hunting is a long process. Whether you’re searching for an internship or your next full time opportunity, JobCheck helps keep you organized through the whole journey.</p>
                <button className="button" onClick={navigateToLogin}>GET STARTED</button>
            </div>
            
        </div>
        
    )
}

export default Home;