var TestGroup = require('./lib/test-group');
var TapTestGroupTemplate = require('./lib/tap-test-group-template');

module.exports = function reporter(errorSets) {
  var testGroups = errorSets.map(TestGroup.fromErrorSet);

  var results = testGroups.reduce(display, {string:"", tally:0});

  process.stdout.write(tapHeader() + testPlan(results.tally) + results.string);
};

function tapHeader(){
  return "TAP version 13\n";
}

function testPlan(total){
  return "1.." + total + "\n";
}

function display(accumulator, testGroup){
  accumulator.string += testGroup.display(TapTestGroupTemplate, accumulator.tally + 1);
  accumulator.tally += testGroup.testCount;
  return accumulator;
}
