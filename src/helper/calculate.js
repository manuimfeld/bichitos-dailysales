export const calcularVentas = (ventas) => {
  let totales = {
    Efectivo: { cantidad: 0, monto: 0 },
    Transferencia: { cantidad: 0, monto: 0 },
    Débito: { cantidad: 0, monto: 0 },
    Crédito: { cantidad: 0, monto: 0 },
    totalVentas: 0,
    totalMonto: 0,
  };

  ventas.forEach((venta) => {
    let amount = parseFloat(venta.amount);
    totales[venta.paymentType].cantidad++;
    totales[venta.paymentType].monto += amount;
    totales.totalVentas++;
    totales.totalMonto += amount;
  });
  return console.log(totales);
};

//let result = calcularVentas(ventas);
