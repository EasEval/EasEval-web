/* this is the main javascript file assosiacted with the EasEval web app. Its functions contain logic for all the dynamic stuff that needs to happen. It delegates work to 1) parseQuery, which handles the backend work. 2) cookieHandler that takes cares of the cookie(s) as well as 3) languageHandler that contains all the language-data and logic related to changing language */

function setup_graphics() {
    $(function() {
        // setup initial graphics with sliders and visibiliy
        $("#question3 > span").each(function() {
            var value = 50;
            $(this).empty().slider({
                value: value,
                //range: "min",
                //animate: true,
                // are these needed?
                orientation: "vertical"
            });
        });
        languageHandler.fillData(); // load language-data
        // our single page app is much about manipulating visibility of different elements in a clever way
        $("#slider_rate").slider({value:50});
        $("#slider_time").slider({value:50});
        $("#question2").hide();
        $("#question3").hide();
        $("#question4").hide();
        $("#professor").hide();
        $("#lectureLabel p").hide();
        $("#internetLabel p").hide();
        $("#copyLabel p").hide();
        $("#textbookLabel p").hide();
        $("#otherLabel p").hide();
        $("#information").hide();
        $("#about").hide();
        $("#backButton").hide();
        });
}

var totalPages = 4;
var currentPage = 1; 
var currentLanguage = "norwegian";
var currentView = "#evaluation";
var sentEval = false;

$(document).ready(function() {
    // the following subfunctions can be triggered whenever DOM is ready to be manipulated by user actions
    $("#nextButton").click(function(event) {
        nextPage();
    });
                              
    $("#backButton").click(function(event) {
        prevPage();
    });

    $("#british").click(function (event) {
        setEnglish();
    });
    $("#norway").click(function (event) {
        setNorwegian();
    });
    $("#finland").click(function (event) {
        setFinnish();
    });
    $("#informationButton").click(function (event) {
        setViewTo("#information");
    });
    $("#aboutButton").click(function (event) {
        setViewTo("#about");
    });
    $("#evaluationButton").click(function (event) {
        setViewTo("#evaluation");
    });
 
    // listener on keyboard, left and right key          
    $(document).on("keydown", function(event) {
        switch(event.keyCode) {
            case $.ui.keyCode.LEFT:
                if(!sentEval && currentPage > 1){
                    prevPage();
                }
                break;
            case $.ui.keyCode.RIGHT:
                if(!sentEval && currentPage < totalPages){
                    nextPage();
                }
                break;
          }
    });
                                                     
   $("#sendButton").click(function(event) { 
        if (cookieHandler.readCookie("send")!== "false"){
            send();
        } else{
            languageHandler.setAlreadySent()
        }
    });
    
    // icons for question 3 have eventHandlers for mouseovers
    $("#icon1").mouseover(function(){$("#lectureLabel p").show()}).mouseout(function(){$("#lectureLabel p").hide()});
    $("#icon2").mouseover(function(){$("#internetLabel p").show()}).mouseout(function(){$("#internetLabel p").hide()});
    $("#icon3").mouseover(function(){$("#copyLabel p").show()}).mouseout(function(){$("#copyLabel p").hide()});
    $("#icon4").mouseover(function(){$("#textbookLabel p").show()}).mouseout(function(){$("#textbookLabel p").hide()});
    $("#icon5").mouseover(function(){$("#otherLabel p").show()}).mouseout(function(){$("#otherLabel p").hide()});
});

function send(){
    cookieHandler.delCookie("send");
    cookieHandler.setCookie("send", false, 10);
    sentEval = true;
    // currently restricted from sending every 10 sec
    console.log("Du sendte.");
    window.submitRecord(getUserValues()).then( function (callback){
        if(callback){
            $("#sendButton").hide();
            $("#textinput").hide();
            $("#nextButton").hide();
            $("#backButton").hide();
            $("#sidePage").hide();
            $("#professor").show();
            $("#finalMsg").css("padding-top", "6vh");
            languageHandler.setFinalText();
        }else{
            languageHandler.setSendError();
        }

        console.log("Worked: " + callback);
    }, function (error){
        languageHandler.setSendError();
        console.log("Error: " + error);
    });

}

