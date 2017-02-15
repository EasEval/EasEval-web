
function send() {
    document.write('Skjemaet ble sendt');
};


$(document).ready(function() {
    $('.radios').click(function(event) {
      event.preventDefault();
      $(this).hide("slower");
    });
});