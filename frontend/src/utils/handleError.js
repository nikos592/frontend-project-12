const handleError = (status, t) => {
  switch (status) {
    case 'FETCH_ERROR':
      return t('toast.networkError');
    case 401:
      return t('errors.login');
    case 409:
      return t('errors.userExists');
    default:
      return t('errors.unknownError');
  }
};

export default handleError;
