// http://raganwald.com/2015/06/26/decorators-in-es7.html
export default function mixin(behaviour, sharedBehaviour = {}) {
  const instanceKeys = Reflect.ownKeys(behaviour);
  const sharedKeys = Reflect.ownKeys(sharedBehaviour);
  const typeTag = Symbol('isa');

  function _mixin(clazz) {
    for (const property of instanceKeys)
      Object.defineProperty(clazz.prototype, property, {
        value: behaviour[property],
        writable: true,
      });
    Object.defineProperty(clazz.prototype, typeTag, { value: true });
    return clazz;
  }
  for (const property of sharedKeys)
    Object.defineProperty(_mixin, property, {
      value: sharedBehaviour[property],
      enumerable: sharedBehaviour.propertyIsEnumerable(property),
    });
  Object.defineProperty(_mixin, Symbol.hasInstance, {
    value: (i) => !!i[typeTag],
  });
  return _mixin;
}
