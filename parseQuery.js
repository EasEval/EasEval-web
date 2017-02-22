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
window.testQuery = function () {
    var Fag = Parse.Object.extend("Subjects");
    var query = new Parse.Query(Fag);
    //query.equalTo("ID", "0");
    query.find({
        success: function(users) {
            for (var i = 0; i < users.length; ++i) {
                console.log(users[i].get('ID'));
            }
        }
    });
};