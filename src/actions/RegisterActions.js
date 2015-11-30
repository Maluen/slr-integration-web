import appDispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/ActionTypes';
import http from '../core/HttpClient';

class RegisterActions {

  updateEmail(email) {
    appDispatcher.dispatch({
      type: ActionTypes.REGISTER_UPDATE_EMAIL,
      email: email,
    });
  }

  updatePassword(password) {
    appDispatcher.dispatch({
      type: ActionTypes.REGISTER_UPDATE_PASSWORD,
      password: password,
    });
  }

  async register(email, password) {
    // TODO: url encode?
    try {
      const response = await http.get(`/api/register?email=${email}&password=${password}`);

      // registration success
      alert('registration success');
    } catch (err) {
      // registration failed
      alert('registration failed: ' + err.response.body.error);
    }
  }

}

export default RegisterActions;
