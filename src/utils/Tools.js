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
          date: timeConverter(item.createdAt)
      }
  });
}

const parsSales = (data) =>{
  if (!data[0]) return data;
data[1] = salesPars(data[1]);
return data;
}


export {parsSales};