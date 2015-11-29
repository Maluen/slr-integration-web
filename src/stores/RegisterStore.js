import Store from './Store';
import ActionTypes from '../constants/ActionTypes';
import Immutable from 'immutable';

class RegisterStore extends Store {

  getDefaultState() {
    return new Immutable.Map({
      email: '',
      password: '',
    });
  }

  getHandlers() {
    return {
      [ActionTypes.REGISTER_UPDATE_EMAIL]: this.handleUpdateEmail,
      [ActionTypes.REGISTER_UPDATE_PASSWORD]: this.handleUpdatePassword,
    };
  }

  handleUpdateEmail(state, action) {
    return state.set('email', action.email);
  }

  handleUpdatePassword(state, action) {
    return state.set('password', action.password);
  }

}

export default RegisterStore;
