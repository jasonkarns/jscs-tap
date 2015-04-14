module.exports = {
  displayTestGroup: function(testGroup){
    return [
      this.displayHeader(testGroup.filename),
      testGroup.displayTests(this)
    ];
  },
  displayHeader: function(filename){
    return "# " + filename;
  },
  displayPassed: function(description){
    return "ok - " + description;
  },
  displayTestFailure: function(failure){
    return "not ok - " + failure.filename + failure.message;
  }
};
