import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { selectIsError, selectError } from '../store/slice/appSlice';
import handleError from '../utils/handleError';

const ErrorNotification = () => {
  const isError = useSelector(selectIsError);
  const errorStatus = useSelector(selectError);
  const { t } = useTranslation();

  useEffect(() => {
    if (isError) {
      const errorMessage = handleError(errorStatus, t);
      toast.error(errorMessage);
    }
  }, [errorStatus, isError, t]);

  return null;
};

export default ErrorNotification;
