import React, { useEffect, useRef, useState } from 'react';
import {
  Button, Form, Card, Image, FormGroup,
} from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useAuth } from '../../hooks/index.jsx';
import { routes, apiRoutes } from '../../routes/routes.js';

import image from '../../assets/avatar_1.jpg';

const schema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'errors.rangeLetter')
    .max(20, 'errors.rangeLetter')
    .required('errors.required'),
  password: yup
    .string()
    .min(6, 'errors.minLetter')
    .required('errors.required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'errors.checkPassword')
    .required('errors.required'),
});

const SignUpPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const inputRef = useRef(null);
  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(apiRoutes.signupPath(), {
          username: values.username, password: values.password,
        });
        auth.logIn(res.data);
        const { from } = location.state || { from: { pathname: routes.chatPage() } };
        navigate(from);
      } catch (err) {
        formik.setSubmitting(false);

        if (err.isAxiosError && err.response.status === 409) {
          setAuthFailed(true);
          inputRef.current.select();

          return;
        }
        toast.error(t('notify.networkError'));
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body
              className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5"
            >
              <div>
                <Image
                  className="rounded-circle"
                  src={image}
                  alt={t('ui.registration')}
                />
              </div>
              <Form
                onSubmit={formik.handleSubmit}
                className="w-50"
              >
                <h1 className="text-center mb-4">{t('ui.registration')}</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <FormGroup
                    controlId="username"
                    className="mb-3 form-floating"
                  >
                    <Form.Control
                      ref={inputRef}
                      placeholder={t('fields.username')}
                      name="username"
                      autoComplete="username"
                      required
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      isInvalid={authFailed || !!formik.errors.username}
                    />
                    <Form.Label>{t('fields.username')}</Form.Label>
                    <Form.Control.Feedback
                      type="invalid"
                      tooltip
                      placement="right"
                    >
                      {t(formik.errors.username)}
                    </Form.Control.Feedback>
                  </FormGroup>
                  <FormGroup
                    controlId="password"
                    className="mb-3 form-floating"
                  >
                    <Form.Control
                      placeholder={t('fields.password')}
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      aria-describedby="passwordHelpBlock"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      isInvalid={authFailed || !!formik.errors.password}
                    />
                    <Form.Label>{t('fields.password')}</Form.Label>
                    <Form.Control.Feedback
                      type="invalid"
                      tooltip
                    >
                      {t(formik.errors.password)}
                    </Form.Control.Feedback>
                  </FormGroup>
                  <FormGroup
                    controlId="confirmPassword"
                    className="mb-4 form-floating"
                  >
                    <Form.Control
                      placeholder={t('fields.confirmPassword')}
                      name="confirmPassword"
                      autoComplete="new-password"
                      required
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
                      isInvalid={authFailed || !!formik.errors.confirmPassword}
                    />
                    <Form.Label>{t('fields.confirmPassword')}</Form.Label>
                    <Form.Control.Feedback
                      type="invalid"
                      tooltip
                    >
                      {t(formik.errors.confirmPassword) || t('errors.alreadyExists')}
                    </Form.Control.Feedback>
                  </FormGroup>
                  <Button
                    className="w-100"
                    variant="outline-primary"
                    type="submit"
                  >
                    {t('buttons.register')}
                  </Button>
                </fieldset>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('ui.exist')}</span>
                <a href={routes.loginPage()}>{t('buttons.logIn')}</a>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
