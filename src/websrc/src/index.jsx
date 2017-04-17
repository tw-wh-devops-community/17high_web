import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import DashboardComponent from './components/DashboardComponent';
import ScreenComponent from './components/ScreenComponent';
import EventEditor from './components/EventEditor';

const Screen = () => <ScreenComponent />;
const Dashboard = () => <DashboardComponent />;
const Editor = () => <EventEditor />;

render((
  <Router history={hashHistory} queryKey="false">
    <Route path="/" component={Screen} />
    <Route path="/screen" component={Screen} />
    <Route path="/home" component={Dashboard} />
    <Route path="/editor" component={Editor} />
  </Router>
), document.getElementById('app'));

