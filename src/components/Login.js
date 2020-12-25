import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [loggedIn, setLoginStatus] = useState(false);
  const history = useHistory();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(e) {
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

    fetch("http://127.0.0.1:5000/api/token", obj)
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
      .catch(error => alert(error));
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" size="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button
          variant="primary"
          size="lg"
          disabled={!validateForm()}
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
