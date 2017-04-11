import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import DashboardComponent from './components/DashboardComponent';
import LoginComponent from './components/LoginComponent';
import ScreenComponent from './components/ScreenComponent';
import EventEditor from './components/EventEditor';

const Screen = () => <ScreenComponent />;
const Dashboard = () => <DashboardComponent />;
const Editor = () => <EventEditor />;
const Login = () => <LoginComponent />;


render((
  <Router history={hashHistory} queryKey="false">
    <Route path="/" component={Login} />
    <Route path="/screen" component={Screen} />
    <Route path="/home" component={Dashboard} />
    <Route path="/editor" component={Editor} />
  </Router>
), document.getElementById('app'));

