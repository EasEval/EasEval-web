
function setup_graphic() {
     $( function() {
            // setup graphic EQ
            $( "#eq2 > span" ).each(function() {
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
      $("#eq2").hide();
      } );
};


$(document).ready(function() {;
    $('#fram').click(function(event) {
      event.preventDefault();
      $('#eq').hide("fast");
        $('#eq2').show("fast");
        // null som parameter for å fjerne animasjon
    });
                              
    $('#tilbake').click(function(event) {
      event.preventDefault();
      $('#eq2').hide("fast");
        $('#eq').show("fast");
    });
});

