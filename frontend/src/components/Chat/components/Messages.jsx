import React from 'react';
import { Col } from 'react-bootstrap';

import MessagesHeader from './MessagesHeader.jsx';
import MessagesBody from './MessagesBody.jsx';
import MessagesForm from './MessagesForm.jsx';

const Messages = ({ channel, messages }) => {
  if (!channel) {
    return (
      <Col className="p-0 h-100">
        <div className="d-flex flex-column h-100" />
      </Col>
    );
  }

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessagesHeader channelName={channel.name} messagesAmount={messages.length} />
        <MessagesBody channelId={channel.id} messages={messages} />
        <MessagesForm channelId={channel.id} />
      </div>
    </Col>
  );
};

export default Messages;
