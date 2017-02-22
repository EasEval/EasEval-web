
function setup_graphics() {
     $( function() {
            // setup graphic for EQ
            $( "#question2 > span" ).each(function() {
                var value = 50;
                $(this).empty().slider({
                    value: value,
                    range: "min",
                    animate: true,
                    orientation: "vertical"
                });
            });
        } );
        $( function() {
            $( "#slider" ).slider({value:50});
        } );
    
    $( function() {
      $("#question2").hide();
      } );
};

var sidetall = 1; // hvilket spørsmål brukeren er på i evalueringen

$(document).ready(function() {;
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
                                                     
    $('#contact').click(function(event) { // midlertidig
        document.write(getUserValues());
    });
});


function spmFrem(){
    if (sidetall < 3) {
            sidetall++;
        }
      $('#question1').hide("fast");
        $('#question2').show("fast");
        // null som parameter for å fjerne animasjon
        $('#sideteller').empty().append('<p> Spørsmål ' + sidetall + ' av 3 </p>');
}

function spmTilbake(){
    if (sidetall > 1) {
            sidetall--;
        }
      $('#question2').hide("fast");
        $('#question1').show("fast");
        // null som parameter for å fjerne animasjon
        $('#sideteller').empty().append('<p> Spørsmål ' + sidetall + ' av 3 </p>');
}

function getUserValues(){
    var q1 = $('#slider').slider("option", "value");
    var s1 = $('#s1').slider("option", "value");
    var s2 = $('#s2').slider("option", "value");
    var s3 = $('#s3').slider("option", "value");
    var s4 = $('#s4').slider("option", "value");
    var s5 = $('#s5').slider("option", "value");
    return [q1, [s1,s2,s3,s4,s5]]; 
}
