import React, { useEffect, useRef } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { useApi } from '../../../hooks/index.jsx';

import { customSelectors } from '../../../slices/channelsSlice';

const schema = (channels) => yup.object().shape({
  name: yup
    .string()
    .required('errors.required')
    .min(3, 'errors.rangeLetter')
    .max(20, 'errors.rangeLetter')
    .notOneOf(channels, 'errors.notOneOf'),
});

const Add = ({ handleClose }) => {
  const { t } = useTranslation();
  const api = useApi();

  const inputRef = useRef(null);

  const channelsName = useSelector(customSelectors.allChannels)
    .reduce((acc, channel) => [...acc, channel.name], []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: schema(channelsName),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      if (!values.name) {
        toast.error(t('errors.emptyChannelName'));
        return;
      }
      try {
        await api.addChannel(values.name);
        toast.success(t('notify.createdChannel'));
        handleClose();
      } catch (error) {
        formik.setSubmitting(false);

        if (error.isAxiosError && error.response.status === 401) {
          inputRef.current.select();
          toast.error(t('notify.unauthorized'));
        } else {
          toast.error(t('notify.networkError'));
        }
      }
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('ui.addChannel')}</Modal.Title>
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

export default Add;
