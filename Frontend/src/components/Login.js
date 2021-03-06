import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./styles/Login.css";
import logo from '../images/logo.png'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [loggedIn, setLoginStatus] = useState(false);
  const history = useHistory();
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
          history.push({
            pathname: "/overview",
            state: { token: response["token"], loggedIn: true, comingFrom: "login", login:login },
          });
        }
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
        <h1>Login</h1>
        <div className="input_container">
          <i className="fas fa-envelope"></i>
          <input placeholder="Email" value = {email} onChange={(e) => setEmail(e.target.value)} name="Email" id="field_email" className="input_field" type="email"/>
        </div>
        <div className="input_container">
          <i className="fas fa-lock"></i>
          <input placeholder="Password" type="password" name="Password" id="field_password" className="input_field" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type="submit" value="Login" id="input_submit" className="input_field" disabled={!validateForm()}>Login</button>
        <span className="incorrect-form" style={{display: `${errorShow}`}}>Login Failed. Please Try Again</span>
        <span>Forgot <a href="/reset-password-form"> Username / Password ?</a></span>
        <span id="create_account">
          <a href="\register">Don't have an account? Register Now ➡ </a>
        </span>
      </form>
    </div>
   </div>
    // <div classNameName="Login">
    //   <form onSubmit={handleSubmit}>
    //     <FormGroup controlId="email" size="large">
    //       <FormLabel>Email</FormLabel>
    //       <FormControl
    //         autoFocus
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //     </FormGroup>
    //     <FormGroup controlId="password">
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
    //       Login
    //     </Button>
    //   </form>
    // </div>
  );
}
