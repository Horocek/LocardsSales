import React, { Component } from "react";
import './App.css';
import {fetchData} from './utils/Api'
import {parsSales} from './utils/Tools'


const getInfo = async (login, pass, card) =>  await parsSales(await fetchData(login, pass, card));
const cardIndex = 0;
const salesIndex = 1;
const  ListItem = (props) => 
{
    return <h style={{ color: 'green' }}>{props.value}</h>;
}


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
            <ul>
                {
                array.map((item) => {
                return <ul>
                    <ListItem value={`
                    Дата операции - ${item.date} 
                    сумма чека - ${item.amount} 
                    накопленно бонусов - ${item.charge} 
                    списано бонусов - ${item.write}`}/> 
                    </ul>
                }
                )}
            </ul>
        )
        
    }
    cardInfoDraw(props){
        
        if (this.state.cardInfo[0] === false) return(<div></div>);
        const card = this.state.cardInfo[cardIndex];
         return(
            <div>
                Владелец карты : {card.lastName} {card.firstName}<br></br>
                День рождения : {card.birthday}<br></br>
                Телефон : {card.phone}<br></br>
                Баланс : {card.balance}<br></br>
                Кешбек : {card.cashback}% <br></br>
                Скидка : {card.discount}%<br></br>
            </div>
        )
        
    }
    

    inputForm(){
         return(
            <form>
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
            <div> 
            <button onClick = { 
                async () => {
                await this.buttonGetSales();
                }
            }> Получить </button><br></br><br></br><br></br><br></br>
           {this.inputForm()}
           {this.cardInfoDraw()}
           {this.salesDraw()}
        </div>
        );
    }
}  


export {InputCreds};
