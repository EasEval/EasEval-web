//require("blanket.js");
var Parse = require('parse/node').Parse;
Parse.initialize("asddfkjhg4ey123478wss234q2388dhakjhdgrudb"); Parse.serverURL = 'https://easeval.herokuApp.com/parse';

function submitRecord (data) {
    //Instantiating tables where the data is to be put and queried for
    var exercise = Parse.Object.extend("Exercises");
    var fag = Parse.Object.extend("Subjects");
    var record = formatData(data);
    
    var query = new Parse.Query(fag);
    query.equalTo("ID", "TMA4100");

    return query.find({
        success: function (pointers) {
            //console.log("Found object pointer: " + pointers[0]);
        }
    }).then(function (pointers) {

        //Processing of url when running from folk.ntnu
        var len = record[0].length;
        var subjectName = record[0].substring(0, len - 2);
        var exerciseName = "E" + record[0].substring(len - 2, len);

        var subjectPointer = pointers[0];
        var evaluation = new exercise();
        evaluation.set("SUBJECTID", subjectName);
        evaluation.set("SUBJECT", subjectPointer);  //Sending the Subjects object as a pointer
        evaluation.set("NAME", exerciseName);
        evaluation.set("rating", record[1]);
        evaluation.set("time", record[2]);
        evaluation.set("lectureAmount", record[3][0]);
        evaluation.set("curriculumAmount", record[3][1]);
        evaluation.set("googleAmount", record[3][2]);
        evaluation.set("solutionsAmount", record[3][3]);
        evaluation.set("comment", record[4]);
        evaluation.set("otherAmount", record[3][4]);
        return evaluation.save();
    }).then(function (result) {
        return Promise.resolve(true);
    }, function (error) {
        return Promise.reject(false);
    });
};

window.deleteExercise = function (name, subjectid) {
    var exercise = Parse.Object.extend("Exercises");
    var query = new Parse.Query(exercise);
    query.equalTo("NAME", name);
    return query.find({
    }).then( function (users) {
        return Parse.Object.destroyAll(users);
    }).then( function(result){
        return result;
    }, function(error){
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