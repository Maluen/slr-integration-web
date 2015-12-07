import SingletonFactory from '../core/SingletonFactory';
import AccountStore from './AccountStore';

export default class StoreFactory extends SingletonFactory {
  static accountStore() { return this.create(AccountStore); }
}
