/* eslint-disable import/no-extraneous-dependencies */

import React, { useEffect, useRef } from 'react';
import {
  Dropdown, ButtonGroup, Button, Col, Nav,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import filter from 'leo-profanity';
import { actions as channelsActions } from '../../../slices/channelsSlice.js';
import { actions as modalActions } from '../../../slices/modalSlice.js';

const CloseChannel = ({
  name, sharedClasses, activeClass, handleSelect,
}) => (
  <Button
    variant={activeClass ? 'secondary' : ''}
    className={cn(sharedClasses)}
    onClick={handleSelect}
  >
    <span className="me-1">#</span>
    {filter.clean(name)}
  </Button>
);

const OpenChannel = ({
  name, sharedClasses, activeClass, handleSelect, handleRename, handleRemove,
}) => {
  const { t } = useTranslation();
  const cleanedName = typeof name === 'string' ? filter.clean(name) : '';

  return (
    <Dropdown
      as={ButtonGroup}
      className="d-flex"
    >
      <Button
        variant={activeClass ? 'secondary' : ''}
        className={cn(sharedClasses, { 'text-truncate': true })}
        onClick={handleSelect}
      >
        <span className="me-1">#</span>
        {cleanedName}
      </Button>
      <Dropdown.Toggle
        variant={activeClass ? 'secondary' : ''}
        id="react-aria9230295641-1"
      >
        <span className="visually-hidden">{t('buttons.channelManagement')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleRemove}>{t('buttons.remove')}</Dropdown.Item>
        <Dropdown.Item onClick={handleRename}>{t('buttons.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const Channels = ({ channels, currentChannelId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channelsRef = useRef(null);

  const handleSelect = (id) => () => {
    dispatch(channelsActions.changeChannel(id));
  };

  const handleAdd = () => {
    dispatch(modalActions.open({ type: 'adding' }));
  };

  const handleRename = (id, name) => () => {
    const context = {
      channelId: id,
      channelName: name,
    };
    dispatch(modalActions.open({ type: 'renaming', context }));
  };

  const handleRemove = (id, name) => () => {
    const context = {
      channelId: id,
      channelName: name,
    };
    dispatch(modalActions.open({ type: 'removing', context }));
  };

  const sharedClasses = {
    'w-100': true,
    'rounded-0': true,
    'text-start': true,
  };

  useEffect(() => {
    const activeChannelElement = channelsRef.current.querySelector(
      `[data-channel-id="${currentChannelId}"]`,
    );
    if (activeChannelElement) {
      activeChannelElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [channels, currentChannelId]);

  return (
    <Col className="col-4 col-md-2 border-end px-0 flex-column h-100 d-flex bg-light">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('ui.channels')}</b>
        <Button
          className="p-0 text-primary"
          variant="group-vertical"
          onClick={handleAdd}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav
        variant="pills"
        id="channels-box"
        className="flex-column nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        ref={channelsRef}
      >
        {channels.map(({ id, name, removable }) => {
          const Channel = removable ? OpenChannel : CloseChannel;
          return (
            <Nav.Item
              key={id}
              className="w-100"
              data-channel-id={id} // Добавлено для скролла
            >
              <Channel
                key={id}
                name={name}
                sharedClasses={sharedClasses}
                activeClass={id === currentChannelId}
                handleSelect={handleSelect(id)}
                handleRename={handleRename(id, name)}
                handleRemove={handleRemove(id, name)}
              />
            </Nav.Item>
          );
        })}
      </Nav>
    </Col>
  );
};

export default Channels;
