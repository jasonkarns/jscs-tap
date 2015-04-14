module.exports = function reporter(errorSets) {
  var testGroups = errorSets.map(TestGroup.fromErrorSet);
  process.stdout.write( testPlan(testGroups) );
  process.stdout.write( testGroups.map(display).join("") );
};

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

function TestFailure(filename, line, column, message){
  this.filename = filename;
  this.line = line;
  this.column = column;
  this.message = message;
}
TestFailure.fromError = function(error){
  return new TestFailure(error.filename, error.line, error.column, error.message);
};
TestFailure.prototype.display = function(template){
  return template.displayTestFailure(this);
};

var TapTemplate = {
  displayTestGroup: function(testGroup){
    return this.displayHeader(testGroup.filename) + testGroup.displayTests(this);
  },
  displayHeader: function(filename){
    return "# " + filename + "\n";
  },
  displayPassed: function(description){
    return "ok - " + description + "\n";
  },
  displayTestFailure: function(failure){
    return "not ok - " +
      failure.filename + ": " +
      "line " + failure.line + ", " +
      "col " + failure.column + ", " +
      failure.message + "\n";
  }
};

function testPlan(testGroups){
  var total = testGroups.reduce(function(tally, group){
    return tally + group.testCount;
  }, 0);

  return "1.." + total + "\n";
}

function display(results){
  return results.display(TapTemplate);
}
