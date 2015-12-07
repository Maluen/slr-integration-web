import SingletonFactory from '../core/SingletonFactory';
import AccountActions from './AccountActions';

export default class ActionsFactory extends SingletonFactory {
  static accountActions() { return this.create(AccountActions); }
}
