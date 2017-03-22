var Parse = require('parse/node').Parse;
Parse.initialize("asddfkjhg4ey123478wss234q2388dhakjhdgrudb"); Parse.serverURL = 'https://easeval.herokuApp.com/parse';

QUnit.test( "deleteRecordTest", function( assert ) {
    var oName = "Øving YO";
    var sID = "TMA4100";
    var done = assert.async();
    var ovinger = Parse.Object.extend("Exercises");
    var secondQuery = new Parse.Query(ovinger);
    setTimeout(function(){
        deleteExercise(oName, sID).then(function () {
            console.log("Sletter øving...");
            secondQuery.equalTo("NAME", oName);
            //secondQuery.equalTo("SUBJECTID", sID);
            return secondQuery.find()

        }).then(function (users) {
            console.log("Fant brukere: " + users);
            assert.ok(users == "", "Removed exercises 'Øving YO'");
            done();
        },
        function (error) {
            console.log("Fant ingen brukere" + error);
            done();
        });
    }, 1000);
});

QUnit.test( "addRecordTest", function( assert ) {
    var done = assert.async();
    var ovinger = Parse.Object.extend("Exercises");
    var firstQuery = new Parse.Query(ovinger);

    setTimeout(function(){
        firstQuery.count({
            success: function (callback) {
                //console.log("Count av alle exercises: " + callback);
            }
        }).then(function () {
            var testRecord = ["TMA4100YO", 10, 10, [10, 10, 10, 10], "hei"];
            //console.log("Kjører submitRecords()");
            return submitRecord(testRecord);
        }).then(function (callback) {
            var query = new Parse.Query(ovinger);
            query.equalTo("NAME", "Øving YO");
            //console.log("Returnert fra submitRecords(): " + callback);
            return query.find({
                success: function (exercise) {
                    assert.ok("Øving YO" == exercise[0].get("NAME"), "Øving YO added!");
                    done();
                },
                error: function (error) {
                    console.log("Fikk feilmelding: " + error);
                    done()
                }
            });
        });
    }, 1000);
});