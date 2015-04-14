module.exports = {
  displayTestFailure: function(failure){
    return "not ok - " +
      failure.filename + ": " +
      "line " + failure.line + ", " +
      "col " + failure.column + ", " +
      failure.message + "\n";
  }
};
