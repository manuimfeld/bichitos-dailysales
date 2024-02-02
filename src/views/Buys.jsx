import { useFormik } from 'formik';
import { useState } from 'react';

export const Buys = () => {
  const [data, setData] = useState([]);

  const formik = useFormik({
    initialValues: {
      provider: '',
      delivery_date: '',
      product_name: '',
      quantity: 0,
      unit_price: 0,
      total_price: 0,
    },
    onSubmit: (values) => {},
  });
  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label
          htmlFor="provider"
          className="block text-sm font-medium text-gray-600 mb-2"
        >
          Nombre del Proveedor
        </label>
        <input
          type="text"
          id="provider"
          name="provider"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.provider}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="delivery_date"
          className="block text-sm font-medium text-gray-600 mb-2"
        >
          Fecha de Entrega
        </label>
        <input
          type="date"
          id="delivery_date"
          name="delivery_date"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.delivery_date}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="product_name"
          className="block text-sm font-medium text-gray-600 mb-2"
        >
          Nombre del Producto
        </label>
        <input
          type="text"
          id="product_name"
          name="product_name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.product_name}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="quantity"
          className="block text-sm font-medium text-gray-600 mb-2"
        >
          Cantidad
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.quantity}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="unit_price"
          className="block text-sm font-medium text-gray-600 mb-2"
        >
          Precio Unitario
        </label>
        <input
          type="number"
          id="unit_price"
          name="unit_price"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.unit_price}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="total_price"
          className="block text-sm font-medium text-gray-600 mb-2"
        >
          Precio Total
        </label>
        <input
          type="number"
          id="total_price"
          name="total_price"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.total_price * formik.values.quantity}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
    </form>
  );
};
