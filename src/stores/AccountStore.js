import Store from './Store';
import ActionTypes from '../constants/ActionTypes';
import Immutable from 'immutable';

class RegisterStore extends Store {

  getDefaultState() {
    return new Immutable.Map({
      email: '',
      password: '',
      registerErrorMessage: '',
      loginErrorMessage: '',
    });
  }

  getHandlers() {
    return {
      [ActionTypes.ACCOUNT_UPDATE_EMAIL]: this.handleUpdateEmail,
      [ActionTypes.ACCOUNT_UPDATE_PASSWORD]: this.handleUpdatePassword,
      [ActionTypes.ACCOUNT_REGISTER_ERROR]: this.handleRegisterError,
      [ActionTypes.ACCOUNT_REGISTER_SUCCESS]: this.handleRegisterSuccess,
      [ActionTypes.ACCOUNT_LOGIN_ERROR]: this.handleLoginError,
      [ActionTypes.ACCOUNT_LOGIN_SUCCESS]: this.handleLoginSuccess,
    };
  }

  handleUpdateEmail(state, action) {
    return state.set('email', action.email);
  }

  handleUpdatePassword(state, action) {
    return state.set('password', action.password);
  }

  handleRegisterError(state, action) {
    return state.set('registerErrorMessage', action.errorMessage);
  }

  handleRegisterSuccess(state) {
    return state
      .set('password', '')
      .set('registerErrorMessage', '')
      .set('loginErrorMessage', '');
  }

  handleLoginError(state, action) {
    return state.set('loginErrorMessage', action.errorMessage);
  }

  handleLoginSuccess(state) {
    return state
      .set('password', '')
      .set('registerErrorMessage', '')
      .set('loginErrorMessage', '');
  }

}

export default RegisterStore;
