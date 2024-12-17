const apiPath = '/api/v1';

const routes = {
  chatPage: () => '/',
  loginPage: () => '/login',
  signUpPage: () => '/signup',
  notFoundPage: () => '*',
};

const apiRoutes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'), // Новый путь для сообщений
  channelsPath: () => [apiPath, 'channels'].join('/'), // Новый путь для каналов
};

export { routes, apiRoutes };
