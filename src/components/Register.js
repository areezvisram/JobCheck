import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./styles/Register.css";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
  
    function validateForm() {
      return email.length > 0 && password.length > 0;
    }
  
    function handleSubmit(e) {
      e.preventDefault();
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
        .catch(error => alert(error));
    }
  
    return (
      <div className="Register">
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="email" size="large">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
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
            Register
          </Button>
        </form>
      </div>
    );
}

export default Register;