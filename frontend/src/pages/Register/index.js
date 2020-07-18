import React from "react";
import { Formik, ErrorMessage, Form, Field } from "formik";
import * as yup from "yup";
import api from "../../services/Api";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();

  const handlesubmit = (values) => {
    api
      .post("v1/api/user", values)
      .then((response) => {
        const { data } = response;
        if (data) {
          history.push("/login");
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const validations = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min("4").required(),
  });

  return (
    <>
      <div className="main__form">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          onSubmit={handlesubmit}
          validationSchema={validations}
        >
          <Form className="form">
            <h1 className="form__title">Cadastrar</h1>
            <div className="form__field">
              <Field name="firstName" placeholder="firstName" />
              <ErrorMessage name="firstName" component="span" />
            </div>
            <div className="form__field">
              <Field name="lastName" placeholder="lastName" />
              <ErrorMessage name="lastName" component="span" />
            </div>
            <div className="form__field">
              <Field name="email" placeholder="email@email" />
              <ErrorMessage name="email" component="span" />
            </div>
            <div className="form__field">
              <Field name="password" type="password" placeholder="*******" />
              <ErrorMessage name="password" component="span" />
            </div>
            <button className="form__submit" type="submit">
              Create Account
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
};
export default Register;
