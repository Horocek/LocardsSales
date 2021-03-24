const fetchData = async (login, pass, card) => {
    const autorized =  await loginUser(login, pass);
    if (!autorized) return [false, "Не верный логин/пароль"];
    const crmToken = await getCrmToken(autorized)
    const cardInfo = await getCard(crmToken, card)
    if (!cardInfo) return [false, "карта не найдена"];
    const sales = await getSales(cardInfo.id, autorized);
    if (!sales) return [false, "нет продаж"];
    return [cardInfo, sales];
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
export {
    fetchData
};