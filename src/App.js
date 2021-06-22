import React, { Component } from "react";
import './App.css';
import {fetchData} from './utils/Api'
import {parsSales, parsTemplate, templateChange, bonusCharge, bonusWriteOff, saleOperation} from './utils/Tools'
import Table from './utils/table'


const getInfo = async (login, pass, card) =>  await parsSales(await fetchData(login, pass, card));
const cardIndex = 0;
const salesIndex = 1;
const templateIndex = 2;
const JWTIndex = 3;
const CRMIndex = 4;

const divStyle = {
    width: 360,
    height: 200,
    background: "#31d3fa",
    border: "solid", 
    "margin-left": "3%",
    "border-radius": "11px 11px 11px 11px",
    transform: "skew(0deg)"
  };
  const saleStyle = {
    width: 500,
    height: 200,
    background: "#31d3fa",
    border: "solid", 
    "margin-left": "1%",
    "margin-top": "3%",
    "border-radius": "11px 11px 11px 11px",
    transform: "skew(0deg)"
  };
  
  const inputStyle = {
    "margin-top": "2%",
    "margin-left": "2%",
    width: 150,
    height: 40,
    "border-radius": "5px 5px 5px 5px",
    transform: "skew(0deg)"
  };
 
const btStyle ={
    "border-radius": "11px 11px 11px 11px",
    transform: "skew(0deg)",
    width : 200,
    height : 30,
    "margin-top" : "1%",
    "margin-left" : "3%",
    "margin-right" : "1%",
  }
  const tableStyle = { 
    width: 550,
    background: "#e8f0fe",
    border: "solid", 
    "margin-left": "1%",
    "border-radius": "15px 15px 15px 16px",
    "background-color": "#cccccc",
    transform: "skew(0deg)"
  };
  const pStyle = { 
    background: "#e8f0fe",
    "margin-left": "35%",
    "border-radius": "15px 15px 15px 16px",
    "background-color": "#cccccc",
    transform: "skew(0deg)"
  };
 
