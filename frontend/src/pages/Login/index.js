import React from "react";
import { Formik, ErrorMessage, Form, Field } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import api from "../../services/Api";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  const handlesubmit = (values) => {
    console.log(values);

    api
      .post("v1/api/auth", values)
      .then((response) => {
        const { data } = response;
        if (data) {
          localStorage.setItem("app-token", data);
          history.push("/");
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const validations = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min("4").required(),
  });

  return (
    <>
      <div className="main__form">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handlesubmit}
          validationSchema={validations}
        >
          <Form className="form">
            <h1 className="form__title">Login</h1>
            <div className="form__field">
              <Field name="email" placeholder="email@email" />
              <ErrorMessage name="email" component="span" />
            </div>
            <div className="form__field">
              <Field name="password" type="password" placeholder="*******" />
              <ErrorMessage name="password" component="span" />
            </div>
            <button className="form__submit" type="submit">
              Login
            </button>
            <Link to="/register" className="form__change">
              Criar Conta
            </Link>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Login;
