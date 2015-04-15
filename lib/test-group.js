var TestFailure = require('./test-failure');
var TapTestFailureTemplate = require('./tap-test-failure-template');

module.exports = TestGroup;

function TestGroup(filename, failures){
  this.filename = filename;
  this.failures = failures;
  this.testCount = failures.length || 1;
  this.lintFree = !failures.length;
}

TestGroup.fromErrorSet = function(errorSet){
  return new TestGroup(errorSet.getFilename(), errorSet.getErrorList().map(TestFailure.fromError));
};

TestGroup.prototype.display = function(template, testPoint){
  return template.displayTestGroup(this, testPoint);
};

TestGroup.prototype.displayTests = function(template, testPoint){
  if(this.lintFree) {
    return template.displayPassed(this.filename, testPoint);
  } else {
    return this.failures.map(display.bind(null, testPoint)).join("");
  }
};

function display(testPoint, testFailure, index){
  return testFailure.display(TapTestFailureTemplate, testPoint + index);
}