class InputCreds extends Component 
{
    constructor(){
        super();
        this.state = {
            login: 'Login',
            pass: 'Pass',
            card: 'card number',
            cardInfo : [false,[]],
            template : [{id: 0,
                        name : "name"}],
            templateChanged : [],
            bonusCharge : 0,
            bonusWriteOff : 0,
            amount : 0,
            writeSaleBonus : 0
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
        this.setState({cardInfo : await getInfo(this.state.login, this.state.pass, this.state.card)});
        if (this.state.cardInfo[0] === false) return
        this.setState({template : await parsTemplate(this.state.cardInfo[templateIndex])});
        this.setState({templateChanged : this.state.cardInfo[cardIndex].templateId})
    }
    async buttonTemplate(){
       const result = await templateChange(this.state.cardInfo[JWTIndex], this.state.cardInfo[cardIndex].id, this.state.templateChanged);
       return result;
    }
    async buttonBonusCharge(){
        const result = await bonusCharge(this.state.cardInfo[JWTIndex], this.state.bonusCharge, this.state.cardInfo[cardIndex].cardNumber);
        return result;
     }
     async buttonBonusWriteOff(){
        const result = await bonusWriteOff(this.state.cardInfo[JWTIndex], this.state.bonusWriteOff, this.state.cardInfo[cardIndex].cardNumber);
        return result;
     }

     async buttonSale(){
        const result = await saleOperation(this.state.cardInfo[CRMIndex], this.state.amount, this.state.cardInfo[cardIndex].cardNumber, this.state.writeSaleBonus);
        return result;
     }

    createSelectItems() {  
        return this.state.template.map((item) => {
           return <option value={item.id}>{item.name}</option>
        })

    }  
    salesDraw(props){
     
        if (this.state.cardInfo[0] === false) return(<div>{this.state.cardInfo[1]}</div>);
        const array = this.state.cardInfo[salesIndex];
         return(
            <div style = {tableStyle}>
                <p style = {pStyle} className="Table-header" Align="center" >Движение бонусов</p>
                <Table data={array}/>
            </div> 
        )
    }
    cardInfoDraw(props){
        const card = this.state.cardInfo[cardIndex];
        if (this.state.cardInfo[0] === false) return(<div></div>);
        return(
            <div style={divStyle}><br></br>
                &nbsp; &nbsp;Владелец карты : {card.lastName} {card.firstName}<br></br>
                &nbsp; &nbsp;День рождения : {card.birthday}<br></br>
                &nbsp; &nbsp;Телефон : {card.phone}<br></br>
                &nbsp; &nbsp;Шаблон : {card.templateName}<br></br>
                &nbsp; &nbsp;Баланс : {card.balance}<br></br>
                &nbsp; &nbsp;Кэшбек : {card.cashback}% <br></br>
                &nbsp; &nbsp;Скидка : {card.discount}%<br></br>
            </div>
        )
        
    }
    

    inputForm(){
        return(
        <div style={divStyle}>
            <label><br></br>
             &nbsp; &nbsp;Логин:
                <input type="text" name="login" onChange={this.handleChange}/><br></br><br></br>
                &nbsp; &nbsp;Пароль:
                <input type="password" name='pass' onChange={this.handleChange} /><br></br><br></br>
                &nbsp; &nbsp;Номер карты:
                <input type="number" name='card' onChange={this.handleChange} /><br></br><br></br>
            </label>
        </div>
        )   
    }
    saleForm(props){
        const card = this.state.cardInfo[cardIndex];
        if (this.state.cardInfo[0] === false) return(<div></div>);
        if (card.discount === 0 && card.cashback > 0) {
        return(
            <div className={'saleContainer'}>
                <div>
                    <input style ={inputStyle} type="number" name="bonusCharge" onChange={this.handleChange}/> 
                    <button style={btStyle}onClick = { 
                        async () => {
                        const result = await this.buttonBonusCharge();
                         if (result.success){
                             alert(`${this.state.bonusCharge} бонусов накопленно`);
                             await this.buttonGetSales()
                         } else {
                            alert(`${this.state.bonusCharge} не верное число`);
                         }
                    }
                    }>Начислить бонусы</button>
                </div>
                <div>
                    <input style ={inputStyle} type="number" name="bonusWriteOff" onChange={this.handleChange}/> 
                    <button style={btStyle}onClick = { 
                        async () => {
                        const result = await this.buttonBonusWriteOff();
                        if (result.success){
                            alert(`${this.state.bonusWriteOff} бонусов списанно`);
                            await this.buttonGetSales()
                        } else {
                        alert(`${this.state.bonusWriteOff} не верное число`);
                     }
                    }
                    }>Списать бонусы</button>
                </div>
                <div style={saleStyle}>
                <h3>&nbsp; &nbsp;Чек <br></br></h3>
                &nbsp; &nbsp;Сумма чека: 
                    <input style ={inputStyle}type="number" name="amount" onChange={this.handleChange}/> <br></br>
                    &nbsp; &nbsp;Бонусов к списанию (если 0 копим):
                    <input style ={inputStyle} type="number" name="writeSaleBonus" onChange={this.handleChange}/> <br></br>
                    <button style={btStyle}onClick = { 
                        async () => {
                        const result = await this.buttonSale();
                        if (result.success){
                            alert(`Операция проведена`);
                            await this.buttonGetSales();
                        } else {
                            alert(`Ошибка: превышен лимит или не верное число`);
                        }
                    }
                    }>Провести операцию</button>
                </div>
                <div style={saleStyle}>
                <h3>&nbsp; &nbsp;Смена категрии </h3><br></br>
                &nbsp; &nbsp;Текущая категория: {card.templateName}<br></br>
                <select style ={inputStyle} value={this.state.templateChanged} name="templateChanged" onChange={this.handleChange}>
                        {
                            this.createSelectItems()
                        }
                </select>
                <button style={btStyle} onClick = { 
                        async () => {
                        const result = await this.buttonTemplate();
                        if (result.success){
                            alert(`категория изменена`);
                            await this.buttonGetSales();
                        } else {
                            alert('Ошибка смены категории');
                        }
                    }
                    }>Сменить категорию</button>
                </div>
            </div>
        )
        }  if (card.discount !== 0 || (card.discount === 0 && card.cashback === 0)) 
         {
            return(
                <div className={'discountContainer'}>
                    <div style={saleStyle}>
                        <h3>&nbsp; &nbsp;Смена категрии <br></br></h3>
                        &nbsp; &nbsp;Текущая категория: {card.templateName}<br></br>
                         <select style ={inputStyle} value={this.state.templateChanged} name="templateChanged" onChange={this.handleChange}>
                        {
                            this.createSelectItems()
                        }
                        </select>
                        <button style={btStyle} onClick = { 
                        async () => {
                            const result = await this.buttonTemplate();
                            if (result.success){
                                alert(`категория изменена`);
                                await this.buttonGetSales();
                            } else {
                                alert('Ошибка смены категории');
                            }
                        }
                        }>Сменить категорию</button>
                    </div>
                </div>
            )
        }

    }
    render() {
        
        return (
            <div>
                <div className={'loginContainer'}>
                    {this.inputForm()}<br></br>
                    <button style={btStyle}
                    
                    onClick = { 
                        async () => {
                        await this.buttonGetSales();
                    }
                    }> Получить продажи</button>
                    {this.cardInfoDraw()}
                </div>
                <div className={'dataContainer'}>
                    {this.salesDraw()}
                    
                    {this.saleForm()}
                    
                </div>
           
           </div>
           
        );
    }
}  


export {InputCreds};
