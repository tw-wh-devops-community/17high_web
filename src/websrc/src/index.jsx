import React from 'react';
import { render } from 'react-dom';
import DemoComponent from './components/DemoComponent';

const Demo = () => <DemoComponent />;

render(<Demo />, document.getElementById('app'));
