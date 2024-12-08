import * as Yup from 'yup';

export const createSchemaValidationNewChannel = (channelName, t) => {
  const schema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(3, t('errors.range'))
      .max(20, t('errors.range'))
      .required(t('errors.required'))
      .notOneOf(channelName, t('errors.unique')),
  });

  return schema;
};

export const createSchemaValidationRenameChannel = (channelName, t) => {
  const schema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(3, t('errors.range'))
      .max(20, t('errors.range'))
      .required(t('errors.required'))
      .notOneOf(channelName, t('errors.unique')),
  });

  return schema;
};
