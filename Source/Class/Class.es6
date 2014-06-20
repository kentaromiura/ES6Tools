var iterators = require("../Utils/Iterators.es6"),
    entries = iterators.entries

class Class {

  implement(methodName, method) {
    this.constructor.prototype[methodName] = method
    return this
  }

  implements(methods) {
    for(var [name, method] of entries(methods))
      this.constructor.prototype[name] = method
    return this
  }
  static implement(methodName, method) {
    this.prototype[methodName] = method
    return this
  }
  static implements(methods) {
    for(var [name, method] of entries(methods))
      this.prototype[name] = method
    return this
  }
}
module.exports = Class
