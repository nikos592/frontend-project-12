import React, { useRef, useEffect } from 'react';

import Message from './Message.jsx';

const MessagesBody = ({ channelId, messages }) => {
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current
      ?.lastElementChild
      ?.scrollIntoView({ block: 'start', behavior: 'auto' });
  }, [channelId, messages.length]);

  return (
    <div
      className="chat-messages overflow-auto px-5"
      id="messages-box"
      ref={divRef}
    >
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessagesBody;
