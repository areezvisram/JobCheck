import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Overview from "./components/Overview";

function App() {

  return (
    <div>
        <Navbar />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/overview" component={Overview} />
          <Route component={Error} />
        </Switch>
    </div>
  );
}

export default App;
