import './assets/application.scss';

import { createRoot } from 'react-dom/client';

import { io } from 'socket.io-client';

import init from './init.jsx';

const app = async () => {
  const socket = io();

  const root = createRoot(document.getElementById('chat'));
  root.render(await init(socket));
};

app();
