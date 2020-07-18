import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Chart } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Chart />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
