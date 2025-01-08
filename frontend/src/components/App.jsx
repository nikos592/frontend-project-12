import React, { useContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import ChatRoute from '../routes/ChatRoute.jsx';
import MainRoute from '../routes/MainRoute.jsx';
import { routes } from '../routes/routes.js';

import LoginPage from './Login/LoginPage.jsx';
import SignUpPage from './SignUp/SignUpPage.jsx';
import ChatPage from './Chat/ChatPage.jsx';
import NotFoundPage from './NotFound/NotFoundPage.jsx';

import Nav from './common/Nav.jsx';
import { AuthContext } from '../contexts/index.jsx';

const App = () => {
  const { getAuthHeader, saveAuthHeaders } = useContext(AuthContext);

  useEffect(() => {
    const headers = getAuthHeader();
    const token = headers.Authorization ? headers.Authorization.split(' ')[1] : null;

    if (token) {
      // Сохраним токен в контексте
      saveAuthHeaders({ Authorization: `Bearer ${token}` });
    }
  }, [getAuthHeader, saveAuthHeaders]); // Добавили зависимости

  return (
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
};

export default App;
