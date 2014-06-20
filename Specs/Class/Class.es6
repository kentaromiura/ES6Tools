var expect = require('expect.js')
var Class = require('../../Source/Class/Class.es6')

describe('Class', function(){
  describe('static implement', function(){
    class Test extends Class{}
    var test = new Test

    it('must extends the prototype of already instantiated objects', function(){
      expect(test.foo).to.not.be.ok()
      var called = false
      Test.implement('foo', function(){
        called = true
      })
      expect(test.foo).to.be.ok()
      expect(called).to.not.be.ok()
      test.foo()
      expect(called).to.be.ok()
    })
  })

  describe('implement method', function(){
    class Test extends Class{}
    var test = new Test,
        test2 = new Test

    it('must extends the prototype of already instantiated objects', function(){
      expect(test.foo).to.not.be.ok()
      var called = false
      test2.implement('foo', function(){
        called = true
      })
      expect(test.foo).to.be.ok()
      expect(called).to.not.be.ok()
      test.foo()
      expect(called).to.be.ok()
    })
  })

  describe('static implements', function(){
    class Test extends Class{}
    var test = new Test

    it('must extends the prototype of already instantiated objects', function(){
      expect(test.foo).to.not.be.ok()
      var foocalled = false, barcalled = false
      Test.implements({
        'foo': function(){
          foocalled = true
        },
        'bar': function(){
          barcalled = true
        }
      })
      expect(test.foo).to.be.ok()
      expect(foocalled).to.not.be.ok()
      expect(barcalled).to.not.be.ok()
      test.foo()
      expect(foocalled).to.be.ok()
      test.bar()
      expect(barcalled).to.be.ok()

    })
  })
describe('implements method', function(){
    class Test extends Class{}
    var test = new Test,
        test2 = new Test

    it('must extends the prototype of already instantiated objects', function(){
      expect(test.foo).to.not.be.ok()
      var foocalled = false, barcalled = false
      test2.implements({
        'foo': function(){
          foocalled = true
        },
        'bar': function(){
          barcalled = true
        }
      })
      expect(test.foo).to.be.ok()
      expect(foocalled).to.not.be.ok()
      expect(barcalled).to.not.be.ok()
      test.foo()
      expect(foocalled).to.be.ok()
      test.bar()
      expect(barcalled).to.be.ok()

    })
  })
})
