class AccountStore {
  constructor() {
    const accountActions = this.alt.getActions('accountActions');

    this.bindAction(accountActions.fetch, this.onFetch);
    this.bindAction(accountActions.updateEmail, this.onUpdateEmail);
    this.bindAction(accountActions.updatePassword, this.onUpdatePassword);
    this.bindAction(accountActions.registerError, this.onRegisterError);
    this.bindAction(accountActions.registerSuccess, this.onRegisterSuccess);
    this.bindAction(accountActions.loginError, this.onLoginError);
    this.bindAction(accountActions.loginSuccess, this.onLoginSuccess);
    this.bindAction(accountActions.logout, this.onLogout);

    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      email: '',
      password: '',
      registerErrorMessage: '',
      loginErrorMessage: '',
      isAuthenticated: false,
    };
  }

  onFetch(currentUser) {
    if (!currentUser) {
      this.setState(this.getInitialState());
    } else {
      this.setState({
        email: currentUser.email,
        password: '',
        registerErrorMessage: '',
        loginErrorMessage: '',
        isAuthenticated: true,
      });
    }
  }

  onUpdateEmail(email) {
    this.setState({ email });
  }

  onUpdatePassword(password) {
    this.setState({ password });
  }

  onRegisterError(errorMessage) {
    this.setState({ registerErrorMessage: errorMessage });
  }

  onRegisterSuccess() {
    this.setState({
      password: '',
      registerErrorMessage: '',
      loginErrorMessage: '',
    });
  }

  onLoginError(errorMessage) {
    this.setState({ loginErrorMessage: errorMessage });
  }

  onLoginSuccess() {
    this.setState({
      password: '',
      registerErrorMessage: '',
      loginErrorMessage: '',
      isAuthenticated: true,
    });
  }

  onLogout() {
    this.setState(this.getInitialState());
  }
}

export default AccountStore;

/*
import Store from './Store';
import ActionTypes from '../constants/ActionTypes';
import Immutable from 'immutable';
import ActionsFactory from '../actions/ActionsFactory';

const accountActions = ActionsFactory.accountActions();

class AccountStore extends Store {

  getInitialState() {
    return new Immutable.Map({
      email: '',
      password: '',
      registerErrorMessage: '',
      loginErrorMessage: '',
      isAuthenticated: false,
    });
  }

  init() {
    console.log('account store');
    return new Promise((resolve, reject) => {
      console.log('Store: start');
      accountActions.init().then(resolve, reject);
    }).then(() => {
      console.log('Store: end');
    });
  }

  getHandlers() {
    return {
      [ActionTypes.ACCOUNT_INIT]: this.handleInit,
      [ActionTypes.ACCOUNT_UPDATE_EMAIL]: this.handleUpdateEmail,
      [ActionTypes.ACCOUNT_UPDATE_PASSWORD]: this.handleUpdatePassword,
      [ActionTypes.ACCOUNT_REGISTER_ERROR]: this.handleRegisterError,
      [ActionTypes.ACCOUNT_REGISTER_SUCCESS]: this.handleRegisterSuccess,
      [ActionTypes.ACCOUNT_LOGIN_ERROR]: this.handleLoginError,
      [ActionTypes.ACCOUNT_LOGIN_SUCCESS]: this.handleLoginSuccess,
    };
  }

  handleInit(state, action) {
    return state.set('email', action.user.email)
      .set('isAuthenticated', action.isAuthenticated);
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
      .set('loginErrorMessage', '')
      .set('isAuthenticated', true);
  }

}

export default AccountStore;
*/
