
function setup_graphic() {
     $( function() {
            // setup graphic for EQ
            $( "#question2 > span" ).each(function() {
                // read initial values from markup and remove that
                var value = parseInt( $( this ).text(), 10 );
                $( this ).empty().slider({
                    value: value,
                    range: "min",
                    animate: true,
                    orientation: "vertical"
                });
            });
        } );
        $( function() {
            $( "#slider" ).slider();
        } );
    
    $( function() {
      $("#question2").hide();
      } );
};


$(document).ready(function() {;
    $('#fram').click(function(event) {
      //event.preventDefault(); // no need for this
        
      $('#question1').hide("fast");
        $('#question2').show("fast");
        // null som parameter for å fjerne animasjon
        
    });
                              
    $('#tilbake').click(function(event) {
      $('#question2').hide("fast");
        $('#question1').show("fast");
    });
                              
    $('#contact').click(function(event) {
        var q1 = $('#slider').slider("option", "value");
        var s1 = $('#s1').slider("option", "value");
        var s2 = $('#s2').slider("option", "value");
        var s3 = $('#s3').slider("option", "value");
        var s4 = $('#s4').slider("option", "value");
        var s5 = $('#s5').slider("option", "value");
            
        document.write(q1 +" " + s1 + " " + s2
                    + " " +s3 + " "+ s4 + " " + s5);
    });
});


/* Lese verdier, tanke:
    if ($('eq2')is(":visible")) {
        var q1 = $('#slider').slider("option", "value");
        var s1 = $('#s1').slider("option", "value");
        var s2 = $('#s2').slider("option", "value");
        var s3 = $('#s3').slider("option", "value");
        var s4 = $('#s4').slider("option", "value");
        var s5 = $('#s5').slider("option", "value");
            
        document.write(q1, s1, s2, s3, s4, s5);*/

