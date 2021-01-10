import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Overview from "./components/Overview";
import AddJob from "./components/AddJob"
import EditJob from "./components/EditJob"
import ResetPasswordAuth from "./components/resetPassword/ResetPasswordAuth"
import ResetPasswordForm from "./components/resetPassword/ResetPasswordForm"
import Contact from "./components/Contact"

function App() {

  return (
    <div>        
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/overview" component={Overview} />
          <Route path="/contact" component={Contact} />
          <Route path="/addJob" component={AddJob}/>
          <Route path="/editJob" component={EditJob}/>
          <Route path="/reset_password" component={ResetPasswordAuth}/>
          <Route path="/reset-password-form" component={ResetPasswordForm} />
          <Route component={Error} />
        </Switch>
    </div>
  );
}

export default App;
