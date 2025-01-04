import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { selectors, actions } from '../../../slices/modalSlice.js';

import Add from './Add.jsx';
import Rename from './Rename.jsx';
import Remove from './Remove.jsx';

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};

const ModalRoot = () => {
  const dispatch = useDispatch();

  const modalType = useSelector(selectors.getModalType);
  const isOpen = useSelector(selectors.isModalOpen);

  const handleClose = () => dispatch(actions.close());

  const CurrentModal = modals[modalType];

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      {CurrentModal && <CurrentModal handleClose={handleClose} />}
    </Modal>
  );
};

export default ModalRoot;
