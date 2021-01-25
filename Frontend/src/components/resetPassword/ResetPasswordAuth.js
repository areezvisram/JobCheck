import { parse } from 'query-string';
import React, { useState } from 'react';
import '../styles/ResetPassword.css'

function ResetPasswordAuth() {

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorShow, setErrorShow] = useState("none");
    const [correctShow, setCorrectShow] = useState("none");

    function parseQueryParams(e) {
        const query = window.location.search.substring(1);        
        const token = query.split("=")[1];

        setErrorShow("none");
        setCorrectShow("none");
        
        e.preventDefault();        
        var data = {
            "password": password,
            "token": token
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

        fetch("https://job-check.herokuapp.com/api/resetPassword", obj)
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
        return password.length > 0 && (password === confirmPassword);
    }

    return (
        <div className="background">
            <h1 className="overview-title-reset">Reset Your Password Here</h1>
            {/* <button className="button" onClick={parseQueryParams}>Click me</button> */}
            <form onSubmit={parseQueryParams} className="add-form">
                <label>Password: </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input><br></br>
                <label>Confirm Password: </label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input><br></br>
                <button type="submit" disabled={!validateForm()} className="submit-button-form">Submit</button>
                <span className="incorrect-form-reset-pass" style={{display: `${errorShow}`}}>Password Reset Unsuccessful. Please try again.</span>
                <span className="correct-form-pass" style={{display: `${correctShow}`}}>Password Successfully Reset.</span>
            </form>
        </div>
    )
}

export default ResetPasswordAuth;