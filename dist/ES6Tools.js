(function (modules, global) {
    var cache = {}, require = function (id) {
            var module = cache[id];
            if (!module) {
                module = cache[id] = {};
                var exports = module.exports = {};
                modules[id].call(exports, require, module, exports, global);
            }
            return module.exports;
        };
    require('0');
}({
    '0': function (require, module, exports, global) {
        global.ES6Tools = {
            Class: require('1'),
            Events: require('2'),
            Options: require('3'),
            Iterators: require('4')
        };
    },
    '1': function (require, module, exports, global) {
        var extend = function (SuperClass, Class, prototype, members) {
            var descriptors = function (object) {
                var base = {}, descriptor;
                for (var key in object) {
                    descriptor = Object.getOwnPropertyDescriptor(object, key);
                    if (!('get' in descriptor) && !('set' in descriptor)) {
                        descriptor.enumerable = false;
                    }
                    base[key] = descriptor;
                }
                return base;
            };
            if (SuperClass)
                Class.__proto__ = SuperClass;
            Object.defineProperty(Class, 'prototype', { value: Object.create(SuperClass === null ? null : SuperClass.prototype, descriptors(prototype)) });
            Object.defineProperty(Class.prototype, 'constructor', { value: Class });
            if (members)
                Object.defineProperties(Class, descriptors(members));
            return Class;
        };
        var iterators = require('4'), entries = iterators.entries;
        function Class() {
            var proto = Object.getPrototypeOf(Class.prototype);
            if (proto !== null)
                proto.constructor.apply(this, arguments);
        }
        extend(Object, Class, {
            implement: function (methodName, method) {
                this.constructor.prototype[methodName] = method;
                return this;
            },
            implements: function (methods) {
                for (var iterator = entries(methods)['@@iterator'](), step; !(step = iterator.next()).done;) {
                    var arrayPattern = step.value;
                    var name = arrayPattern[0], method = arrayPattern[1];
                    this.constructor.prototype[name] = method;
                }
                return this;
            }
        }, {
            implement: function (methodName, method) {
                this.prototype[methodName] = method;
                return this;
            },
            implements: function (methods) {
                for (var iterator = entries(methods)['@@iterator'](), step; !(step = iterator.next()).done;) {
                    var arrayPattern = step.value;
                    var name = arrayPattern[0], method = arrayPattern[1];
                    this.prototype[name] = method;
                }
                return this;
            }
        });
        module.exports = Class;
    },
    '2': function (require, module, exports, global) {
        var iterators = require('4'), entries = iterators.entries, values = iterators.values;
        var getEventMap = function () {
                return this.$events || (this.$events = {});
            }, getEvents = function (type) {
                var eventMap = getEventMap.call(this);
                return eventMap[type] || (eventMap[type] = []);
            };
        module.exports = {
            addEvent: function (type, fn) {
                var events = getEvents.call(this, type);
                events.push(fn);
                return this;
            },
            addEvents: function (events) {
                for (var iterator = entries(events)['@@iterator'](), step; !(step = iterator.next()).done;) {
                    var arrayPattern = step.value;
                    var name = arrayPattern[0], event = arrayPattern[1];
                    this.addEvent(name, events[name]);
                }
                return this;
            },
            fireEvent: function (type, args, delay) {
                var events = getEvents.call(this, type);
                if (!events) {
                    return this;
                }
                for (var iterator = values(events)['@@iterator'](), step; !(step = iterator.next()).done;) {
                    var fn = step.value;
                    if (delay) {
                        setTimeout(function () {
                            fn.apply(this, args);
                        }, delay);
                    } else {
                        fn.apply(this, args);
                    }
                }
                return this;
            },
            removeEvent: function (type, fn) {
                var events = getEvents.call(this, type);
                var index = events.indexOf(fn);
                if (index != -1) {
                    delete events[index];
                }
                return this;
            },
            removeEvents: function (events) {
                if (!events) {
                    this.$events = {};
                    return this;
                }
                for (var iterator = entries(events)['@@iterator'](), step; !(step = iterator.next()).done;) {
                    var arrayPattern = step.value;
                    var name = arrayPattern[0], event = arrayPattern[1];
                    this.removeEvent(name, event);
                }
                return this;
            }
        };
    },
    '3': function (require, module, exports, global) {
        var extend = function (SuperClass, Class, prototype, members) {
            var descriptors = function (object) {
                var base = {}, descriptor;
                for (var key in object) {
                    descriptor = Object.getOwnPropertyDescriptor(object, key);
                    if (!('get' in descriptor) && !('set' in descriptor)) {
                        descriptor.enumerable = false;
                    }
                    base[key] = descriptor;
                }
                return base;
            };
            if (SuperClass)
                Class.__proto__ = SuperClass;
            Object.defineProperty(Class, 'prototype', { value: Object.create(SuperClass === null ? null : SuperClass.prototype, descriptors(prototype)) });
            Object.defineProperty(Class.prototype, 'constructor', { value: Class });
            if (members)
                Object.defineProperties(Class, descriptors(members));
            return Class;
        };
        var entries = require('4').entries;
        function Options() {
            var proto = Object.getPrototypeOf(Options.prototype);
            if (proto !== null)
                proto.constructor.apply(this, arguments);
        }
        extend(Object, Options, {
            setOptions: function (options) {
                var opts = this.options || (this.options = {});
                for (var iterator = entries(options)['@@iterator'](), step; !(step = iterator.next()).done;) {
                    var arrayPattern = step.value;
                    var name = arrayPattern[0], option = arrayPattern[1];
                    opts[name] = option;
                }
                return this;
            }
        });
        module.exports = Options;
    },
    '4': function (require, module, exports, global) {
        'use strict';
        var iterator = function (next) {
            var it = { next: next };
            it['@@iterator'] = function () {
                return it;
            };
            return it;
        };
        var arrayValuesNext = function (array) {
            var i = 0;
            return function () {
                return i === array.length ? {
                    value: void 0,
                    done: true
                } : {
                    value: array[i++],
                    done: false
                };
            };
        };
        var arrayKeysNext = function (array) {
            var i = 0;
            return function () {
                return i === array.length ? {
                    value: void 0,
                    done: true
                } : {
                    value: i++,
                    done: false
                };
            };
        };
        var arrayEntriesNext = function (array) {
            var i = 0;
            return function () {
                return i === array.length ? {
                    value: void 0,
                    done: true
                } : {
                    value: [
                        i,
                        array[i++]
                    ],
                    done: false
                };
            };
        };
        var objectValuesNext = function (object) {
            var keys = Object.keys(object), i = 0;
            return function () {
                return i === keys.length ? {
                    value: void 0,
                    done: true
                } : {
                    value: object[keys[i++]],
                    done: false
                };
            };
        };
        var objectKeysNext = function (object) {
            var keys = Object.keys(object), i = 0;
            return function () {
                return i === keys.length ? {
                    value: void 0,
                    done: true
                } : {
                    value: keys[i++],
                    done: false
                };
            };
        };
        var objectEntriesNext = function (object) {
            var keys = Object.keys(object), i = 0;
            return function () {
                if (i === keys.length) {
                    return {
                        value: void 0,
                        done: true
                    };
                }
                var key = keys[i++], value = object[key];
                return {
                    value: [
                        key,
                        value
                    ],
                    done: false
                };
            };
        };
        exports.values = function values(object) {
            return iterator(object instanceof Array ? arrayValuesNext(object) : objectValuesNext(object));
        };
        exports.keys = function keys(object) {
            return iterator(object instanceof Array ? arrayKeysNext(object) : objectKeysNext(object));
        };
        exports.entries = function entries(object) {
            return iterator(object instanceof Array ? arrayEntriesNext(object) : objectEntriesNext(object));
        };
    }
}, this));
