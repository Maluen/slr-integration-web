export default class AccountStore {
  constructor() {
    this.exportPublicMethods({
      fetch: this.fetch,
    });

    const accountActions = this.alt.getActions('accountActions');

    this.bindAction(accountActions.fetchSuccess, this.onFetchSuccess);
    this.bindAction(accountActions.fetchError, this.onFetchError);
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

  fetch(...args) {
    return this.alt.getActions('accountActions').fetch(...args);
  }

  onFetchSuccess(currentUser) {
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

  onFetchError(errorMessage) {
    // no-op
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
