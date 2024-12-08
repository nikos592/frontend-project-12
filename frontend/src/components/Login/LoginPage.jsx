import React, { useEffect, useRef, useState } from 'react';
import {
  Button, Form, Card, Image,
} from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useAuth } from '../../hooks/index.jsx';
import { routes, apiRoutes } from '../../routes/routes.js';

import image from '../../assets/avatar.jpg';

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const LoginPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const inputRef = useRef(null);
  const [authFailed, setAuthFailed] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(apiRoutes.loginPath(), values);
        auth.logIn(res.data);
        const { from } = location.state || { from: { pathname: routes.chatPage() } };
        navigate(from);
      } catch (err) {
        formik.setSubmitting(false);

        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();

          return;
        }
        toast.error(t('notify.networkError'));
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <Image
                  variant="roundedCircle"
                  src={image}
                  alt={t('buttons.logIn')}
                />
              </div>
              <Form
                onSubmit={formik.handleSubmit}
                className="col-12 col-md-6 mt-3 mt-mb-0"
              >
                <h1 className="text-center mb-4">{t('buttons.logIn')}</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.Group
                    className="mb-3 form-floating"
                    controlId="username"
                  >
                    <Form.Control
                      ref={inputRef}
                      placeholder={t('fields.nickname')}
                      name="username"
                      autoComplete="username"
                      required
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      isInvalid={authFailed}
                    />
                    <Form.Label>{t('fields.nickname')}</Form.Label>
                    <Form.Control.Feedback type="invalid" className="invalid-feedback" tooltip={formik.errors.username && formik.touched.username}>
                      {formik.errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    controlId="password"
                    className="mb-4 form-floating"
                  >
                    <Form.Control
                      placeholder={t('fields.password')}
                      name="password"
                      autoComplete="current-password"
                      required
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      isInvalid={authFailed}
                    />
                    <Form.Label>
                      {t('fields.password')}
                    </Form.Label>
                    <Form.Control.Feedback
                      type="invalid"
                      tooltip
                    >
                      {t('errors.incorrect')}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button
                    className="w-100 mb-3"
                    variant="outline-primary"
                    type="submit"
                  >
                    {t('buttons.logIn')}
                  </Button>
                </fieldset>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('ui.noAccount')}</span>
                <a href={routes.signUpPage()}>{t('ui.registration')}</a>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
