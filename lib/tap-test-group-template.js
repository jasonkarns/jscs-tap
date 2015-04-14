module.exports = {
  displayTestGroup: function(testGroup){
    return this.displayHeader(testGroup.filename) + testGroup.displayTests(this);
  },
  displayHeader: function(filename){
    return "# " + filename + "\n";
  },
  displayPassed: function(description){
    return "ok - " + description + "\n";
  }
};
