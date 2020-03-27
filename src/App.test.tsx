import React from 'react';
import ReactDOM from 'react-dom';
import CarePlanNav from './CarePlanNav';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CarePlanNav />, div);
  ReactDOM.unmountComponentAtNode(div);
});
