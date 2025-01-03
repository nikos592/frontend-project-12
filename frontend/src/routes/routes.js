const apiPath = '/api/v1';

const routes = {
  chatPage: () => '/',
  loginPage: () => '/login',
  signUpPage: () => '/signup',
  notFoundPage: () => '*',
};

const apiRoutes = {
  loginPath: () => `${apiPath}/login`,
  signupPath: () => `${apiPath}/signup`,
  channelsPath: () => `${apiPath}/channels`,
  channelPath: (id) => `${apiPath}/channels/${id}`,
  messagesPath: () => `${apiPath}/messages`,
  messagePath: (id) => `${apiPath}/messages/${id}`,
  dataPath: () => `${apiPath}/data`,
};

export { routes, apiRoutes };
