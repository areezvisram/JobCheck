import React, { useState } from 'react';
import '../styles/ResetPassword.css'

function ResetPasswordForm() {
    const [email, setEmail] = useState("");
    const [errorShow, setErrorShow] = useState("none");
    const [correctShow, setCorrectShow] = useState("none");

    function handleSubmit(e) {
        e.preventDefault();        
        var data = {
            "username": email,
        }

        setErrorShow("none");
        setCorrectShow("none");

        var obj = {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        fetch("https://job-check.herokuapp.com/api/sendEmail", obj)
        .then((response) => response.json())
        .then((data) => {
          if(data['status'] === 1) {
            setCorrectShow("block");
          } else if(data['status'] === 0) {
            setErrorShow("block");  
          }
        })
        .catch((data) => {
            setErrorShow("block");
        });
    }

    function validateForm() {
        return email.length > 0;
    }

    return (
        <div className="background">
            <h1 className="overview-title-reset">Reset Password Request</h1>
            <form onSubmit={handleSubmit} className="add-form">
                <label>Email: </label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input><br></br>
                <button type="submit" disabled={!validateForm()} className="submit-button-form">Submit</button>        
            </form>
            <span className="incorrect-form-reset" style={{display: `${errorShow}`}}>Email does not exist. Please enter a valid email.</span>
            <span className="correct-form" style={{display: `${correctShow}`}}>Password reset email sent.</span>
        </div>
    )
}

export default ResetPasswordForm;