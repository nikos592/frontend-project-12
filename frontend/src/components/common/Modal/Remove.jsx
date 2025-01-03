import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const Remove = ({ handleClose }) => {
  const { t } = useTranslation();

  const onClick = async () => {
    try {
      toast.success(t('notify.removedChannel'));
      handleClose();
    } catch {
      toast.error(t('notify.networkError'));
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('ui.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверенны?</p>
        <div className="d-flex justify-content-end">
          <Button
            variant="secondary"
            className="me-2"
            onClick={handleClose}
          >
            {t('buttons.cancel')}
          </Button>
          <Button
            variant="danger"
            onClick={onClick}
          >
            {t('buttons.remove')}
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default Remove;
