var entries = require("../Utils/Iterators.es6").entries

class Options {
  setOptions(options){
    var opts = this.options || (this.options = {})
    for(var [name, option] of entries(options)) opts[name] = option
		return this;
	}
}

module.exports = Options
