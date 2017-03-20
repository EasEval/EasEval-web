var languageHandler = {
    
    norDict: {}, //jquery-selector as key and text as data
    engDict: {}, 
     /*kind of dictionary like, some people call them associative arrays, but really they are just objects with hashing */
    
    setNorwegian : function(){
        $("#question4 p").empty();
        for (var key in this.norDict){
            var text = this.norDict[key];
            $(key).empty().append(text);
        }
        this.changeQuestionNumber();
        $("#question4 textarea").attr("placeholder", "Skriv gjerne en tilbakemelding her, om du har noen tanker rundt øvingen!");
    },
    
    setEnglish: function(){
        $("#question4 p").empty();
        for (var key in this.engDict){
            var text = this.engDict[key];
            $(key).empty().append(text);
        }
        this.changeQuestionNumber();
        $("#question4 textarea").attr("placeholder", "If you have some thoughts about the exercise, please write them here!");
    },
    
    changeQuestionNumber: function(){
      if (norwegianLanguage){
          $("#sideteller").empty().append("<p> Spørsmål " + currentPage + " av " + totalPages + " </p>");
      } else {
          $("#sideteller").empty().append("<p> Question " + currentPage + " of " + totalPages + " </p>");
      }
    },
        
    fillData: function(){
        // this function fills up the dicts with language-data
        this.norDict["#question1 .sporsmal"] = "<p>Hvor mye følte du at du lærte ved denne øvingen?</p>";
        this.norDict["#question2 .sporsmal"] = "<p>Hvordan var arbeidsmengden sammenlignet med andre øvinger?</p>";
        this.norDict["#question3 .sporsmal"] = "<p>Hvordan vil du veie tidsforbruken av de ulike ressursene opp mot hverandre?</p>";
        this.norDict["#question4 .sporsmal #topP"] = "<p>Tusen takk!</p><p>Dine svar vil bli til stor hjelp.</p>";
        this.norDict["#question4 #send"] = "<p>Send</p>";
        this.norDict["#evaluationButton p"] = "<p>Evaluering</p>";
        this.norDict["#informationButton p"] = "<p>Informasjon</p>";
        this.norDict["#aboutButton p"] = "<p>Om oss</p>";
        this.norDict["#question1 .lite"] = "<p> Veldig lite </p>";
        this.norDict["#question1 .mye"] = "<p> Veldig mye </p>";
        this.norDict["#question2 .lite"] = "<p> Veldig liten </p>";
        this.norDict["#question2 .mye"] = "<p> Veldig stor </p>";
        this.norDict["#ml1"] = "<p>Mye brukt <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> Lite brukt </p>";
        this.norDict["#ml2"] = "<p>Mye brukt <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> Lite brukt </p>";
        
        
        this.engDict["#question1 .sporsmal"] = "<p>How much did you learn from this exercise?</p>";
        this.engDict["#question2 .sporsmal"] = "<p>How much time did you spend on this exercise compared to usual?</p>";
        this.engDict["#question3 .sporsmal"] = "<p>How will you rate the time-usage of used resources compared to each other?</p>";
        this.engDict["#question4 .sporsmal #topP"] = "<p>Thank you!</p><p>Your answers will help a lot.</p>";
        this.engDict["#question4 #send"] = "<p>Send</p>";
        this.engDict["#evaluationButton p"] = "<p>Evaluation</p>";
        this.engDict["#informationButton p"] = "<p>Information</p>";
        this.engDict["#aboutButton p"] = "<p>About</p>";
        this.engDict["#question1 .lite"] = "<p> Very little </p>";
        this.engDict["#question1 .mye"] = "<p> Very much </p>";
        this.engDict["#question2 .lite"] = "<p> A lot less </p>";
        this.engDict["#question2 .mye"] = "<p> A lot more </p>";
        this.engDict["#ml1"] = "<p>Used a lot <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> Not used </p>";
        this.engDict["#ml2"] = "<p>Used a lot <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> Not used </p>";
    }
 
}