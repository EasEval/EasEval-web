var Parse = require('parse/node').Parse;
Parse.initialize("asddfkjhg4ey123478wss234q2388dhakjhdgrudb"); Parse.serverURL = 'https://easeval.herokuApp.com/parse';

window.submitRecord = function (record) {
    var exercise = Parse.Object.extend("Exercises");

    //Registrerer ny record med subjectID, name (exercise#), record

    var evaluation = new exercise();
    evaluation.set("SUBJECTID", "TMA4100");
    evaluation.set("NAME", "testNavn01");
    evaluation.set("rating", record[0]);
    evaluation.set("time", record[1]);
    evaluation.set("lectureAmount", record[2][0]);
    evaluation.set("curriculumAmount", record[2][1]);
    evaluation.set("googleAmount", record[2][2]);
    evaluation.set("solutionsAmount", record[2][3]);
    evaluation.save();

    // Spør etter alle keys kalt item og sletter disse

/*    var query = new Parse.Query(Fag);
    query.equalTo("ID", "Testfag");
    query.find({
        success: function(users) {
            for (var i = 0; i < users.length; ++i) {
                console.log(users[i].get('ID') + ", indeks: " + i + ". Sletter denne!");
                users[i].destroy();
            }
        }
    });*/
};