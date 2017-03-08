QUnit.module('Module: Cookie handling');

/*
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
}); */

QUnit.test("Deletion of a cookie", function(assert){
    cookieHandler.delCookie('test123');
    value = cookieHandler.readCookie('test123');
    assert.equal(value, null, "Should return null to get a cookie that has been deleted");
    cookieHandler.setCookie('Some other cookie');
    assert.equal(value, null, "Cookies should live independetly of each other.");
});

QUnit.module('Module: JQuery interraction');

QUnit.test("Testing setup functionality", function(assert){
    setup_graphics();
    userValues = getUserValues();
    assert.equal(userValues[1], 50, "Initially the happy-slider should have a value of 50.")
    assert.equal(userValues[2], 50, "Initially the time-slider should have a value of 50.")
    assert.equal(userValues[3][0], 50, "Initially the resource- sliders should have a value of 50.")
    assert.equal(userValues[3][4], 50, "Same as above. This tests the loop in the setUp func")
    assert.equal(userValues[4], "", "initially no text on final textbox");
});

QUnit.test("Navigate left and right", function(assert){
    jQuery.fx.off = true; // turn off animations because they contribute to delays. 
    
    assert.equal(sidetall, 1, "Page should initially be 1");
    assert.equal($('#question1').is(':hidden'), false , "Question 1 should not be hidden on page 1");
    assert.equal($('#question1').is(':visible'), true, "Question 1 should be visible on page 1");
    assert.equal($('#question2').is(':visible'), false, "Question 2 should be hidden on page 1");
    assert.equal($('#question3').is(':visible'), false, "Question 3 should be hidden on page 1");
    assert.equal($('#question4').is(':visible'), false, "Question 4 should be hidden on page 1");
    
    spmFrem();
    
    assert.equal(sidetall, 2);
    assert.equal($('#question2').is(':hidden'), false, "question 2 is visible on page 2");
    assert.equal($('#question3').is(':visible'), false, "We continue testing like this");
    
    spmTilbake();
    
    assert.ok(sidetall == 1);
    assert.equal($('#question1').is(':visible'), true);
    assert.equal($('#question2').is(':visible'), false);
    
    spmTilbake();
    
    assert.ok(sidetall == 1);
    assert.equal($('#question1').is(':visible'), true);
    
    spmFrem();
    spmFrem();
    
    assert.ok(sidetall == 3);
    assert.equal($('#question3').is(':visible'), true);
    assert.equal($('#question4').is(':visible'), false);
    
    spmFrem();
    
    assert.ok(sidetall == 4);
    assert.equal($('#question4').is(':visible'), true);
    
    spmFrem();
    
    assert.ok(sidetall == 4);
    assert.equal($('#question4').is(':visible'), true);
});

QUnit.test("Keyboard listeners", function(assert){
    for (var side = sideantall; side>1; side--){
        spmTilbake();
    };
    $(document).trigger($.Event( "keydown", {keyCode: $.ui.keyCode.RIGHT})); 
    assert.equal(sidetall,2, "Right key triggers next page");
    $(document).trigger($.Event( "keydown", {keyCode: $.ui.keyCode.LEFT}));  
    assert.equal(sidetall,1, "Left key triggers prev page");
});

QUnit.test("Sliders accept correct values", function (assert){
    var testResult = true;
    for (var val = 0; val<101; val++){
        $("#slider_rangering" ).slider({value:val});
        if ($('#slider_rangering').slider("option", "value") != val){
            testResult = false;
            break;
        } 
    }
    assert.equal(testResult, true, "Values 0-100 should all be fine.");
});
