import { useFormik } from 'formik';
import * as Yup from 'yup';
import { calcularVentas } from '../helper/calculate';

export const Home = () => {
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
      </form>
      <button
        onClick={() =>
          calcularVentas(JSON.parse(localStorage.getItem('ventas')))
        }
      >
        CALCULAR
      </button>
    </>
  );
};
