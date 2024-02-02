import { useFormik } from 'formik';
import * as Yup from 'yup';
import jsPDF from 'jspdf';
import { calculate } from '../helpers/calculate';

export const Sales = () => {
  const ventas = JSON.parse(localStorage.getItem('ventas'));

  const calculateSales = () => {
    calculate();
  };

  const generatePDF = () => {
    if (ventas.length > 0) {
      const pdf = new jsPDF();
      let yPosition = 30;

      let totalVentasEfectivo = 0;
      let totalVentasDebito = 0;
      let totalVentasTransferencia = 0;
      let totalVentasCredito = 0;

      let countEfectivo = 0;
      let countDebito = 0;
      let countTransferencia = 0;
      let countCredito = 0;

      ventas.forEach((venta) => {
        switch (venta.paymentType) {
          case 'Efectivo':
            totalVentasEfectivo += parseFloat(venta.amount);
            countEfectivo++;
            break;
          case 'Débito':
            totalVentasDebito += parseFloat(venta.amount);
            countDebito++;
            break;
          case 'Transferencia':
            totalVentasTransferencia += parseFloat(venta.amount);
            countTransferencia++;
            break;
          case 'Crédito':
            totalVentasCredito += parseFloat(venta.amount);
            countCredito++;
            break;
          default:
            break;
        }
      });

      // Configurar estilos de línea para la cuadrícula
      pdf.setLineWidth(0.5);
      pdf.setDrawColor(0);

      // Dibujar la cuadrícula
      drawGrid(pdf, yPosition, 170, 50, 4, 2);

      // Resumen para Ventas en Efectivo
      addBoletaSection(
        pdf,
        'Ventas en Efectivo',
        countEfectivo,
        totalVentasEfectivo,
        yPosition,
      );

      // Resumen para Ventas en Transferencia
      yPosition += 50; // Espacio entre secciones
      drawGrid(pdf, yPosition, 170, 50, 4, 2);
      addBoletaSection(
        pdf,
        'Ventas en Transferencia',
        countTransferencia,
        totalVentasTransferencia,
        yPosition,
      );

      // Detalles para Ventas en Débito
      yPosition += 50; // Espacio entre secciones
      drawGrid(pdf, yPosition, 170, 50, 4, 2);
      addBoletaSection(
        pdf,
        'Ventas en Débito',
        countDebito,
        totalVentasDebito,
        yPosition,
      );

      ventas
        .filter((venta) => venta.paymentType === 'Débito')
        .forEach((venta) => {
          addDetalleSection(pdf, venta, yPosition);
        });

      // Detalles para Ventas en Crédito
      yPosition += 50; // Espacio entre secciones
      drawGrid(pdf, yPosition, 170, 50, 4, 2);
      addBoletaSection(
        pdf,
        'Ventas en Crédito',
        countCredito,
        totalVentasCredito,
        yPosition,
      );

      ventas
        .filter((venta) => venta.paymentType === 'Crédito')
        .forEach((venta) => {
          addDetalleSection(pdf, venta, yPosition);
        });

      // Totales generales
      yPosition += 50; // Espacio entre secciones
      drawGrid(pdf, yPosition, 170, 50, 4, 2);
      const totalVentas =
        countEfectivo + countDebito + countTransferencia + countCredito;
      const totalEnPesos =
        totalVentasEfectivo +
        totalVentasDebito +
        totalVentasTransferencia +
        totalVentasCredito;
      addBoletaSection(
        pdf,
        'Ventas totales',
        totalVentas,
        totalEnPesos,
        yPosition,
      );

      pdf.save('ventas.pdf');
    } else {
      alert('No hay ventas para generar el PDF');
    }
  };

  const drawGrid = (pdf, startY, width, height, rows, columns) => {
    const cellWidth = width / columns;
    const cellHeight = height / rows;

    for (let i = 0; i <= rows; i++) {
      const y = startY + i * cellHeight;
      pdf.line(15, y, 185, y); // Línea horizontal
    }

    for (let j = 0; j <= columns; j++) {
      const x = 15 + j * cellWidth;
      pdf.line(x, startY, x, startY + height); // Línea vertical
    }
  };

  const addBoletaSection = (pdf, title, count, total, yPosition) => {
    pdf.setFontSize(14);
    pdf.text(title, 20, yPosition + 15);
    pdf.text(`Cantidad de ventas: ${count}`, 20, yPosition + 30);
    pdf.text(`Total: $${total.toFixed(2)} pesos`, 20, yPosition + 45);

    yPosition += 50; // Altura total de la sección

    // Añadir cuadro alrededor de la sección
    pdf.rect(15, yPosition - 50, 170, 50);
  };

  const addDetalleSection = (pdf, venta, yPosition) => {
    pdf.setFontSize(12);
    pdf.text(`Monto: $${venta.amount} pesos`, 40, yPosition);
    pdf.text(`DNI: ${venta.dni || 'No proporcionado'}`, 40, yPosition + 15);

    yPosition += 30; // Altura total de la sección

    // Añadir cuadro alrededor de la sección
    pdf.rect(35, yPosition - 30, 120, 30);
  };

  const formik = useFormik({
    initialValues: {
      paymentType: 'Efectivo',
      amount: '',
      dni: '',
      turno: 'Mañana',
    },
    validationSchema: Yup.object({
      amount: Yup.number()
        .required('El monto es obligatorio')
        .positive('Ingrese un monto válido'),
    }),
    onSubmit: (values) => {
      const ventaData = {
        ...values,
        date: new Date().toLocaleString('en-US', {
          timeZone: 'America/Argentina/Buenos_Aires',
        }), // Agrega la fecha y hora actual
      };

      // Enviar datos al backend (puedes hacerlo aquí)

      // Almacenar datos en localStorage
      const ventasEnLocalStorage =
        JSON.parse(localStorage.getItem('ventas')) || [];
      ventasEnLocalStorage.push(ventaData);
      localStorage.setItem('ventas', JSON.stringify(ventasEnLocalStorage));

      // Resto del código...
      values.paymentType = 'Efectivo';
      values.amount = '';
      values.dni = '';
    },
  });

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-center mt-4">
        Registro de Ventas
      </h1>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto mt-8">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Tipo de Pago
          </label>
          <div className="flex">
            {['Efectivo', 'Transferencia', 'Débito', 'Crédito'].map((type) => (
              <button
                key={type}
                type="button"
                className={`mr-4 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  formik.values.paymentType === type
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
                onClick={() => formik.setFieldValue('paymentType', type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-600"
          >
            Monto
          </label>
          <input
            type="text"
            id="amount"
            name="amount"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.amount}
            className={`mt-1 p-2 border ${
              formik.touched.amount && formik.errors.amount
                ? 'border-red-500'
                : 'border-gray-300'
            } rounded-md w-full`}
          />
          {formik.touched.amount && formik.errors.amount && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.amount}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="dni"
            className="block text-sm font-medium text-gray-600"
          >
            DNI (opcional)
          </label>
          <input
            type="text"
            id="dni"
            name="dni"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dni}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Turno
          </label>
          <div className="flex">
            {['Mañana', 'Tarde'].map((turno) => (
              <button
                key={turno}
                type="button"
                className={`mr-4 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  formik.values.turno === turno
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
                onClick={() => formik.setFieldValue('turno', turno)}
              >
                {turno}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Registrar Venta
        </button>
        <button onClick={generatePDF}>Generar PDF</button>
        <button onClick={calculateSales}>Calcular</button>
      </form>
    </>
  );
};
