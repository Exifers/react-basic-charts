import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Chart } from '../.';
import '../index.css';
import './index.css';

const App = () => {
  return (
    <div className='card'>
      <Chart />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
