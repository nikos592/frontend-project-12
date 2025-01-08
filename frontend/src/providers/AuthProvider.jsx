import {
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../contexts/index.jsx';

import { actions as loadingStateActions } from '../slices/loadingStateSlice.js';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const currentUser = JSON.parse(localStorage.getItem('userId'));
  const [user, setUser] = useState(currentUser);

  const saveAuthHeaders = useCallback((headers) => {
    if (headers?.Authorization) {
      const token = headers.Authorization.split(' ')[1];
      localStorage.setItem('userToken', token);
      setUser((prevUser) => ({ ...prevUser, token }));
    }
  }, [setUser]);

  const logIn = useCallback((data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setUser(data);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');
    dispatch(loadingStateActions.unload());
    setUser(null);
  }, [dispatch]);

  const getAuthHeader = useCallback(() => {
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }
    return {};
  }, [user]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'userId' || event.key === 'userToken') {
        try {
          const newUser = JSON.parse(localStorage.getItem('userId'));
          const newToken = localStorage.getItem('userToken');

          if (!newUser?.token || !newToken) {
            logOut();
          }
        } catch (error) {
          logOut();
          toast.error(t('errors.tokenExpired'));
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [logOut, t]);

  const context = useMemo(() => ({
    user,
    logIn,
    logOut,
    getAuthHeader,
    saveAuthHeaders,
  }), [user, logIn, logOut, getAuthHeader, saveAuthHeaders]);

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
