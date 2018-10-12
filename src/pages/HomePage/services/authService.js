import RestAPIClient from 'services/RestAPIClient';

class AuthService extends RestAPIClient {
  constructor() {
    super('auth');
  }

  signIn = request => {
    return this.post('/login', request);
  };

  signUp = request => {
    return this.post('/register', request);
  };

  verifyToken = request => {
    return Promise.resolve(true);
  };
}

export const authService = new AuthService();
