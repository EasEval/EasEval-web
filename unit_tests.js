QUnit.test("A basic test example", function(assert){
    var value = "hello";
});

QUnit.test("Initally exists no cookie", function(assert){
});

QUnit.test("Cookie set and read value", function(assert){
    cookieHandler.setCookie('send', 'test123');
    var value = cookieHandler.readCookie('send');
    assert.equal(value, 'test123', "This test might not pass running locally on chrome browser.");
});

    cookieHandler.delCookie('test123');
    value = cookieHandler.readCookie('test123');
});


//QUnit.test("Default slider values", function(assert){
//    values = getUserValues();
//    console.log(values);
//    assert.ok(values[1]==50);
//    assert.ok(values[2]==50);
//    assert.ok(values[3][0]==50);
//    assert.ok(values[3][1]==50);
//});

