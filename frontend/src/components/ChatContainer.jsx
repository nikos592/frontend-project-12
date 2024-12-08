import React from 'react';
import { useSelector } from 'react-redux';
import { useGetMessagesQuery } from '../api/messagesApi';
import { selectCurrentChannelId } from '../store/slice/appSlice';
import ChatHeader from './ChatHeader';
import Messages from './Messages';
import MessageForm from './MessageForm';

const ChatContainer = () => {
  const { data: messages = [], isLoading } = useGetMessagesQuery();
  const currentChannelId = useSelector(selectCurrentChannelId);
  const filtredMessages = messages.filter((message) => message.channelId === currentChannelId);
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <ChatHeader filtredMessages={filtredMessages} />
        <Messages
          filtredMessages={filtredMessages}
          isLoading={isLoading}
        />
        <MessageForm />
      </div>
    </div>
  );
};

export default ChatContainer;
