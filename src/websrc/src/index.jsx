import React from "react";
import {render} from "react-dom";
import {Router, Route, hashHistory, Link} from "react-router";
import DemoComponent from "./components/DemoComponent";
import ScreenComponent from "./components/ScreenComponent";

const Demo = () => <DemoComponent />;
const Screen = () => <ScreenComponent/>;

render((
  <Router history={hashHistory} queryKey="false">
    <Route path="/" component={Demo}/>
    <Route path="/repos" component={Demo}/>
    <Route path="/screen" component={Screen}/>
  </Router>
), document.getElementById('app'));

