module.exports = TestFailure;

function TestFailure(filename, line, column, message){
  this.filename = filename;
  this.line = line;
  this.column = column;
  this.message = message;
}

TestFailure.fromError = function(error){
  return new TestFailure(error.filename, error.line, error.column, error.message);
};

TestFailure.prototype.display = function(template, testPoint){
  return template.displayTestFailure(this, testPoint);
};
