import Globals from '../core/Globals';

export default class AccountActions {

  fetch() {
    return this.alt.promise(async (resolve) => {
      try {
        const response = await Globals.services.currentUser(this.alt.req);
        this.actions.fetchSuccess(response.user);
      } catch (err) {
        this.actions.fetchError(err.message);
      }
      resolve();
    });
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
        const response = await Globals.services.register(email, password, this.alt.req, this.alt.res);
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
        await Globals.services.login(email, password, this.alt.req, this.alt.res);
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
        await Globals.services.logout(this.alt.req);
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
