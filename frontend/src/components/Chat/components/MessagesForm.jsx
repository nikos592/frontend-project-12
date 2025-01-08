import React, { useEffect, useRef } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { useApi } from '../../../hooks/index.jsx';

import { customSelectors as channelsSelectors } from '../../../slices/channelsSlice.js';

const schema = yup.object().shape({
  body: yup.string().trim().required(),
});

const MessagesForm = ({ channelId }) => {
  const { t } = useTranslation();
  const api = useApi();

  const currentChannel = useSelector(channelsSelectors.currentChannel);

  const inputRef = useRef();

  useEffect(() => {
    if (currentChannel) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [currentChannel]);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: schema,
    validateOnBlur: false,
    validateOnMount: true,
    onSubmit: async (values) => {
      const { username } = JSON.parse(localStorage.getItem('userId'));

      try {
        await api.addMessage(values.body, channelId, username);
        formik.resetForm();
        setTimeout(() => {
          inputRef.current.focus();
        }, 100);
      } catch (error) {
        toast.error(t('notify.networkError'));
      }
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form
        onSubmit={formik.handleSubmit}
        className="py-1 border rounded-2"
      >
        <InputGroup>
          <Form.Control
            className="border-0 p-0 ps-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="body"
            aria-label={t('fields.newMessage')}
            placeholder={t('fields.inputMessage')}
            value={formik.values.body}
            disabled={formik.isSubmitting}
            ref={inputRef}
          />
          <Button
            variant="group-vertical"
            type="submit"
            className="border-0"
            disabled={formik.errors.body || formik.isSubmitting}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="20"
              height="20"
              fill="currentColor"
              style={{ '--darkreader-inline-fill': 'currentColor' }}
              data-darkreader-inline-fill=""
            >
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
            <span className="visually-hidden">{t('buttons.submit')}</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessagesForm;
