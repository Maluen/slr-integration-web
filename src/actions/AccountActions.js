import Globals from '../core/Globals';
import Location from '../core/Location';

class AccountActions {

  fetch(req = null) {
    return this.alt.promise(async (resolve) => {
      try {
        const response = await Globals.services.currentuser(req);
        this.dispatch(response.user);
      } catch (err) {
        // no-op
      }
      resolve();
    });
  }

  updateEmail(email) {
    return email;
  }

  updatePassword(password) {
    return password;
  }

  async register(email, password) {
    try {
      const response = await Globals.services.register(email, password);
      this.actions.registerSuccess(response.isActivationRequired);
    } catch (err) {
      this.actions.registerError(err.response.body.error);
    }
  }

  registerError(errorMessage) {
    return errorMessage;
  }

  registerSuccess(isActivationRequired) {
    return (dispatch) => {
      dispatch(isActivationRequired);

      if (isActivationRequired) {
        Location.push('/activate');
      } else {
        // user has been automatically logged in
        this.actions.loginSuccess();
      }
    };
  }

  async login(email, password) {
    try {
      await Globals.services.login(email, password);
      this.actions.loginSuccess();
    } catch (err) {
      this.actions.loginError(err.response.body.error);
    }
  }

  loginError(errorMessage) {
    return errorMessage;
  }

  loginSuccess() {
    return (dispatch) => {
      dispatch();
      Location.push('/');
    };
  }

  logout() {
    return async (dispatch) => {
      try {
        await Globals.services.logout();
        dispatch();
        Location.push('/');
      } catch (err) {
        // no-op
      }
    };
  }

}

export default AccountActions;

/*
import appDispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/ActionTypes';
import Location from '../core/Location';
import Globals from '../core/Globals';

class AccountActions {

  async init() {
    return new Promise(async (resolve) => {
      try {
        console.log('Action: start');
        const response = await Globals.services.currentuser();
        console.log('Response', response);
        appDispatcher.dispatch({
          type: ActionTypes.ACCOUNT_INIT,
          user: response.user,
          isAuthenticated: true,
        });
        console.log('Action: end');
        resolve();
      } catch (err) {
        // no-op
        console.log('Action: error', err);
        resolve();
      }
    });
  }

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
      const response = await Globals.services.register(email, password);
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
      this.loginSuccess();
    }
  }

  async login(email, password) {
    try {
      await Globals.services.login(email, password);
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
*/
