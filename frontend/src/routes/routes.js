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
  dataPath: () => [apiPath, 'data'].join('/'),
};

export { routes, apiRoutes };
