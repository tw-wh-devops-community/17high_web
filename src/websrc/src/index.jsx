import React from "react";
import {render} from "react-dom";
import {Router, Route, hashHistory} from "react-router";
import DashboardComponent from "./components/DashboardComponent";
import ScreenComponent from "./components/ScreenComponent";
import EventNewEditor from "./components/Editor/EventEditor";

render((
  <Router history={ hashHistory } queryKey="false">
    <Route path="/" component={ ScreenComponent }/>
    <Route path="/screen" component={ ScreenComponent }/>
    <Route path="/home" component={DashboardComponent}/>
    <Route path="/editor" component={EventNewEditor}/>
    <Route path="/editor/:id" component={ EventNewEditor }/>
  </Router>
), document.getElementById('app'));

