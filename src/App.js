import React, { Component } from "react";
import './App.css';
import {fetchData} from './utils/Api'
import {parsSales} from './utils/Tools'
import Table from './utils/table'





const getInfo = async (login, pass, card) =>  await parsSales(await fetchData(login, pass, card));
const cardIndex = 0;
const salesIndex = 1;

const divStyle = {
    width: 350, 
    background: "#31d3fa",
    border: "solid", 
    "margin-left": "36%",
    "border-radius": "11px 11px 11px 11px",

    transform: "skew(0deg)"
  };
  const tableStyle = { 
    width: 530,
    background: "#e8f0fe",
    border: "solid", 
    "margin-left": "30%",
    "border-radius": "15px 15px 15px 16px",
    "background-color": "#cccccc",
    transform: "skew(0deg)"
  };
  const buttonStyle = {"margin-left": "36%"};
 
class InputCreds extends Component 
{
    constructor(){
        super();
        this.state = {
            login: 'Login',
            pass: 'Pass',
            card: 'card number',
            cardInfo : [false,[]],
        };
        this.handleChange = this.handleChange.bind(this);
  
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }


    async buttonGetSales() {
        this.setState({cardInfo : await getInfo(this.state.login, this.state.pass, this.state.card)})
    }


    salesDraw(props){
     
        if (this.state.cardInfo[0] === false) return(<div>{this.state.cardInfo[1]}</div>);
        const array = this.state.cardInfo[salesIndex];
         return(
            <div style = {tableStyle}>
                <p className="Table-header" Align="center" >Движение бонусов</p>
                <Table data={array}/>
            </div> 
        )
    }
    cardInfoDraw(props){
        const card = this.state.cardInfo[cardIndex];
        if (this.state.cardInfo[0] === false) return(<div></div>);
        return(
            <div style={divStyle}>
                Владелец карты : {card.lastName} {card.firstName}<br></br>
                День рождения : {card.birthday}<br></br>
                Телефон : {card.phone}<br></br>
                Баланс : {card.balance}<br></br>
                Кэшбек : {card.cashback}% <br></br>
                Скидка : {card.discount}%<br></br>
            </div>
        )
        
    }
    

    inputForm(){
        return(
        <form style = {divStyle}>
            <label>
                Логин:
                <input type="text" name="login" onChange={this.handleChange}/><br></br><br></br>
                Пароль:
                <input type="text" name='pass' onChange={this.handleChange} /><br></br><br></br>
                Номер карты:
                <input type="text" name='card' onChange={this.handleChange} /><br></br><br></br>
            </label>
        </form>
        )   
    }
    render() {
        
        return (
            <div stile>
            {this.inputForm()}<br></br>
            <button style = {buttonStyle} onClick = { 
                async () => {
                await this.buttonGetSales();
                }
            }> Получить продажи</button><br></br><br></br>
           
           {this.cardInfoDraw()}<br></br><br></br>
           {this.salesDraw()}
           </div>
           
        );
    }
}  


export {InputCreds};
