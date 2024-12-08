import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectCurrentChannelName } from '../store/slice/appSlice';

const ChatHeader = (props) => {
  const { filtredMessages } = props;
  const { t } = useTranslation();
  const currentChannelName = useSelector(selectCurrentChannelName);

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{`# ${currentChannelName}`}</b>
      </p>
      <span className="text-muted">
        {t('countMessages.amount_of_messages', { count: filtredMessages.length })}
      </span>
    </div>
  );
};

export default ChatHeader;
