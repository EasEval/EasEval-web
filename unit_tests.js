QUnit.test("A basic test example", function(assert){
    var value = "hello";
    assert.equal(value, "hello", "Some information can be written here. We expect value to be hello");
});

QUnit.test("Initally exists no cookie", function(assert){
    assert.equal(document.cookie, "" , "It should return the empty string. You might also need to restart browser for a clean test since cookies normally exists until closing of browser unless specificed otherwise");
});

QUnit.test("Cookie set and read value", function(assert){
    cookieHandler.setCookie('send', 'test123');
    var value = cookieHandler.readCookie('send');
    assert.equal(value, 'test123', "This test might not pass running locally on chrome browser.");
});

QUnit.test("Deletion of a cookie", function(assert){
    cookieHandler.delCookie('test123');
    value = cookieHandler.readCookie('test123');
    assert.equal(value, null, "Should return null");
});


//QUnit.test("Default slider values", function(assert){
//    values = getUserValues();
//    console.log(values);
//    assert.ok(values[1]==50);
//    assert.ok(values[2]==50);
//    assert.ok(values[3][0]==50);
//    assert.ok(values[3][1]==50);
//});

