import React from "react";
import {render} from "react-dom";
import {Router, Route, hashHistory, Link} from "react-router";
import DemoComponent from "./components/DemoComponent";
import ScreenComponent from "./components/ScreenComponent";
import DashboardComponent from "./components/DashboardComponent";
import EventEditor from "./components/EventEditor";

const Demo = () => <DemoComponent />;
const Screen = () => <ScreenComponent/>;
const Dashboard = () => <DashboardComponent/>;
const Editor = () => <EventEditor/>;

render((
  <Router history={hashHistory} queryKey="false">
    <Route path="/" component={Demo}/>
    <Route path="/screen" component={Screen}/>
    <Route path="/home" component={Dashboard}/>
    <Route path="/editor" component={Editor}/>
  </Router>
), document.getElementById('app'));

