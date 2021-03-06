import React, { useState } from 'react';
import '../styles/OverviewComponents.css'

function PasswordForm({ clickHandler, submitClickHandler }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorShow, setErrorShow] = useState('none');
    
    function validateForm() {
        return email.length > 0 && password.length > 0;
      }
    
      function handleSubmit(e) {
        console.log("tried to log in");
        e.preventDefault();
        var login = email + ":" + password;
        var obj = {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Basic " + Buffer.from(login).toString("base64"),
          },
        };
    
        fetch("https://job-check.herokuapp.com/api/token", obj)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            const response = data;
            if (response["status"] === "OK") {
                clickHandler();
                submitClickHandler();
                
            }
          })
          .catch((data) => {
            setErrorShow("block");
            setPassword("");
          });
      }

    return (
        <form id="form_right" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="input_container_modal">
                <i className="fas fa-envelope"></i>
                <input placeholder="Email" value = {email} onChange={(e) => setEmail(e.target.value)} name="Email" id="field_email" className="input_field"/>
            </div>
            <div className="input_container_modal">
                <i className="fas fa-lock"></i>
                <input placeholder="Password" type="password" name="Password" id="field_password" className="input_field" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit" value="Login" className="submit-button-modal" disabled={!validateForm()}>Login</button>
            <span className="incorrect-form" style={{display: `${errorShow}`}}>Login Failed. Please Try Again</span>
        </form>
    )
}

export default PasswordForm;