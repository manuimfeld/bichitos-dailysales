const ventas = JSON.parse(localStorage.getItem('ventas'));
const efectivo = ventas.filter((venta) => venta.paymentType === 'Efectivo');
const transferencia = ventas.filter(
  (venta) => venta.paymentType === 'Transferencia',
);
const debito = ventas.filter((venta) => venta.paymentType === 'Débito');
const credito = ventas.filter((venta) => venta.paymentType === 'Crédito');

export const reduceAmount = (arr) => {
  let carry = 0;
  for (let i = 0; i < arr.length; i++) {
    carry += Number(arr[i].amount);
  }
  return carry;
};

export const calculate = () => {
  console.log(`Efectivo: ${efectivo.length}, $${reduceAmount(efectivo)}`);
  console.log(
    `Transferencias: ${transferencia.length}, $${reduceAmount(transferencia)}`,
  );
  console.log(`Débitos: ${debito.length}, $${reduceAmount(debito)}`);
  console.log(`Créditos: ${credito.length}, $${reduceAmount(credito)}`);
};
