import React from 'react';
import ChannelSidebar from '../components/ChannelSidebar.jsx';
import ChatContainer from '../components/ChatContainer.jsx';
import ModalContainer from '../components/modals/index.js';

const ChatPage = () => (
  <div className="container h-100 my-4 overflow-hidden rounded shadow">
    <div className="row h-100 bg-white flex-md-row">
      <ChannelSidebar />
      <ChatContainer />
      <ModalContainer />
    </div>
  </div>
);

export default ChatPage;
