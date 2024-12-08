import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { selectAuthError, selectIsAuthError } from '../store/slice/authSlice';
import { useLoginMutation } from '../api/authApi';
import { getPageRoute } from '../utils/routes';
import handleError from '../utils/handleError';

const LoginForm = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const authError = useSelector(selectAuthError);
  const isAuthError = useSelector(selectIsAuthError);
  const loginSchema = Yup.object().shape({
    username: Yup.string().required(t('errors.required')),
    password: Yup.string().required(t('errors.required')),
  });
  const errorMessage = handleError(authError, t);

  const handleLogin = async (values) => {
    await login(values).unwrap();
    navigate(getPageRoute('PAGE_CHAT'));
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={handleLogin}
      validationSchema={loginSchema}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">{t('loginPage.title')}</h1>
          <div className="form-floating mb-3">
            <Field
              className={`form-control ${(errors.username && touched.username) || isAuthError ? 'is-invalid' : ''}`}
              type="text"
              name="username"
              placeholder={t('errors.username')}
              id="username"
              autoFocus
            />
            <label htmlFor="username">{t('loginPage.username')}</label>
            {errors.username && touched.username && <div className="invalid-tooltip">{errors.username}</div>}
          </div>
          <div className="form-floating mb-4">
            <Field
              className={`form-control ${(errors.password && touched.password) || isAuthError ? 'is-invalid' : ''}`}
              type="password"
              name="password"
              placeholder={t('loginPage.password')}
              id="password"
            />
            <label
              className="form-label"
              htmlFor="password"
            >
              {t('loginPage.password')}
            </label>
            {errors.password && touched.password && <div className="invalid-tooltip">{errors.password}</div>}
            {isAuthError && <div className="invalid-tooltip">{errorMessage}</div>}
          </div>
          <button
            className="w-100 mb-3 btn btn-outline-primary"
            type="submit"
            disabled={isSubmitting}
          >
            {t('loginPage.button')}
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default LoginForm;
