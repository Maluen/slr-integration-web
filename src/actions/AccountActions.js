import Globals from '../core/Globals';

export default class AccountActions {

  reset() {
    return '';
  }

  fetch() {
    return this.alt.defer(async (resolve) => {
      try {
        //this.actions.fetchBefore();
        const response = await Globals.services.get('currentUser', { req: this.alt.req });
        this.actions.fetchSuccess(response.user);
      } catch (err) {
        this.actions.fetchError(err.message);
      }
      resolve();
    });
  }

  fetchBefore() {
    return '';
  }

  fetchError(errorMessage) {
    console.log('fetch error', errorMessage);
    return errorMessage;
  }

  fetchSuccess(user) {
    return user;
  }

  updateEmail(email) {
    return email;
  }

  updatePassword(password) {
    return password;
  }

  register(email, password) {
    return this.alt.promise(async (resolve) => {
      try {
        const response = await Globals.services.post('register', { email, password, req: this.alt.req, res: this.alt.res });
        this.actions.registerSuccess(response.isActivationRequired);
      } catch (err) {
        this.actions.registerError(err.message);
      }
      resolve();
    });
  }

  registerError(errorMessage) {
    return errorMessage;
  }

  registerSuccess(isActivationRequired) {
    return (dispatch) => {
      dispatch(isActivationRequired);

      if (isActivationRequired) {
        this.alt.redirect('/activate');
      } else {
        // user has been automatically logged in
        this.actions.loginSuccess();
      }
    };
  }

  login(email, password) {
    return this.alt.promise(async (resolve) => {
      try {
        await Globals.services.post('login', { email, password, req: this.alt.req, res: this.alt.res });
        this.actions.loginSuccess();
      } catch (err) {
        this.actions.loginError(err.message);
      }
      resolve();
    });
  }

  loginError(errorMessage) {
    return errorMessage;
  }

  loginSuccess() {
    return (dispatch) => {
      dispatch();
      this.alt.redirect('/');
    };
  }

  logout() {
    return this.alt.promise(async (resolve) => {
      try {
        await Globals.services.get('logout', { req: this.alt.req });
        this.dispatch();
        this.alt.redirect('/');
      } catch (err) {
        // no-op
        console.log('logout error', err.message);
      }
      resolve();
    });
  }

}
