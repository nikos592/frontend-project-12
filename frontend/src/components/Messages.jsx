import React, { useEffect, useRef } from 'react';
import Loading from './Spinner.jsx';

const Messages = (props) => {
  const { filtredMessages, isLoading } = props;
  const messageRef = useRef(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [filtredMessages.length]);

  return (
    <div
      className="chat-messages overflow-auto px-5"
      id="messages-box"
      ref={messageRef}
    >
      {isLoading && <Loading />}
      {filtredMessages.map((message) => (
        <div
          className="text-break mb-2"
          key={message.id}
        >
          <b>{message.username}</b>
          :
          {' '}
          {message.message}
        </div>
      ))}
    </div>
  );
};

export default Messages;
