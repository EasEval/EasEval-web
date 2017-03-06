var cookieHandler = {
    // this literal notation creates a single cookie object
    
    setCookie : function(name, value, sec) {
      if (sec) {
        var date = new Date();
        date.setTime(date.getTime() + sec*1000); 
        var expires = "; expires=" + date.toGMTString(); 
      }
      else
        var expires = "";
      document.cookie = name+"=" + value+expires + ";path=/";
    },

    readCookie : function(name) {
        if (name !== 'send'){
            return null; 
            //not a supported cookie, consider raising an exception
        }
        else {
            var index = document.cookie.indexOf('=');
            value = document.cookie.substr(index+1);
            return value; 
        };
        
        /** This might be useful later if we want multiple cookies.
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        };
        return null; **/
    },

    delCookie : function(name) {
        this.setCookie(name,"",-1);
    }
    
};
