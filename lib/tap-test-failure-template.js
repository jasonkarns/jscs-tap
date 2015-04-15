module.exports = {
  displayTestFailure: function(failure, testPoint){
    return "not ok " + testPoint + " - " +
      failure.filename + ": " +
      "line " + failure.line + ", " +
      "col " + failure.column + ", " +
      failure.message + "\n";
  }
};
