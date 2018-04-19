// The function we want to test.
function findSubsetWithTotal(set, total) {
    if (total == 0) return [];
    if (set.length == 0) return false;
    var first = set[0];
    var rest = set.slice(1);
    if (first <= total) {
        var solution1 = findSubsetWithTotal(rest, total - first);
        if (solution1) {
            solution1.push(first);
            return solution1;
        }
    }
    return findSubsetWithTotal(rest, total);
}

// A function to verify a solution to the knapsack problem.
function verify(set, subset, total) {
    var sum = 0;
    for(var i = 0; i < subset.length; i++) {
        if (!set.includes(subset[i])) return false;
        sum += subset[i];
    }
    return sum == total;
}

// A test case, which checks the result of the function above with the verify function.
// If we pass true as expected, we expect a solution to be found.
function testCase(set, total, expected) {
    var result = findSubsetWithTotal(set, total);

    if (result) {
        if (!verify(set, result, total)) {
            console.log("Failed with set", set, "total", total, "got", result);
            throw "Failed";
        }
    } else {
        if (expected) {
            console.log("Failed to find solution for set", set, "total", total);
            throw "Failed";
        }
    }
    console.log("With set", set, "total", total, "got", result);
}

// Check a test case we wrote ourselves
testCase([10,20,30,40,50], 100, true);

// Some utility functions
function rand(max) {
    return Math.floor(Math.random() * max);
}

function randSet(count, max) {
    if (count == 0) return [];
    var result = randSet(count - 1, max);
    result.push(rand(max));
    return result;
}

function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var temp = arr[i];
        var j = rand(i);
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

// Test a random set and see if the subset can be found
function testRandom() {
    var count = rand(10);
    var numbers = randSet(count, 100);
    var target = rand(250);
    testCase(numbers, target, false);
}
for(var i = 0; i < 100; i++) testRandom();

// Test a set constructed to have a solution
function testRandomExpectedToPass() {
    var count = rand(10);
    var numbers = randSet(count, 100);
    var target = numbers.reduce((a, b) => a + b, 0);
    var otherNumbers = randSet(rand(10), 100);
    var allNumbers = numbers.concat(otherNumbers);
    shuffle(allNumbers);
    testCase(allNumbers, target, true);
}

for(var i = 0; i < 100; i++) testRandomExpectedToPass();
