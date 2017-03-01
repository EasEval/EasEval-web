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
        $('#send').hide();
        });
};

var sidetall = 1; // hvilket spørsmål brukeren er på i evalueringen

$(document).ready(function() {
    
    $('#fram').click(function(event) {
      //event.preventDefault(); // no need for this here
        spmFrem();
    });
                              
    $('#tilbake').click(function(event) {
        spmTilbake();
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
        document.write(getUserValues());
    });
});


function spmFrem(){
    if (sidetall === 3) {
        $("#send").effect('slide', '');
        return;
    }
    else if (sidetall < 3) {
            sidetall++;
            $('#sideteller').empty().append('<p> Spørsmål ' + sidetall + ' av 3 </p>');
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
            $('#send').fadeIn(2000);
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
             $('#sideteller').empty().append('<p> Spørsmål ' + sidetall + ' av 3 </p>');
        }
    switch(sidetall){
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
    var q1 = $('#slider_rangering').slider("option", "value");
    var q2 = $('#slider_tidsbruk').slider("option", "value");
    var s1 = $('#s1').slider("option", "value");
    var s2 = $('#s2').slider("option", "value");
    var s3 = $('#s3').slider("option", "value");
    var s4 = $('#s4').slider("option", "value");
    var s5 = $('#s5').slider("option", "value");
    return [q1, q2, [s1,s2,s3,s4,s5]]; 
}
