QUnit.module("Module: Cookie handling");

QUnit.test("Initially exists no cookie. Should fail on multiple attempts", function(assert){
    assert.equal(document.cookie, "" , "It should return the empty string. You might also need to restart browser for a clean test since cookies normally exists until closing of browser unless specificed otherwise"); assert.equal(cookieHandler.readCookie("send"), "", "cookieHandler readCookie method returns correctly empty string");
}); 

QUnit.test("Cookie set and then read value, (might not pass running locally in chrome)", function(assert){
    cookieHandler.delCookie("Some other cookie");
    cookieHandler.setCookie("send", "test123");
    var value = cookieHandler.readCookie("send");
    assert.equal(value, "test123", "This test might not pass running locally on chrome browser due to security policies or something.");
    
    cookieHandler.setCookie("send", "abc");
    var value2 = cookieHandler.readCookie("send")
    assert.equal(value2, "abc", "Setting a new value, read");
    assert.equal(value2, "abc", "reading same value twice");
}); 

QUnit.test("Deletion of a cookie", function(assert){
    cookieHandler.delCookie("test123");
    value = cookieHandler.readCookie("test123");
    assert.equal(value, null, "Should return null to get a cookie that has been deleted");
    cookieHandler.setCookie("Some other cookie", "cookie");
    assert.equal(value, null, "Cookies should live independetly of each other.");
});

QUnit.module("Module: JQuery interraction");

QUnit.test("Testing setup functionality", function(assert){
    setupGraphics();
    userValues = getUserValues();
    assert.equal(userValues[1], 50, "Initially the happy-slider should have a value of 50.")
    assert.equal(userValues[2], 50, "Initially the time-slider should have a value of 50.")
    assert.equal(userValues[3][0], 50, "Initially the resource- sliders should have a value of 50.")
    assert.equal(userValues[3][4], 50, "Same as above. This tests the loop in the setUp func")
    assert.equal(userValues[4], "", "initially no text on final textbox");
});

QUnit.test("Navigate left and right", function(assert){
    jQuery.fx.off = true; // turn off animations because they contribute to delays. 
    
    setupGraphics();
    while (currentPage > 1){
        $("#backButton").trigger("click");
    };
    
    assert.equal(currentPage, 1, "Page should initially be 1");
    assert.equal($("#question1").is(":hidden"), false , "Question 1 should not be hidden on page 1");
    assert.equal($("#question1").is(":visible"), true, "Question 1 should be visible on page 1");
    assert.equal($("#question2").is(":visible"), false, "Question 2 should be hidden on page 1");
    assert.equal($("#question3").is(":visible"), false, "Question 3 should be hidden on page 1");
    assert.equal($("#question4").is(":visible"), false, "Question 4 should be hidden on page 1");
    
    $("#nextButton").trigger("click");
    
    assert.equal(currentPage, 2);
    assert.equal($("#question2").is(":visible"), true, "question 2 is visible on page 2");
    assert.equal($("#question3").is(":visible"), false, "We continue testing like this");
    
    $("#backButton").trigger("click");
    
    assert.ok(currentPage == 1);
    assert.equal($("#question1").is(":visible"), true);
    assert.equal($("#question2").is(":visible"), false);
    
    $(document).trigger($.Event( "keydown", {keyCode: $.ui.keyCode.LEFT}));
    
    assert.ok(currentPage == 1);
    assert.equal($("#question1").is(":visible"), true);
    
    $("#nextButton").trigger("click");
    $("#nextButton").trigger("click");
    
    assert.ok(currentPage == 3);
    assert.equal($("#question3").is(":visible"), true);
    assert.equal($("#question4").is(":visible"), false);
    
    $("#nextButton").trigger("click");
    
    assert.ok(currentPage == 4);
    assert.equal($("#question4").is(":visible"), true);
    
    $(document).trigger($.Event( "keydown", {keyCode: $.ui.keyCode.RIGHT}));
    
    assert.ok(currentPage == 4);
    assert.equal($("#question4").is(":visible"), true);
});

QUnit.test("Keyboard listeners", function(assert){
    jQuery.fx.off = true;
     while (currentPage > 1){
        $("#backButton").trigger("click");
    };
    
    $(document).trigger($.Event("keydown", {keyCode: $.ui.keyCode.RIGHT})); 
    assert.equal(currentPage,2, "Right key triggers next page");
    $(document).trigger($.Event( "keydown", {keyCode: $.ui.keyCode.LEFT}));  
    assert.equal(currentPage,1, "Left key triggers prev page");
});

QUnit.test("Sliders accept correct values", function (assert){
    var testResult = true;
    for (var val = 0; val<101; val++){
        $("#sliderRate" ).slider({value:val});
        if ($("#sliderRate").slider("option", "value") != val){
            testResult = false;
            break;
        } 
    }
    assert.equal(testResult, true, "Values 0-100 should all be fine.");
});

QUnit.test("Show site in different languages", function (assert){
    while (currentPage > 1){
        $("#backButton").trigger("click");
    } 
    $("#norway").trigger("click");
    languageHandler.fillData();
    
    assert.equal($.trim($("#pageNumber").text()), "Spørsmål 1 av 4", "Init value");
    
    $("#british").trigger("click");
    
    assert.equal($.trim($("#pageNumber").text()), "Question 1 of 4", "Question number in english");
    
    $("#nextButton").trigger("click");
    $("#british").trigger("click");
    
    assert.equal($.trim($("#question2 .question").text()), "How much time did you spend on this exercise compared to usual?", "Question 2 in english");
    
    $("#british").trigger("click");
    
    assert.equal($.trim($("#question2 .question").text()), "How much time did you spend on this exercise compared to usual?", "Question 2 still in english");
    
    $("#norway").trigger("click");
    
    assert.equal($.trim($("#question2 .question").text()), "Hvordan var arbeidsmengden sammenlignet med andre øvinger?", "Question 2 in norwegian");
    
    $("#british").trigger("click");
    $("#nextButton").trigger("click");
    $("#nextButton").trigger("click");
    assert.equal($.trim($("#sendButton").text()),"Send", "Send label should not be changed");
    
    $("#norway").trigger("click");
    
    assert.equal($.trim($("#sendButton").text()), "Send", "Send label in norwegian");
    
    $("#finland").trigger("click");
    assert.equal($.trim($("#sendButton").text()), "Lähetä", "Send label in finnish");
    
});


QUnit.test("Change tabs", function (assert){
   $("#informationButton").trigger("click");
    assert.equal($("#evaluationButton").css("opacity") , 0.5, "Disable other tab.");
    assert.equal($("#aboutButton").css("opacity") , 0.5, "Disable other tab#2.");
    assert.equal($("#informationButton").css("opacity") , 1, "Current tab is enabled with CSS styling");
    assert.equal($("#evlaluation").is(":visible"),false, "old content is hidden");
    
    $("#aboutButton").trigger("click");
    assert.equal($("#evlaluation").is(":visible"),false, "old content is still hidden");
    assert.equal($("#evaluationButton").css("opacity") , 0.5, "Disable other tab.");
    
     assert.equal($("#aboutButton").css("opacity") , 1, "correct tab got active."); 
    
    $("#evaluationButton").trigger("click");
    assert.equal($("#evaluationButton").css("opacity") , 1, "Correct tab active.");
});



