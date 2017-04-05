var Parse = require('parse/node').Parse;
Parse.initialize("asddfkjhg4ey123478wss234q2388dhakjhdgrudb"); Parse.serverURL = 'https://easeval.herokuApp.com/parse';

QUnit.test( "deleteRecordTest", function( assert ) {
    var exerciseName = "Exercise 9";
    var subjectID = "TMA4100";
    var done = assert.async();
    var exercises = Parse.Object.extend("Exercises");
    var secondQuery = new Parse.Query(exercises);
    setTimeout(function(){
        deleteExercise(exerciseName, subjectID).then(function () {
            console.log("Deleting exercise...");
            secondQuery.equalTo("NAME", exerciseName);
            return secondQuery.find()

        }).then(function (users) {
            console.log("Found users: " + users);
            assert.ok(users == "", "Removed exercises 'Exercise 9'");
            done();
        },
        function (error) {
            console.log("Found no users" + error);
            done();
        });
    }, 1000);
});

QUnit.test( "addRecordTest", function( assert ) {
    var done = assert.async();
    var exercises = Parse.Object.extend("Exercises");
    var firstQuery = new Parse.Query(exercises);

    setTimeout(function(){
        firstQuery.count({
            success: function (callback) {
                //console.log("Count of all exercises: " + callback);
                console.log("Test 1");
            }
        }).then(function () {
            var testRecord = ["TMA410009", 10, 10, [10, 10, 10, 10, 10], "Pekka, my man"];
            console.log("Test 2");
            return submitRecord(testRecord);
        }).then(function (callback) {
            var query = new Parse.Query(exercises);
            query.equalTo("NAME", "Exercise 9");
            console.log("Test 3");
            return query.find({
                success: function (exercise) {
                    assert.ok("Exercise 9" == exercise[0].get("NAME"), "Exercise 9 added!");
                    console.log("Test 4");
                    done();
                },
                error: function (error) {
                    console.log("Got error: " + error);
                    done();
                }
            });
        });
    }, 1000);
});