import React, { useEffect, useState } from 'react';
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

let socket;

const ModalRoot = () => {
  const dispatch = useDispatch();

  const modalType = useSelector(selectors.getModalType);
  const isOpen = useSelector(selectors.isModalOpen);

  const handleClose = () => dispatch(actions.close());

  const [messages, setMessages] = useState([]);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    // Динамическое определение URL WebSocket-сервера
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const { host } = window.location;
    const websocketUrl = `${protocol}//${host}/ws`;

    socket = new WebSocket(websocketUrl);

    socket.addEventListener('open', () => {
      console.log('Connected to the server via WebSocket');
    });

    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case 'newMessage':
          setMessages((prevMessages) => [...prevMessages, data.payload]);
          break;
        case 'newChannel':
          setChannels((prevChannels) => [...prevChannels, data.payload]);
          break;
        case 'removeChannel':
          setChannels((prevChannels) => prevChannels.filter((channel) => channel.id !== data.payload.id));
          break;
        case 'renameChannel':
          setChannels((prevChannels) => prevChannels.map((channel) => {
            if (channel.id === data.payload.id) {
              return { ...channel, name: data.payload.name };
            }
            return channel;
          }));
          break;
        default:
          console.log(`Unknown event type: ${data.type}`);
      }
    });

    return () => {
      socket.close();
    };
  }, []);

  const CurrentModal = modals[modalType];

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      {CurrentModal && <CurrentModal handleClose={handleClose} />}
    </Modal>
  );
};

export default ModalRoot;
