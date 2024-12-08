import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { changeChannel, setChannelModal, selectCurrentChannelId } from '../store/slice/appSlice';

const Channel = (props) => {
  const { channel } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentChannelId = useSelector(selectCurrentChannelId);

  const handleShowModal = (modalName) => {
    dispatch(setChannelModal({ modalName, id: channel.id, name: channel.name }));
  };

  const switchChannel = () => {
    if (channel.id !== currentChannelId) {
      dispatch(changeChannel(channel));
    }
  };

  const isActive = channel.id === currentChannelId;
  const buttonClass = isActive ? 'secondary' : '';

  return channel.removable ? (
    <ButtonGroup className="d-flex" role="group">
      <Button
        className="w-100 rounded-0 text-start text-truncate"
        onClick={switchChannel}
        variant={buttonClass}
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle
          className="flex-grow-0"
          variant={buttonClass}
          split
          id="channel-management-dropdown"
        >
          <span className="visually-hidden">{t('dropdown.text')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => handleShowModal('remove')}
          >
            {t('dropdown.remove')}
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleShowModal('renaming')}
          >
            {t('dropdown.rename')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </ButtonGroup>
  ) : (
    <ButtonGroup className="d-flex" role="group">
      <Button
        className="w-100 rounded-0 text-start text-truncate"
        onClick={switchChannel}
        variant={buttonClass}
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>
    </ButtonGroup>
  );
};

export default Channel;
