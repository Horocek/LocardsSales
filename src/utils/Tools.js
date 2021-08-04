import {
  changeTemplate, 
  chargeBonus,
  writeOffBonus,
  sale
} from './Api'

const timeConverter = unixTime => {
  const months = ['01', '02', '03',
      '04', '05', '06',
      '07', '08', '09',
      '10', '11', '12'
  ];
  const date = new Date(unixTime * 1000);
  return `${date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}`;
}

const salesPars = array => {
  
  return array.map((item) => {
      return {
          amount: item.amount,
          write: item.bonusesWriteOff,
          charge: item.bonusesCharge,
          date: timeConverter(item.createdAt),
          isCanceled: item.isCanceled ? "отменена" : "проведена",
          salePoint: item.salePoint !== null ? item.salePoint.name : "без точки"
      } 
  });
}

const parsSales = (data) => {
  if (!data[0]) return data;
data[1] = salesPars(data[1]);
return data;
}

const parsTemplate = (array) =>{
  const activeTemplate = array.filter(item => item.isActive);
  const result = activeTemplate.map(item => { 
      return {
        id : item.id, 
        name : item.templateName
      }
    });
  return result;
}

const templateChange = async (JWT, cardId, templateId) => {
  const array = await changeTemplate (JWT, cardId, templateId);
  return array;
}
const bonusCharge = async (JWT, count, cardNumber) => {
  const array = await chargeBonus (JWT, count, cardNumber);
  return array;
}
const bonusWriteOff = async (JWT, count, cardNumber) => {
  const array = await writeOffBonus (JWT, count, cardNumber);
  return array;
}

const saleOperation = async (CRM, amount, cardNumber, writeOffBonuses = 0) => {
  const array = await sale (CRM, amount, cardNumber, writeOffBonuses);
  return array;
}
export {parsSales, parsTemplate, templateChange, bonusCharge, bonusWriteOff, saleOperation};