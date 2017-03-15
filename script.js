function setup_graphics() {
    $( function() {
        // setup graphic for EQ
        $("#question3 > span").each(function() {
            var value = 50;
            $(this).empty().slider({
                value: value,
                range: "min",
                animate: true,
                orientation: "vertical"
            });
        });
        $("#slider_rangering" ).slider({value:50});
        $('#slider_tidsbruk').slider({value:50});
        $("#question2").hide();
        $("#question3").hide();
        $("#question4").hide();
        $("#information").hide();
        $("#about").hide();
        });
}

var sidetall = 1; // hvilket spørsmål brukeren er på i evalueringen
var sideantall = 4;
var norsk = true;
var currentView = '#evaluation';
// foreløpig kun 2 språk, må endre funksjonalitet dersom mer 

$(document).ready(function() {
    $('#fram').click(function(event) {
      //event.preventDefault(); // no need for this here
        spmFrem();
    });
                              
    $('#tilbake').click(function(event) {
        spmTilbake();
    });

    $('#british').click(function (event) {
        norsk = false;
        british();
    });
    $('#norway').click(function (event) {
        norsk = true;
        norway();
    });
    $('#informationButton').click(function (event) {
        setViewTo('#information');
    });
    $('#aboutButton').click(function (event) {
        setViewTo('#about');
    });
    $('#evaluationButton').click(function (event) {
        setViewTo('#evaluation');
    });

    // lytter på tastatur med sexy syntax                        
    $(document).on("keydown", function(event) {
        switch(event.keyCode) {
            case $.ui.keyCode.LEFT:
                spmTilbake();
                break;
            case $.ui.keyCode.RIGHT:
                spmFrem();
                break;
          }
    });
                                                     
   $('#send').click(function(event) { 
        if (cookieHandler.readCookie('send')!== "false"){
            cookieHandler.delCookie('send');
            cookieHandler.setCookie('send', false, 10);
        }
        window.submitRecord(getUserValues());
    });
});


function spmFrem(){
    if (sidetall === sideantall) {
        $("#send").effect('bounce', {times:2}, 200);
        return;
    }
    else if (sidetall < sideantall) {
        sidetall++;
        if (norsk){ // kan dette gjøres mer elegant?
            $('#sideteller').empty().append('<p> Spørsmål ' + sidetall + ' av ' + sideantall + ' </p>');
        } else {
             $('#sideteller').empty().append('<p> Question ' + sidetall + ' of ' + sideantall + ' </p>');
        }
    }
    switch(sidetall){
        case 2:
            $('#question1').hide("fast");
            $('#question2').show("fast");
            // null som parameter for å fjerne animasjon
            break;
        case 3: 
            $('#question2').hide("fast");
            $('#question3').show("fast");
            break;
        case 4:
            $('#question3').hide("fast");
            $('#question4').show("fast");
            break;
    }
}

function spmTilbake(){
    if (sidetall === 1) {
        $("#sideteller").effect('bounce', {times:2}, 200);
        return;
    }
    
    else if (sidetall > 1) {
        sidetall--;
        if (norsk){
            $('#sideteller').empty().append('<p> Spørsmål ' + sidetall + ' av ' + sideantall + ' </p>');
        } else {
             $('#sideteller').empty().append('<p> Question ' + sidetall + ' of ' + sideantall + ' </p>');
        }
    }
    switch(sidetall){
        case 3:
            $('#question4').hide("fast");
            $('#question3').show("fast");
            break;
        case 2:
            $('#question3').hide("fast");
            $('#question2').show("fast");
            // null som parameter for å fjerne animasjon
            break;
        case 1: 
            $('#question2').hide("fast");
            $('#question1').show("fast");
            break;
    }
}

function setTopIndex(view){
    $('#evaluation').css('z-index',-1);
    $('#information').css('z-index',-1);
    $('#about').css('z-index',-1);
    $(view).css('z-index', 1);
}

function setButtonHighlight(highlightView){
    disableButton('#evaluationButton');
    disableButton('#informationButton');
    disableButton('#aboutButton');

    $('#evaluationButton').mouseover(function(){enableButton(this)}).mouseout(function(){disableButton(this)});
    $('#informationButton').mouseover(function(){enableButton(this)}).mouseout(function(){disableButton(this)});
    $('#aboutButton').mouseover(function(){enableButton(this)}).mouseout(function(){disableButton(this)});

    enableButton(highlightView);
    $(highlightView).mouseover(function(){enableButton(this)}).mouseout(function(){enableButton(this)});
    }

