import React, { useRef, useEffect } from 'react';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import Button from 'react-bootstrap/Button';
import { selectAuthError, selectIsAuthError } from '../store/slice/authSlice';
import { useCreateNewUserMutation } from '../api/authApi';
import { censorText } from '../utils/textFilter';
import { getPageRoute } from '../utils/routes';
import handleError from '../utils/handleError';

const SignupForm = () => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [createNewUser] = useCreateNewUserMutation();
  const authError = useSelector(selectAuthError);
  const isAuthError = useSelector(selectIsAuthError);
  const signupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('errors.range'))
      .max(20, t('errors.range'))
      .required(t('errors.required')),
    password: Yup.string()
      .min(6, t('errors.min'))
      .required(t('errors.required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('errors.mustMatch'))
      .required(t('errors.required')),
  });
  const errorMessage = handleError(authError, t);

  const handleSignup = async (values) => {
    const { username, password } = values;
    const data = {
      username: censorText(username),
      password,
    };
    await createNewUser(data).unwrap();
    navigate(getPageRoute('PAGE_CHAT'));
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={signupSchema}
      onSubmit={handleSignup}
    >
      { ({ errors, touched, isSubmitting }) => (
        <Form className="w-50">
          <h1 className="text-center mb-4">{t('signupPage.title')}</h1>
          <div className="form-floating mb-3">
            <Field
              className={`form-control ${(errors.username && touched.username) || isAuthError ? 'is-invalid' : ''}`}
              name="username"
              id="username"
              placeholder={t('errors.range')}
              autoComplete="username"
              innerRef={inputRef}
            />
            <label
              className="form-label"
              htmlFor="username"
            >
              {t('signupPage.username')}
            </label>
            {errors.username && touched.username && <div className="invalid-tooltip">{errors.username}</div>}
            {isAuthError && <div className="invalid-tooltip">{errorMessage}</div>}
          </div>
          <div className="form-floating mb-3">
            <Field
              className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
              name="password"
              id="password"
              type="password"
              placeholder={t('errors.min')}
              autoComplete="new-password"
            />
            <label
              className="form-label"
              htmlFor="password"
            >
              {t('signupPage.password')}
            </label>
            {errors.password && touched.password && <div className="invalid-tooltip">{errors.password}</div>}
          </div>
          <div className="form-floating mb-3">
            <Field
              className={`form-control ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''}`}
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              placeholder={t('errors.mustMatch')}
              autoComplete="new-password"
            />
            <label
              className="form-label"
              htmlFor="confirmPassword"
            >
              {t('signupPage.confirmPassword')}
            </label>
            {errors.confirmPassword && touched.confirmPassword && <div className="invalid-tooltip">{errors.confirmPassword}</div>}
          </div>
          <Button
            variant="outline-primary w-100"
            type="submit"
            disabled={isSubmitting}
          >
            {t('signupPage.button')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
