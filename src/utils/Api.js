const fetchData = async (login, pass, card) => {
    const autorized =  await loginUser(login, pass);
    if (!autorized) return [false, "НЕ ВЕРНЫЙ ЛОГИН/ПАРОЛЬ"];
    const crmToken = await getCrmToken(autorized)
    const cardInfo = await getCard(crmToken, card)
    if (!cardInfo) return [false, "КАРТА НЕ НАЙДЕНА"];
    const sales = await getSales(cardInfo.id, autorized);
    const templates = await getTemplates(autorized);
    //if (!sales && cardInfo) return [true, cardInfo];
    if (!sales) return [false,"НЕТ ПРОДАЖ"];
    return [cardInfo, sales, templates, autorized, crmToken];
};

const loginUser = async (login, pass) => {
    const user = {
        email: login,
        password: pass
    };
    const response = await fetch('https://api.lo.cards/v1/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
      });
      const result =  await response.json();
      return !result.success ? result.success : result.data;
}


const getCrmToken = async (JWT) => {

    const response = await fetch('https://api.lo.cards/v1/integration', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${JWT}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
      });
      const result =  await response.json();
      return result.data[0].token;
}

const getCard = async (CRM, card) => {

    const response = await fetch(`https://api.lo.cards/v1/crm/card/${card}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${CRM}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
      });
      const result =  await response.json();
      return !result.success ? result.success : result.data;
}

const getSales = async (cardId, JWT) => {

    const response = await fetch(`https://api.lo.cards/v1/analytics/sale-for-card/${cardId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${JWT}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
      });
      const result =  await response.json();
      return result.data.length === 0 ? false : result.data;
}

const getTemplates = async (JWT) => {

    const response = await fetch(`https://api.lo.cards/v1/template`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${JWT}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
      });
      const result =  await response.json();
      return result.data.length === 0 ? false : result.data;
}

const changeTemplate = async (JWT, cardId, templateId) => {
    const bodyJSON = {
        cardId: cardId,
        templateId: templateId,
        commentOnOperation: ""
    };
    const response = await fetch('https://api.lo.cards/v1/card/change-template', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${JWT}`,
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(bodyJSON)
      });
      const result =  await response.json();
      return !result.success ? result.success : result;
}

const chargeBonus = async (JWT, count, cardNumber) => {
    const bodyJSON = {
        countBonuses: count,
        cardNumber: cardNumber,
        commentOnOperation: "Начисление технической поддрежки"
      }
    const response = await fetch('https://api.lo.cards/v1/operation/bonuses-charge', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${JWT}`,
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(bodyJSON)
      });
      const result =  await response.json();
      return !result.success ? result.success : result;
}
const writeOffBonus = async (JWT, count, cardNumber) => {
    const bodyJSON = {
        countBonuses: count,
        cardNumber: cardNumber,
        commentOnOperation: "Списание технической поддрежки"
      }
    const response = await fetch('https://api.lo.cards/v1/operation/bonuses-write-off', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${JWT}`,
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(bodyJSON)
      });
      const result =  await response.json();
      return !result.success ? result.success : result;
}
const sale = async (CRM, amount, cardNumber, writeOffBonuses = 0) => {
    const bodyJSON = {
        amount: amount,
        bonusesWriteOff: writeOffBonuses,
        otherDiscountsAmount: 0,
        cardNumber: cardNumber
      }
    const response = await fetch('https://api.lo.cards/v1/crm/sale', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${CRM}`,
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(bodyJSON)
      });
      const result =  await response.json();
      return !result.success ? result.success : result;
}


export {
    fetchData,
    changeTemplate,
    chargeBonus,
    writeOffBonus,
    sale
};