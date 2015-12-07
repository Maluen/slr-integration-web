export default class SingletonFactory {

  static create(Class) {
    if (!this._instances) this._instances = {};

    let instance = this._instances[Class];
    if (!instance) {
      instance = this._instances[Class] = new Class();
    }
    return instance;
  }

}