function nextPage(){
    // this function increments page if possible
    if (currentPage == (totalPages-1)) {
        $("#nextButton").hide();
    }
    $("#backButton").show();
    currentPage++;
    languageHandler.changeQuestionNumber();
    switch(currentPage){
        case 2:
            $("#question1").hide("fast");
            $("#question2").show("fast");
            break;
        case 3: 
            $("#question2").hide("fast");
            $("#question3").show("fast");
            break;
        case 4:
            $("#question3").hide("fast");
            $("#question4").show("fast");
            break;
    }
}

function prevPage(){
    if (currentPage == 2) {
        $("#backButton").hide();
    }
    $("#nextButton").show();
    currentPage--;
    languageHandler.changeQuestionNumber();
    switch(currentPage){
        case 3:
            $("#question4").hide("fast");
            $("#question3").show("fast");
            break;
        case 2:
            $("#question3").hide("fast");
            $("#question2").show("fast");
            // null som parameter for å fjerne animasjon
            break;
        case 1: 
            $("#question2").hide("fast");
            $("#question1").show("fast");
            break;
    }
}

function setTopIndex(view){
    $("#evaluation").css("z-index",-1);
    $("#information").css("z-index",-1);
    $("#about").css("z-index",-1);
    $(view).css("z-index", 1);
}

function setButtonHighlight(highlightView){
    // show the user what tab is active
    disableButton("#evaluationButton");
    disableButton("#informationButton");
    disableButton("#aboutButton");

    $("#evaluationButton").mouseover(function(){enableButton(this)}).mouseout(function(){disableButton(this)});
    $("#informationButton").mouseover(function(){enableButton(this)}).mouseout(function(){disableButton(this)});
    $("#aboutButton").mouseover(function(){enableButton(this)}).mouseout(function(){disableButton(this)});

    enableButton(highlightView);
    $(highlightView).mouseover(function(){enableButton(this)}).mouseout(function(){enableButton(this)});
    }

function disableButton(button) {
    $(button).css({"text-shadow":"none","background":"none","opacity":"0.5"});
}

function enableButton(button){
    $(button).css({"text-shadow": "0 0 0.5vh #FFFFFF","opacity": "1","background-color": "rgba(255, 255, 255, 0.5)",
        "background": "radial-gradient(rgba(255,255,255,0.3), #664B6A, #664B6A)"});
}

function setViewTo(view){
    // change view with some animation
    if (currentView != view){
        setTopIndex(view);
        setButtonHighlight(view + "Button");
        $("#evaluation").hide("drop", {direction: "up"}, "fast");
        $("#about").hide("drop", {direction: "down"}, "fast");
        if(view == "#evaluation"){
            $("#information").hide("drop", {direction: "down"}, "fast");
        } else{
            $("#information").hide("drop", {direction: "up"}, "fast");
        }
        if (view == "#evaluation" || (currentView == "#about" && view == "#information")){
            $(view).show("drop", {direction: "up"}, "slow");
        } else{
            $(view).show("drop", {direction: "down"}, "slow");
        }
        currentView = view;
    }
}

function setEnglish(){
    currentLanguage = "british";
    languageHandler.setEnglish();
    changeLanguageCSS("british");
}

function setNorwegian() {
    currentLanguage = "norwegian";
    languageHandler.setNorwegian();
    changeLanguageCSS("norway");
}

function setFinnish() {
    currentLanguage = "finnish";
    changeLanguageCSS("finland");
    languageHandler.setFinnish();
}

function changeLanguageCSS(language){
    $("#finland img").css({opacity: 0.3});
    $("#finland").css("border-color", "#CFD1CD");
    $("#norway img").css({opacity: 0.3});
    $("#norway").css("border-color", "#CFD1CD");
    $("#british img").css({opacity: 0.3});
    $("#british").css("border-color", "#CFD1CD");
    $("#"+language + " img").css({opacity: 1});
    $("#"+language).css("border-color", "#627898");
}

function getUserValues(){
    // q is abbreviation for question and s for slider
    var subjectCode = parent.window.location.href.substring(40,49);
    var q1 = $("#slider_rate").slider("option", "value");
    var q2 = $("#slider_time").slider("option", "value");
    var q3s1 = $("#slider1").slider("option", "value");
    var q3s2 = $("#slider2").slider("option", "value");
    var q3s3 = $("#slider3").slider("option", "value");
    var q3s4 = $("#slider4").slider("option", "value");
    var q3s5 = $("#slider5").slider("option", "value");
    var text = document.getElementById("feedback").value;
    return [subjectCode, q1, q2, [q3s1,q3s2,q3s3,q3s4,q3s5],text];
}
