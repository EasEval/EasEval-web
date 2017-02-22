/**
 * Created by earebnord on 15.02.17.
 */
var Parse = require('parse/node').Parse;
Parse.initialize("asddfkjhg4ey123478wss234q2388dhakjhdgrudb"); Parse.serverURL = 'https://easeval.herokuApp.com/parse';
var strings;
var i;
window.init = function(){
    strings = ["I am a text element"];
    i = 1;
};
window.testFunksjon = function() {
    if (i == 1){
        var nameValue2 = document.getElementById("uniqueID").value;
        strings.push(nameValue2);
    }

    console.log(strings[i % 2], i);
    document.getElementById("textelement").innerHTML = strings[i % 2];
    document.getElementById("minCounter").innerHTML="Du har klikket ".concat(i, " ganger");
    i++;
};
window.submitRecord = function (username, subjectID, name, record) {
    var exercise = Parse.Object.extend("Exercises");

    //Registrerer ny record med username, subjectID, name (exercise#), record

    var evaluation = new exercise();
    evaluation.set("username", username);
    evaluation.set("subjectID", subjectID);
    evaluation.set("NAME", name);
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