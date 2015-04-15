module.exports = {
  displayTestGroup: function(testGroup, testPoint){
    return this.displayHeader(testGroup.filename) + testGroup.displayTests(this, testPoint);
  },
  displayHeader: function(filename){
    return "# " + filename + "\n";
  },
  displayPassed: function(description, testPoint){
    return "ok " + testPoint + " - " + description + "\n";
  }
};
