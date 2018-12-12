import RestAPIClient from 'services/RestAPIClient';
import storage from 'utils/storage';

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

  getUserCredential = () => storage.get('USER_CREDENTIAL') || {};

  verifyToken = request => {
    return Promise.resolve(true);
  };
}

export const authService = new AuthService();
