import React from 'react';
import { useSelector } from 'react-redux';

import filter from 'leo-profanity';

const Message = ({ message }) => {
  filter.getDictionary();
  const channelId = useSelector((state) => {
    const { currentChannelId } = state.channels;

    return currentChannelId;
  });
  if (message.channelId !== channelId) {
    return null;
  }
  const { username, body } = message;

  return (
    <div className="text-break mb-2">
      <b>{username}</b>
      {`: ${filter.clean(body)}`}
    </div>
  );
};

export default Message;
