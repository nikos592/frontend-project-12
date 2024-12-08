import { useContext } from 'react';

import { AuthContext, ApiContext } from '../contexts/index.jsx';

const useAuth = () => useContext(AuthContext);
const useApi = () => useContext(ApiContext);

export { useAuth, useApi };
