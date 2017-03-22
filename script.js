function setup_graphics() {
    $( function() {
        // setup initial graphics with sliders and visibility
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
        $("#slider_rangering").slider({value:50});
        $("#slider_tidsbruk").slider({value:50});
        $("#question2").hide();
        $("#question3").hide();
        $("#question4").hide();
        $("#label1 p").hide();
        $("#label2 p").hide();
        $("#label3 p").hide();
        $("#label4 p").hide();
        $("#label5 p").hide();
        $("#information").hide();
        $("#about").hide();
        });
}

var totalPages = 4;
var currentPage = 1; 
var norwegianLanguage = true;
var currentView = "#evaluation";
// Currently 2 languages, can be expanded with some changes

$(document).ready(function() {
    // the following subfunctions can be triggered whenever DOM is ready to be manipulated
    $("#fram").click(function(event) {
        nextPage();
    });
                              
    $("#tilbake").click(function(event) {
        prevPage();
    });

    $("#british").click(function (event) {
        setEnglish();
    });
    $("#norway").click(function (event) {
        setNorwegian();
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
    $("#icon1").mouseover(function(){$("#label1 p").show()}).mouseout(function(){$("#label1 p").hide()});
    $("#icon2").mouseover(function(){$("#label2 p").show()}).mouseout(function(){$("#label2 p").hide()});
    $("#icon3").mouseover(function(){$("#label3 p").show()}).mouseout(function(){$("#label3 p").hide()});
    $("#icon4").mouseover(function(){$("#label4 p").show()}).mouseout(function(){$("#label4 p").hide()});
    $("#icon5").mouseover(function(){$("#label5 p").show()}).mouseout(function(){$("#label5 p").hide()});
    // listener on keyboard, left and right key                    
    $(document).on("keydown", function(event) {
        switch(event.keyCode) {
            case $.ui.keyCode.LEFT:
                prevPage();
                break;
            case $.ui.keyCode.RIGHT:
                nextPage();
                break;
          }
    });
                                                     
   $("#send").click(function(event) { 
        if (cookieHandler.readCookie("send")!== "false"){
            cookieHandler.delCookie("send");
            cookieHandler.setCookie("send", false, 10);
            // currently restricted from sending every 10 sec
            console.log("Du sendte.")
        }
        window.submitRecord(getUserValues());
    });
});

function nextPage(){
    // this function increments page if possible
    if (currentPage == totalPages) {
        $("#send").effect("bounce", {times:2}, 200);
        return;
    }
    else if (currentPage<totalPages) {
        currentPage++;
        languageHandler.changeQuestionNumber();
    }
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
    if (currentPage == 1) {
        $("#sideteller").effect("bounce", {times:2}, 200);
        return;
    }
    else if (currentPage > 1) {
        currentPage--;
        languageHandler.changeQuestionNumber();
    }
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
    norwegianLanguage = false;
    languageHandler.setEnglish();
    changeLanguageCSS("british");
}

function setNorwegian() {
    norwegianLanguage = true;
    languageHandler.setNorwegian();
    changeLanguageCSS("norway");
}

function changeLanguageCSS(language){
    $("#"+language + " img").css({opacity: 1});
    $("#"+language).css("border-color", "#627898");
    if (language == "british"){
        $("#norway img").css({opacity: 0.3});
        $("#norway").css("border-color", "#CFD1CD");
    } else {
        $("#british img").css({opacity: 0.3});
        $("#british").css("border-color", "#CFD1CD");
    }
}

function getUserValues(){
    // q is abbreviation for question and s for slider
    var subjectCode = parent.window.location.href.substring(37,46);
    var q1 = $("#slider_rangering").slider("option", "value");
    var q2 = $("#slider_tidsbruk").slider("option", "value");
    var q3s1 = $("#s1").slider("option", "value");
    var q3s2 = $("#s2").slider("option", "value");
    var q3s3 = $("#s3").slider("option", "value");
    var q3s4 = $("#s4").slider("option", "value");
    var q3s5 = $("#s5").slider("option", "value");
    var text = document.getElementById("tilbakemelding").value;
    return [subjectCode, q1, q2, [q3s1,q3s2,q3s3,q3s4,q3s5],text];
}
