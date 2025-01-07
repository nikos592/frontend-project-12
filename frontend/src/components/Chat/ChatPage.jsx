import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useAuth } from '../../hooks/index.jsx';

import { fetchChannels, fetchMessages } from '../../slices/fetchData.js';
import { selectors as loadingStateSelectors, stateLoad } from '../../slices/loadingStateSlice.js';
import { customSelectors as channelsSelectors } from '../../slices/channelsSlice.js';
import { customSelectors as messagesSelectors } from '../../slices/messagesSlice.js';

import Channels from './components/Channels.jsx';
import Messages from './components/Messages.jsx';
import Modal from '../common/Modal/index.jsx';

const handleUpdate = (navigate) => () => {
  navigate(0);
};

const Loader = () => (
  <div className="h-100 d-flex justify-content-center align-items-center">
    <Spinner animation="border" variant="primary" role="status" />
  </div>
);

const Error = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="m-auto w-auto text-center">
      <p>{t('errors.unknown')}</p>
      <Button onClick={handleUpdate(navigate)}>
        {t('ui.updatePage')}
      </Button>
    </div>
  );
};

const Content = () => {
  const loadingState = useSelector(loadingStateSelectors.getStatus);
  const channels = useSelector(channelsSelectors.allChannels);
  const currentChannel = useSelector(channelsSelectors.currentChannel);
  const currentChannelMessages = useSelector(messagesSelectors.currentChannelMessages);

  switch (loadingState) {
    case stateLoad.success:
      return (
        <>
          <Channels channels={channels} currentChannelId={currentChannel?.id} />
          <Messages channel={currentChannel} messages={currentChannelMessages} />
        </>
      );

    case stateLoad.fail:
      return <Error />;

    default:
      return <Loader />;
  }
};

const ChatPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { getAuthHeader, logOut } = useAuth();

  useEffect(() => {
    dispatch(fetchChannels(getAuthHeader()));
    dispatch(fetchMessages(getAuthHeader()));
  }, [dispatch, getAuthHeader]);

  const loadingState = useSelector(loadingStateSelectors.getStatus);

  if (loadingState === stateLoad.error || loadingState === stateLoad.fail) {
    toast.error(t('notify.unauthorized'));
    logOut();
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 flex-md-row bg-white">
        <Content />
      </Row>
      <Modal />
    </Container>
  );
};

export default ChatPage;
