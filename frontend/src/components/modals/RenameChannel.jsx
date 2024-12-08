import React, { useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createSchemaValidationRenameChannel } from './validate';
import { selectChannelName, selectChannelId } from '../../store/slice/appSlice';
import { useEditChannelMutation, useGetChannelsQuery } from '../../api/channelsApi';
import { censorText } from '../../utils/textFilter';

const RenameChannel = (props) => {
  const { handleClose } = props;
  const inputRef = useRef(null);
  const { data: channels = [] } = useGetChannelsQuery();
  const channelNames = channels.map((channel) => channel.name);
  const channelName = useSelector(selectChannelName);
  const сhannelId = useSelector(selectChannelId);
  const { t } = useTranslation();
  const validationSchema = createSchemaValidationRenameChannel(channelNames, t);
  const [editChannel, { isSuccess }] = useEditChannelMutation();

  const renameChannel = async (values) => {
    const { name } = values;
    const data = {
      name: censorText(name),
      id: сhannelId,
    };
    await editChannel(data).unwrap();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(t('toast.сhannelRenamedSuccessfully'));
      handleClose();
    }
  }, [isSuccess, t, handleClose]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  }, []);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.renameChannelTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: channelName,
          }}
          validationSchema={validationSchema}
          validateOnBlur={false}
          onSubmit={renameChannel}
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

export default RenameChannel;
