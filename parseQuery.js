var Parse = require('parse/node').Parse;
Parse.initialize("asddfkjhg4ey123478wss234q2388dhakjhdgrudb"); Parse.serverURL = 'https://easeval.herokuApp.com/parse';

window.submitRecord = function (record) {
    //Oppretter instanser av tabeller der data skal legges inn ellers spørres etter
    var exercise = Parse.Object.extend("Exercises");
    var fag = Parse.Object.extend("Subjects");

    //Prosessering av url når vi kjører fra folk.ntnu
    /*
    var len = record[0].length;
    var fagNavn = record[0].substring(0, len - 2);
    var ovingNavn = "Øving " + record[0].substring(len - 2, len);
    console.log(fagNavn + " har navnet: " + ovingNavn);*/

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
            evaluation.set("SUBJECT", subjectPointer);  //Sender videre Subjects-objektet som pointer
            evaluation.set("NAME", "testNavn01");       //setter øvingsnavnet til testNavn01
            evaluation.set("rating", record[1]);
            evaluation.set("time", record[2]);
            evaluation.set("lectureAmount", record[3][0]);
            evaluation.set("curriculumAmount", record[3][1]);
            evaluation.set("googleAmount", record[3][2]);
            evaluation.set("solutionsAmount", record[3][3]);
            evaluation.set("comment", record[4]);
            evaluation.save();
        }
    });

    //Prøver Parse.Promise for å ordne asynkrone kall

};