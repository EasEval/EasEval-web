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
        });
};

var sidetall = 1; // hvilket spørsmål brukeren er på i evalueringen
var sideantall = 4;

$(document).ready(function() {
    
    $('#fram').click(function(event) {
      //event.preventDefault(); // no need for this here
        spmFrem();
    });
                              
    $('#tilbake').click(function(event) {
        spmTilbake();
    });

    $('#british').click(function (event) {
        british();
    });
    $('#norway').click(function (event) {
        norway();
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
          };
    });
                                                     
    $('#send').click(function(event) { 
        submitRecord(getUserValues());
    });
});


function spmFrem(){
    if (sidetall === sideantall) {
        $("#send").effect('bounce', {times:2}, 200);
        return;
    }
    else if (sidetall < sideantall) {
            sidetall++;
            $('#sideteller').empty().append('<p> Spørsmål ' + sidetall + ' av ' + sideantall + ' </p>');
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
             $('#sideteller').empty().append('<p> Spørsmål ' + sidetall + ' av ' + sideantall + ' </p>');
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
