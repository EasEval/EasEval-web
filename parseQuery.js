var Parse = require('parse/node').Parse;
Parse.initialize("asddfkjhg4ey123478wss234q2388dhakjhdgrudb"); Parse.serverURL = 'https://easeval.herokuApp.com/parse';

window.submitRecord = function (record) {
    //Oppretter instanser av tabeller der data skal legges inn ellers spørres etter
    var exercise = Parse.Object.extend("Exercises");
    var fag = Parse.Object.extend("Subjects");

    var query = new Parse.Query(fag);
    query.equalTo("ID", "TMA4100");
    query.find({
        success: function(users) {
            for (var i = 0; i < users.length; ++i) {

                //Lagrer Subjects-pointeren
                var subjectPointer = users[i];
            }
            var evaluation = new exercise();
            evaluation.set("SUBJECTID", "TMA4100");
            evaluation.set("SUBJECT", subjectPointer); //Sender videre Subjects-objektet som pointer
            evaluation.set("NAME", "testNavn01");
            evaluation.set("rating", record[0]);
            evaluation.set("time", record[1]);
            evaluation.set("lectureAmount", record[2][0]);
            evaluation.set("curriculumAmount", record[2][1]);
            evaluation.set("googleAmount", record[2][2]);
            evaluation.set("solutionsAmount", record[2][3]);
            evaluation.save();
        }
    });

    //Prøver Parse.Promise for å ordne asynkrone kall

};