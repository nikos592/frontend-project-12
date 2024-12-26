import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import ChatRoute from './routes/ChatRoute.jsx';
import MainRoute from './routes/MainRoute.jsx';
import { routes } from './routes/routes.js';

import LoginPage from './components/Login/LoginPage.jsx';
import SignUpPage from './components/SignUp/SignUpPage.jsx';
import ChatPage from './components/Chat/ChatPage.jsx';
import NotFoundPage from './components/NotFound/NotFoundPage.jsx';

import Nav from './common/Nav.jsx';

const App = () => (
  <>
    <div className="d-flex flex-column h-100">
      <Router>
        <Nav />
        <Routes>
          <Route path={routes.notFoundPage()} element={<NotFoundPage />} />
          <Route element={<MainRoute />}>
            <Route path={routes.loginPage()} element={<LoginPage />} />
            <Route path={routes.signUpPage()} element={<SignUpPage />} />
          </Route>
          <Route element={<ChatRoute />}>
            <Route path={routes.chatPage()} element={<ChatPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </>
);

export default App;
