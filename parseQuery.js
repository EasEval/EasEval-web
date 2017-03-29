//require("blanket.js");
var Parse = require('parse/node').Parse;
Parse.initialize("asddfkjhg4ey123478wss234q2388dhakjhdgrudb"); Parse.serverURL = 'https://easeval.herokuApp.com/parse';

window.submitRecord = function (precord) {
    //Oppretter instanser av tabeller der data skal legges inn ellers spørres etter
    var exercise = Parse.Object.extend("Exercises");
    var fag = Parse.Object.extend("Subjects");
    var record = formatData(precord);

    /*
    Prosessering av url når vi kjører fra folk.ntnu
    var len = record[0].length;
    var fagnavn = record[0].substring(0, len - 2);
    var ovingsnavn = "Øving " + record[0].substring(len - 2, len);
    */

    var query = new Parse.Query(fag);
    query.equalTo("ID", "TMA4100");

    return query.find({
        success: function (pointers) {
            //console.log("Fant objekt-pointer: " + pointers[0]);
        }
    }).then(function (pointers) {
        var subjectPointer = pointers[0];
        var evaluation = new exercise();
        evaluation.set("SUBJECTID", "TMA4100");
        evaluation.set("SUBJECT", subjectPointer);  //Sender videre Subjects-objektet som pointer
        evaluation.set("NAME", "Øving 5");
        evaluation.set("rating", record[1]);
        evaluation.set("time", record[2]);
        evaluation.set("lectureAmount", record[3][0]);
        evaluation.set("curriculumAmount", record[3][1]);
        evaluation.set("googleAmount", record[3][2]);
        evaluation.set("solutionsAmount", record[3][3]);
        evaluation.set("comment", record[4]);
        //console.log("Lagret objekt med navn: " + "Øving " + record[0].substring(len - 2, len));
        return evaluation.save();
    }).then(function (result) {
        //console.log(".save() sitt callback: " + result);
        //response.succes("CHECK");
        return result;
    }, function (error) {
        response.error()
    });
};

window.deleteExercise = function (name, subject) {
    var exercise = Parse.Object.extend("Exercises");
    var query = new Parse.Query(exercise);
    query.equalTo("NAME", name);
    //query.equalTo("SUBJECTID", subject);
    return query.find({

    }).then( function (users) {
        console.log("Fant brukere, prøver å slette disse: " + users);
        return Parse.Object.destroyAll(users);
    }).then( function(result){
        console.log("Klarte å slette disse");
        return result;
    }, function(error){
        console.log("Klarte ikke å slette" + error);
    });
};

function formatData(record){
    var total = 0;
    for(var i = 0; i < record[3].length; i++){
        total += record[3][i];
    }
    for(var j = 0; j < record[3][j]; j++){
        record[3][j] = Math.round(record[3][j]*100/total);
    }
    console.log(record);
    console.log(record[3]);
    return record;
}