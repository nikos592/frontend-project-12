import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import NewChannel from './NewChannel';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';
import { selectModalType, closeModal, selectIsOpen } from '../../store/slice/appSlice';

const modals = {
  adding: NewChannel,
  remove: RemoveChannel,
  renaming: RenameChannel,
};

const ModalContainer = () => {
  const dispatch = useDispatch();
  const handleCloseModal = () => dispatch(closeModal());
  const type = useSelector(selectModalType);
  const isOpen = useSelector(selectIsOpen);
  const Container = modals[type];
  if (!Container) return null;

  return (
    <Modal show={isOpen} onHide={handleCloseModal} centered>
      <Container handleClose={handleCloseModal} />
    </Modal>
  );
};

export default ModalContainer;
