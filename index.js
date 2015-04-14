var TestGroup = require('./lib/test-group');
var TapTestGroupTemplate = require('./lib/tap-test-group-template');

module.exports = function reporter(errorSets) {
  var testGroups = errorSets.map(TestGroup.fromErrorSet);

  var plan = testPlan(testGroups);
  var results = testGroups.map(display).join("");

  process.stdout.write(plan + results);
};

function testPlan(testGroups){
  var total = testGroups.reduce(function(tally, group){
    return tally + group.testCount;
  }, 0);

  return "1.." + total + "\n";
}

function display(testGroup){
  return testGroup.display(TapTestGroupTemplate);
}
