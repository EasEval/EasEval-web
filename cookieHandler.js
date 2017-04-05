var cookieHandler = {
    // this literal notation creates a single cookie object
    
    setCookie : function(name, value, sec) {
        // default behaviour is that the session cookie exists until closure of browser or time expires.
        if (sec) {
            var date = new Date();
            date.setTime(date.getTime() + sec*1000); 
            var expires = "; expires=" + date.toGMTString(); 
        } else {
            var expires = "";
            document.cookie = name+"=" + value+expires + ";path=/";
        };
    },

    readCookie : function(name) {
        if (name !== "send"){
            return null; 
        }
        else {
            var index = document.cookie.indexOf("=");
            value = document.cookie.substr(index+1);
            return value; 
        };
    },

    delCookie : function(name) {
        this.setCookie(name,"",-1);
    }
    
};