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

TestGroup.prototype.display = function(template){
  return template.displayTestGroup(this);
};

TestGroup.prototype.displayTests = function(template){
  if(this.lintFree) {
    return template.displayPassed(this.filename);
  } else {
    return this.failures.map(display).join("");
  }
};

function display(testFailure){
  return testFailure.display(TapTestFailureTemplate);
}
