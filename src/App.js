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

function App() {

  return (
    <div>        
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/overview" component={Overview} />
          <Route path="/addJob" component={AddJob}/>
          <Route path="/editJob" component={EditJob}/>
          <Route path="/reset_password/:username/:timestamp" component={ResetPasswordAuth}/>
          <Route component={Error} />
        </Switch>
    </div>
  );
}

export default App;
