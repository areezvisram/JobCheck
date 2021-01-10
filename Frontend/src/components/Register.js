import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./styles/Register.css";
import logo from '../images/logo.png'

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const history = useHistory();
    const [errorShow, setErrorShow] = useState('none')
  
    function validateForm() {
      return (email.length > 0 && password.length > 0) && (confirmEmail === email) && (confirmPassword === password);
    }
  
    function handleSubmit(e) {
      e.preventDefault();

      if(!validateForm) {
        console.log("incorrect registration");
        alert("Incorrect registration");
        e.preventDefault();
      }


      var data ={
          "username": email,
          "password": password
      }
      var obj = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
  
      fetch("http://127.0.0.1:5000/api/users", obj)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          history.push({
            pathname: "/login",
          });
        })
        .catch((data) => {
          setErrorShow("block");
          setPassword("");
        });
    }
  
    return (
      <div className="background">
        <div id="form_wrapper">
        <div id="form_left">
          <img src={logo} alt="computer icon" />
        </div>
        <form id="form_right" onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className="input_container">
            <i className="fas fa-envelope"></i>
            <input type="email" placeholder="Email" value = {email} onChange={(e) => setEmail(e.target.value)} name="Email" id="field_email" className="input_field"/>          
          </div>
          <div className="input_container">
            <i className="fas fa-envelope"></i>
            <input type="email" placeholder="Confirm Email" value = {confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} name="Email" id="field_email" className="input_field"/>          
          </div>        
          <div className="input_container">
            <i className="fas fa-lock"></i>
            <input placeholder="Password" type="password" name="Password" id="field_password" className="input_field" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="input_container">
            <i className="fas fa-lock"></i>
            <input placeholder="Confirm Password" type="password" name="Password" id="field_password" className="input_field" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          </div>        
          <button type="submit" value="Login" id="input_submit" className="input_field" disabled={!validateForm()}>Register</button>
          <span className="incorrect-form" style={{display: `${errorShow}`}}>Registration Failed. Please Try Again</span>
          <span id="create_account">
            <a href="\login">Already have an account? Login now ➡ </a>
          </span>
        </form>
      </div>
    </div>
      // <div className="Register">
      //disabled={!validateForm()}
      //   <form onSubmit={handleSubmit}>
      //     <FormGroup controlId="email" size="large">
      //       <FormLabel>Email</FormLabel>
      //       <FormControl
      //         autoFocus
      //         value={email}
      //         onChange={(e) => setEmail(e.target.value)}
      //       />
      //     </FormGroup>
      //     <FormGroup controlId="password" bsSize="large">
      //       <FormLabel>Password</FormLabel>
      //       <FormControl
      //         type="password"
      //         value={password}
      //         onChange={(e) => setPassword(e.target.value)}
      //       />
      //     </FormGroup>
      //     <Button
      //       variant="primary"
      //       size="lg"
      //       disabled={!validateForm()}
      //       type="submit"
      //     >
      //       Register
      //     </Button>
      //   </form>
      // </div>
    );
}

export default Register;