import { Field, Form, Formik, ErrorMessage } from 'formik';
import { login } from '../api/login';
import { useState } from 'react';

export const LoginForm = () => {
  const [loginError, setLoginError] = useState(false);

  const handleLogin = async (values) => {
    const error = await login(values);
    if (error) {
      setLoginError(error);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={handleLogin}
      >
        <Form className="rounded-[15px] min-h-[40vh] w-[100vw] md:w-[30vw] md:mx-auto p-5 flex flex-col justify-center items-start bg-red-400">
          <label htmlFor="username" className="text-slate-600 pl-2">
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
          {loginError && <div className="error">{loginError}</div>}
          <ErrorMessage name="password" component="div" className="error" />
          <button
            type="submit"
            className="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5"
          >
            Iniciar sesión
          </button>
        </Form>
      </Formik>
      <div className="mx-auto text-center">
        <a href="" className="text-blue-700 underline">
          Olvidé mi contraseña
        </a>
        <p>
          ¿No tienes una cuenta?
          <a href="" className="ml-1 text-blue-700">
            Registrate
          </a>
        </p>
      </div>
    </>
  );
};
