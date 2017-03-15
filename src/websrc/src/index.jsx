import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import DemoComponent from './components/DemoComponent';

const Demo = () => <DemoComponent />;

render((
  <Router history={hashHistory} queryKey="false">
    <Route path="/" component={Demo}/>
    <Route path="/repos" component={Demo}/>
    <Route path="/about" component={Demo}/>
  </Router>
), document.getElementById('app'));

