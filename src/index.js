import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {InputCreds} from './App';
import * as serviceWorker from './serviceWorker';
import logo from './1.png'

const logoStyle = { 
  "margin-left": "36%",
};

ReactDOM.render(
  <React.StrictMode>
    <img src={logo} alt={"logo"} style = {logoStyle}/> 
    <h1 style = {logoStyle}>Продажи по карте</h1><br></br><br></br>
    <InputCreds/>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();