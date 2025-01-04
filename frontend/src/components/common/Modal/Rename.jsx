import React, { useEffect, useRef } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { useApi } from '../../../hooks/index.jsx';

import { customSelectors } from '../../../slices/channelsSlice';
import { selectors } from '../../../slices/modalSlice';

const schema = (channels) => yup.object().shape({
  name: yup
    .string()
    .required('errors.required')
    .min(3, 'errors.rangeLetter')
    .max(20, 'errors.rangeLetter')
    .notOneOf(channels, 'errors.notOneOf'),
});

const Rename = ({ handleClose }) => {
  const { t } = useTranslation();
  const api = useApi();

  const inputRef = useRef(null);

  const channelsNames = useSelector(customSelectors.channelsNames);
  const { channelId, channelName } = useSelector(selectors.getModalContext);

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: filter.clean(channelName),
    },
    validationSchema: schema(channelsNames),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      try {
        const { name } = values;
        api.renameChannel(channelId, name);
        toast.success(t('notify.renamedChannel'));
        handleClose();
      } catch (error) {
        formik.setSubmitting(false);

        if (error.isAxiosError && error.response.status === 401) {
          inputRef.current.select();

          return;
        }
        toast.error(t('notify.networkError'));
      }
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('ui.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={formik.handleSubmit}
        >
          <Form.Group controlId="name">
            <Form.Control
              className="mb-2"
              name="name"
              ref={inputRef}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={formik.errors.name && formik.touched.name}
              disabled={formik.isSubmitting}
            />
            <Form.Label
              visuallyHidden
            >
              {t('ui.nameChannel')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.name)}
            </Form.Control.Feedback>
            <div
              className="d-flex justify-content-end"
            >
              <Button
                className="me-2"
                variant="secondary"
                type="button"
                onClick={handleClose}
              >
                {t('buttons.cancel')}
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {t('buttons.submit')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default Rename;
