var iterators = require("../Utils/Iterators.es6"),
    entries = iterators.entries,
    values =  iterators.values

var getEventMap = function(){
      return this.$events || (this.$events = {})
    },
    getEvents = function(type){
      var eventMap = getEventMap.call(this)
      return eventMap[type] || (eventMap[type] = [])
    }

module.exports = {
  addEvent(type, fn){
    var events = getEvents.call(this, type)
    events.push(fn)
    return this
  },
  addEvents(events){
    for(var [name, event] of entries(events))
      this.addEvent(name, events[name])
    return this
  },
  fireEvent(type, args, delay){
    var events = getEvents.call(this, type)
    if (!events) return this;
    for (var fn of values(events)) {
      if (delay) setTimeout(function(){
        fn.apply(this, args)
      }, delay)
      else fn.apply(this, args);
    }
    return this;
  },
  removeEvent(type, fn){
    var events = getEvents.call(this, type)
    var index =  events.indexOf(fn);
    if (index != -1) delete events[index];
    return this;
  },
  removeEvents(events){
    if(!events){
      this.$events = {}
      return this
    }
    for(var [name, event] of entries(events))
      this.removeEvent(name, event)
    return this
  }
}
