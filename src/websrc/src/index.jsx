import React from "react";
import {render} from "react-dom";
import {Router, Route, hashHistory, Link} from "react-router";
import LoginComponent from "./components/LoginComponent";
import ScreenComponent from "./components/ScreenComponent";

const Login = () => <LoginComponent />;
const Screen = () => <ScreenComponent/>;

render((
  <Router history={hashHistory} queryKey="false">
    <Route path="/" component={Login}/>
    <Route path="/repos" component={Login}/>
    <Route path="/screen" component={Screen}/>
  </Router>
), document.getElementById('app'));

