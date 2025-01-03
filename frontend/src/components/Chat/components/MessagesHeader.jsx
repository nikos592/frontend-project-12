import React from 'react';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';

const MessagesHeader = ({ channelName, messagesAmount }) => {
  // Проверяем, является ли channelName строкой
  const cleanedChannelName = typeof channelName === 'string' ? filter.clean(channelName) : '';

  const { t } = useTranslation();

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{cleanedChannelName && `# ${cleanedChannelName}`}</b>
      </p>
      <span className="text-muted">
        {t('ui.counter.count', { count: messagesAmount })}
      </span>
    </div>
  );
};

export default MessagesHeader;
