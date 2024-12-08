import React, { useRef, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useAddChannelMutation, useGetChannelsQuery } from '../../api/channelsApi.js';
import { createSchemaValidationNewChannel } from './validate.js';
import { censorText } from '../../utils/textFilter.js';

const NewChannel = (props) => {
  const { handleClose } = props;
  const { t } = useTranslation();
  const { data: channels = [] } = useGetChannelsQuery();
  const channelNames = channels.map((channel) => channel.name);
  const inputRef = useRef(null);
  const validationSchema = createSchemaValidationNewChannel(channelNames, t);
  const [addChannel, { isSuccess }] = useAddChannelMutation();

  const createNewChannel = async (values) => {
    const { name } = values;
    const data = {
      name: censorText(name),
    };
    await addChannel(data).unwrap();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(t('toast.channelCreatedSuccessfully'));
      handleClose();
    }
  }, [handleClose, isSuccess, t]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.titleAdd')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: '',
          }}
          validationSchema={validationSchema}
          validateOnBlur={false}
          onSubmit={createNewChannel}
        >
          {({
            errors, isSubmitting, isValid,
          }) => (
            <Form>
              <Field
                className={cn('form-control mb-2', { 'is-invalid': !isValid })}
                name="name"
                type="text"
                innerRef={inputRef}
                id="name"
              />
              <label className="visually-hidden" htmlFor="name">{t('modal.label')}</label>
              {!isValid && <div className="invalid-feedback">{errors.name}</div>}
              <div className="d-flex justify-content-end">
                <Button
                  className="me-2"
                  variant="secondary"
                  onClick={handleClose}
                >
                  {t('modal.cancel')}
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                >
                  {t('modal.send')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </>
  );
};

export default NewChannel;
