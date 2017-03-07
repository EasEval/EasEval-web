QUnit.test("A basic test example", function(assert){
    var value = "hello";
    assert.equal(value, "hello", "Some information can be written here. We expect value to be hello");
});

QUnit.module('Module: Cookie handling');


QUnit.test("Initally exists no cookie", function(assert){
    assert.equal(document.cookie, "" , "It should return the empty string. You might also need to restart browser for a clean test since cookies normally exists until closing of browser unless specificed otherwise");
    assert.equal(cookieHandler.readCookie('send'), "", "cookieHandler readCookie method returns correctly empty string");
}); 

QUnit.test("Cookie set and then read value", function(assert){
    cookieHandler.setCookie('send', 'test123');
    var value = cookieHandler.readCookie('send');
    assert.equal(value, 'test123', "This test might not pass running locally on chrome browser.");
    
    cookieHandler.setCookie('send', 'abc');
    var value2 = cookieHandler.readCookie('send')
    assert.equal(value2, 'abc', "Setting a new value, read");
    assert.equal(value2, 'abc', "reading same value twice");
}); 

QUnit.test("Deletion of a cookie", function(assert){
    cookieHandler.delCookie('test123');
    value = cookieHandler.readCookie('test123');
    assert.equal(value, null, "Should return null to get a cookie that has been deleted");
    cookieHandler.setCookie('Some other cookie');
    assert.equal(value, null, "Cookies live independetly of each other.");
});


QUnit.module('Module: JQuery interraction');

QUnit.test("Navigation", function(assert){
    setup_graphics();
    
    assert.equal(sidetall, 1);
    var bool = $('#question1').is(':hidden');
    assert.equal(bool, false , "");
    var bool2 = $('#question1').is(':visible');
    assert.equal(bool2, true, "")
    
    spmFrem();
    
    assert.equal(sidetall, 2);
    var bool3 = $('#question2').is(':hidden');
    assert.equal(bool3, false);
    var bool4 = $('#question2').is(':visible');
    assert.equal(bool4, true);
    
    // det er noe rart med:hidden selektoren...
    // må undersøkes
    //var hiddenElements = $( "body" ).find( ":hidden" ).not( "script" );
});


