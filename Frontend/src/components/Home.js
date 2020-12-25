import React from 'react'
import './styles/Home.css'
import background from '../images/bottom.png'
import logo from '../images/logo.png'

function Home() {
    return (
        <div className="home-page">
            <img src={background} alt="background" className="bottom"></img>
            <img src={logo} alt="logo" className="logo"></img>
            <div className="button-wrapper">
                <h1 className="title">Testing the git commit</h1>
                <p className="text">Employment hunting is a long process. Whether you’re searching for an internship or your next full time opportunity, JobCheck helps keep your organized through the whole journey.</p>
                <button className="button">GET STARTED</button>
            </div>
            
        </div>
        
    )
}

export default Home;