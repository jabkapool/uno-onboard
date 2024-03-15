const sinon = require('sinon')
const chai = require('chai')
const sinonChai = require('sinon-chai')

before(function () {
  chai.use(sinonChai)
})

beforeEach(function () {
  this.sandbox = sinon.sandbox.create()
})

afterEach(function () {
  this.sandbox.restore()
})

// "test": "mocha test",
// "test-unit": "NODE_ENV=test mocha '/**/*.spec.js'"

//"test": "npm run test-unit",
//"test-unit": "NODE_ENV=test mocha --require co-mocha 'webpage/*.spec.js'"