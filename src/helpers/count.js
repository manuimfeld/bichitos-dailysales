let amountTotal = 0;
for (let i = 0; i < sals.length; i++) {
  let saleMap = sals[i];
  amountTotal += Number.parseFloat(saleMap.amount);
}
console.log('Se vendió un total de: ' + amountTotal);