function disableButton(button) {
    $(button).css({'text-shadow':'none','background':'none','opacity':'0.5'});
}

function enableButton(button){
    $(button).css({'text-shadow': '0 0 0.5vh #FFFFFF','opacity': '1','background-color': 'rgba(255, 255, 255, 0.5)',
        'background': 'radial-gradient(rgba(255,255,255,0.3), #664B6A, #664B6A)'});
}

function setViewTo(view){
    if (currentView != view){
        setTopIndex(view);
        setButtonHighlight(view + "Button");
        $('#evaluation').hide("drop", {direction: "up"}, "fast");
        $('#about').hide("drop", {direction: "down"}, "fast");
        if(view == '#evaluation'){
            $('#information').hide("drop", {direction: "down"}, "fast");
        } else{
            $('#information').hide("drop", {direction: "up"}, "fast");
        }
        if (view == '#evaluation' || (currentView == '#about' && view == '#information')){
            $(view).show("drop", {direction: "up"}, "slow");
        } else{
            $(view).show("drop", {direction: "down"}, "slow");
        }
        currentView = view;
    }
}

function british(){
    $('#norway img').css({opacity: 0.3});
    $('#norway').css('border-color', '#CFD1CD');
    $('#british img').css({opacity: 1});
    $('#british').css('border-color', '#627898');

    $('#sideteller').empty().append('<p> Question ' + sidetall + ' of ' + sideantall + ' </p>');
    $('#question1 p').empty().append('<p>How much did you learn from this exercise?</p>');
    $('#question2 p').empty().append('<p>Relatively, how much time did you use on this exercise?</p>');
    $('#question3 p').empty().append('<p>How will you rate the time-usage compared to each other?</p>');
    $('#question4 p').empty();
    $('#question4 .sporsmal #topP').empty().append('<p>Thank you!</p><p>Your answers will help alot.</p>');
    $('#question4 #send').empty().append('<p>Send!</p>');
    $('#evaluationButton p').empty().append('<p>Evaluation</p>');
    $('#informationButton p').empty().append('<p>Information</p>');
    $('#aboutButton p').empty().append('<p>About</p>');
    $('#question4 textarea').attr("placeholder", "If you have some thoughts about the exercise, please write them here!");
}

function norway() {
    $('#british img').css({opacity: 0.3});
    $('#british').css('border-color', '#CFD1CD');
    $('#norway img').css({opacity: 1});
    $('#norway').css('border-color', '#627898');

    $('#sideteller').empty().append('<p> Spørsmål ' + sidetall + ' av ' + sideantall + ' </p>');
    $('#question1 p').empty().append('<p>Hvor mye følte du at du lærte ved denne øvingen?</p>');
    $('#question2 p').empty().append('<p>Hvor lang tid brukte du sånn omtrentelig?</p>');
    $('#question3 p').empty().append('<p>Hvordan vil du veie tidsforbruken av de ulike ressursene opp mot hverandre?</p>');
    $('#question4 p').empty();
    $('#question4 .sporsmal #topP').empty().append('<p>Tusen takk!</p><p>Dine svar vil bli til stor hjelp.</p>');
    $('#question4 #send').empty().append('<p>Lever!</p>');
    $('#evaluationButton p').empty().append('<p>Evaluering</p>');
    $('#informationButton p').empty().append('<p>Informasjon</p>');
    $('#aboutButton p').empty().append('<p>Om oss</p>');
    $('#question4 textarea').attr("placeholder", "Skriv gjerne en tilbakemelding her, om du har noen tanker rundt øvingen!");
}

function getUserValues(){
    // these should be renamed
    var fagkode = parent.window.location.href.substring(37,46);
    var q1 = $('#slider_rangering').slider("option", "value");
    var q2 = $('#slider_tidsbruk').slider("option", "value");
    var s1 = $('#s1').slider("option", "value");
    var s2 = $('#s2').slider("option", "value");
    var s3 = $('#s3').slider("option", "value");
    var s4 = $('#s4').slider("option", "value");
    var s5 = $('#s5').slider("option", "value");
    var tekst = document.getElementById('tilbakemelding').value;
    return [fagkode, q1, q2, [s1,s2,s3,s4,s5],tekst];
}
