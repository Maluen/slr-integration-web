export default class AccountStore {
  constructor() {
    this.exportPublicMethods({
      setState: this.setState,
      getInitialState: this.getInitialState,
      reset: this.reset,
      fetchBefore: this.fetchBefore,
      fetch: this.fetch,
      onReset: this.onReset,
      onFetchBefore: this.onFetchBefore,
    });

    const accountActions = this.alt.getActions('accountActions');

    this.bindAction(accountActions.reset, this.onReset);
    this.bindAction(accountActions.fetchBefore, this.onFetchBefore);
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
      isFetching: false,
      isFetched: false,
      fetchErrorMessage: '',
      email: '',
      password: '',
      registerErrorMessage: '',
      loginErrorMessage: '',
      isAuthenticated: false,
    };
  }

  reset() {
    this.onReset();
  }

  fetchBefore() {
    this.onFetchBefore();
  }

  fetch(...args) {
    this.fetchBefore();
    return this.alt.getActions('accountActions').fetch(...args);
  }

  onReset() {
    this.setState(this.getInitialState());
  }

  onFetchBefore() {
    this.setState({
      isFetching: true,
      isFetched: false,
      fetchErrorMessage: '',
    });
  }

  onFetchSuccess(currentUser) {
    let newState;
    if (!currentUser) {
      newState = this.getInitialState();
    } else {
      newState = {
        email: currentUser.email,
        password: '',
        registerErrorMessage: '',
        loginErrorMessage: '',
        isAuthenticated: true,
      };
    }
    this.setState({
      ...newState,
      isFetching: false,
      isFetched: true,
    });
  }

  onFetchError(errorMessage) {
    this.setState({
      isFetching: false,
      isFetched: true,
      fetchErrorMessage: errorMessage,
    });
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
