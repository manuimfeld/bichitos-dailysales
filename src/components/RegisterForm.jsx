import { Field, Form, Formik, ErrorMessage } from 'formik';
import { register } from '../api/register';
import { useState } from 'react';

export const RegisterForm = () => {
  const [registerError, setRegisterError] = useState(false);

  const handleRegister = async (values) => {
    const error = await login(values);
    if (error) {
      setRegisterError(error);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        onSubmit={handleRegister}
      >
        <Form className="rounded-[15px] min-h-[40vh] w-[100vw] md:w-[30vw] md:mx-auto p-5 flex flex-col justify-center items-start bg-red-400">
          <label htmlFor="email" className="text-slate-600 pl-2">
            Email:
          </label>
          <Field
            id="email"
            name="email"
            placeholder="example@outlook.com"
            type="email"
            className="w-full p-2"
          />
          <ErrorMessage name="email" component="div" className="error" />
          <label htmlFor="username" className="mt-5 text-slate-600 pl-2">
            Nombre de usuario:
          </label>
          <Field
            id="username"
            name="username"
            placeholder="francisco2020"
            className="w-full p-2"
          />
          <ErrorMessage name="username" component="div" className="error" />
          <label htmlFor="password" className="mt-5 pl-2 text-slate-600">
            Contraseña:
          </label>
          <Field
            id="password"
            name="password"
            type="password"
            placeholder="Contraseña..."
            className="w-full p-2"
          />
          {registerError && <div className="error">{registerError}</div>}
          <ErrorMessage name="password" component="div" className="error" />
          <button
            type="submit"
            className="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5"
          >
            Registrar
          </button>
        </Form>
      </Formik>
      <div className="mx-auto text-center">
        <p>
          ¿Ya tienes una cuenta?
          <a href="" className="ml-1 text-blue-700">
            Inicia sesión
          </a>
        </p>
      </div>
    </>
  );
};
