import appDispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/ActionTypes';
import http from '../core/HttpClient';
import Location from '../core/Location';

class AccountActions {

  updateEmail(email) {
    appDispatcher.dispatch({
      type: ActionTypes.ACCOUNT_UPDATE_EMAIL,
      email,
    });
  }

  updatePassword(password) {
    appDispatcher.dispatch({
      type: ActionTypes.ACCOUNT_UPDATE_PASSWORD,
      password,
    });
  }

  async register(email, password) {
    try {
      const response = await http.post('/api/register', { email, password });
      this.registrationSuccess(response.isActivationRequired);
    } catch (err) {
      this.registrationError(err.response.body.error);
    }
  }

  registrationError(errorMessage) {
    appDispatcher.dispatch({
      type: ActionTypes.ACCOUNT_REGISTER_ERROR,
      errorMessage,
    });
  }

  registrationSuccess(isActivationRequired) {
    appDispatcher.dispatch({
      type: ActionTypes.ACCOUNT_REGISTER_SUCCESS,
      isActivationRequired,
    });

    if (isActivationRequired) {
      Location.push('/activate');
    } else {
      // user has been automatically logged in
      Location.push('/');
    }
  }

  async login(email, password) {
    try {
      await http.post('/api/login', { email, password });
      this.loginSuccess();
    } catch (err) {
      this.loginError(err.response.body.error);
    }
  }

  loginError(errorMessage) {
    appDispatcher.dispatch({
      type: ActionTypes.ACCOUNT_LOGIN_ERROR,
      errorMessage,
    });
  }

  loginSuccess() {
    appDispatcher.dispatch({
      type: ActionTypes.ACCOUNT_LOGIN_SUCCESS,
    });

    Location.push('/');
  }

}

export default AccountActions;
