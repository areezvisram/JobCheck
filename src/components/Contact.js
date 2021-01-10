import React, { useState } from 'react';
import ContactNavbar from './overview/ContactNavbar'
import ContactBurger from './burgers/ContactBurger'

function Contact() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("")
    const [errorShow, setErrorShow] = useState("none");
    const [correctShow, setCorrectShow] = useState("none"); 

    function handleSubmit(e) {
        e.preventDefault();    
        setErrorShow("none");
        setCorrectShow("none");

        var data = {
            "name": name,
            "email": email,
            "message": message
        }

        var obj = {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        fetch("https://job-check.herokuapp.com/api/contact", obj)
        .then((response) => response.json())
        .then((data) => {
            if(data["status"] === 1) {
                setCorrectShow("block");
            } else if(data["status"] === 0) {
                setErrorShow("block");
            }
        })
        .catch((data) => {            
            setErrorShow("block");
        });
    }

    function validateForm() {
        return email.length > 0 && name.length > 0 && message.length > 0;
    }

    return (
        <div className="background">
            <ContactBurger />
            <h1 className="overview-title" style={{marginTop: "15px"}}>Contact Me!</h1>            
            <ContactNavbar />
            <span style={{fontSize: "1.7em", marginTop: "50px"}}>If you've found some bugs with JobCheck, want to request new features, or just want to leave some feedback, fill in the contact form below!</span>
            <form onSubmit={handleSubmit} className="add-form">
                <label>Name: </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input><br></br>
                <label>Email: </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input><br></br>
                <label>Message: </label>
                <textarea type="text" value={message} onChange={(e) => setMessage(e.target.value)} style={{height:"200px", whiteSpace:"normal", resize: "none", marginTop:"15px"}}></textarea><br></br>
                <button type="submit" disabled={!validateForm()} className="submit-button-form">Submit</button>       
                <span className="incorrect-form-reset" style={{display: `${errorShow}`, fontSize: "1.2em", textAlign: "left" }}>An error occurred while trying to contact. Please try again.</span>
                <span className="correct-form" style={{display: `${correctShow}`, fontSize: "1.2em", textAlign: "left"}}>Message sent! Thank you for the feedback.</span><br></br>                
            </form>
            <span style={{fontSize: "2.5em", marginTop: "50px", textAlign: "left", marginLeft: "100px"}}>Current updates in development:</span>
            <ul style={{marginLeft: "7%", fontSize: "1.7em"}}>
                <li>Ability to update other job properties, not just status</li>
                <li>Email and/or text notifications of application deadlines</li>
                <li>Chrome extension to allow users to add job to JobCheck straight from the posting</li>
            </ul>
        </div>
    )
}

export default Contact;