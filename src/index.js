import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {InputCreds} from './App';
import * as serviceWorker from './serviceWorker';
import logo from './4.png'


const logoStyle = { 
  "margin-left": "1%",
  "margin-top": "1%",
  width: 360, 
  "border-radius": "15px 15px 15px 16px",
};
const divStyle = {
  width: 370, 
  background: "#ffffff",
  border: "solid", 
  "margin-left": "35%",
  "border-radius": "11px 11px 11px 11px",

  transform: "skew(0deg)"
};


ReactDOM.render(

  <React.StrictMode> 
    <div style ={divStyle}>
    <img src={logo} alt={"logo"} style = {logoStyle}/> 
    <h1 style = {logoStyle}>Продажи по карте</h1>
    </div>
    <br></br><br></br>
    <InputCreds/>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();