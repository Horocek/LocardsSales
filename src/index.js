
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {InputCreds} from './App';
import * as serviceWorker from './serviceWorker';
import logo from './4.png'

const logoStyle = { 
  width: 160, 
  "margin-top" : "2%",
  "margin-left" : "2%",
  "border-radius": "15px 15px 15px 16px",
};

ReactDOM.render(

  <React.StrictMode> 
    <a href="http://client.lo.cards">
      <img src={logo} alt={"logo"} style = {logoStyle}/>
    </a>
    <br></br><br></br>
    <InputCreds/>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();