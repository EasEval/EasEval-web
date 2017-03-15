var languageHandler = {
    
    norskBank: {}, //"selector" as key and text as data
    engelskBank: {}, // kind of dictionary like
    // some people call them associative arrays, but in reality they are just objects with hashing
    
    setNorsk : function(){
        $('#question4 p').empty();
        for (var key in this.norskBank){
            var text = this.norskBank[key];
            $(key).empty().append(text);
        }
        $('#sideteller').empty().append('<p> Spørsmål ' + sidetall + ' av ' + sideantall + ' </p>');
        $('#question4 textarea').attr("placeholder", "Skriv gjerne en tilbakemelding her, om du har noen tanker rundt øvingen!");
    },
    
    setEngelsk: function(){
        $('#question4 p').empty();
        for (var key in this.engelskBank){
            var text = this.engelskBank[key];
            $(key).empty().append(text);
        }
        $('#sideteller').empty().append('<p> Question ' + sidetall + ' of ' + sideantall + ' </p>');
        $('#question4 textarea').attr("placeholder", "If you have some thoughts about the exercise, please write them here!");
    },
        
    fillData: function(){
        this.norskBank["#sideteller"] = '<p> Spørsmål ' + sidetall + ' av ' + sideantall + ' </p>';
        this.norskBank["#question1 .sporsmal"] = '<p>Hvor mye følte du at du lærte ved denne øvingen?</p>';
        this.norskBank["#question2 .sporsmal"] = '<p>Hvordan var arbeidsmengden sammenlignet med andre øvinger?</p>';
        this.norskBank["#question3 .sporsmal"] = '<p>Hvordan vil du veie tidsforbruken av de ulike ressursene opp mot hverandre?</p>';
        this.norskBank["#question4 .sporsmal #topP"] = '<p>Tusen takk!</p><p>Dine svar vil bli til stor hjelp.</p>';
        this.norskBank["#question4 #send"] = '<p>Send</p>';
        this.norskBank["#evaluationButton p"] = '<p>Evaluering</p>';
        this.norskBank["#informationButton p"] = '<p>Informasjon</p>';
        this.norskBank["#aboutButton p"] = '<p>Om oss</p>';
        this.norskBank["#question1 .lite"] = '<p> Veldig lite </p>';
        this.norskBank["#question1 .mye"] = '<p> Veldig mye </p>';
        this.norskBank["#question2 .lite"] = '<p> Veldig liten </p>';
        this.norskBank["#question2 .mye"] = '<p> Veldig stor </p>';
        this.norskBank["#ml1"] = '<p>Mye brukt <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> Lite brukt </p>';
        this.norskBank["#ml2"] = '<p>Mye brukt <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> Lite brukt </p>';
        
        
        this.engelskBank["#sideteller"] = '<p> Question ' + sidetall + ' of ' + sideantall + ' </p>';
        this.engelskBank["#question1 .sporsmal"] = '<p>How much did you learn from this exercise?</p>';
        this.engelskBank["#question2 .sporsmal"] = '<p>How much time did you spend on this exercise compared to usual?</p>';
        this.engelskBank["#question3 .sporsmal"] = '<p>How will you rate the time-usage of used resources compared to each other?</p>';
        this.engelskBank["#question4 .sporsmal #topP"] = '<p>Thank you!</p><p>Your answers will help a lot.</p>';
        this.engelskBank["#question4 #send"] = '<p>Send</p>';
        this.engelskBank["#evaluationButton p"] = '<p>Evaluation</p>';
        this.engelskBank["#informationButton p"] = '<p>Information</p>';
        this.engelskBank["#aboutButton p"] = '<p>About</p>';
        this.engelskBank["#question1 .lite"] = '<p> Very little </p>';
        this.engelskBank["#question1 .mye"] = '<p> Very much </p>';
        this.engelskBank["#question2 .lite"] = '<p> A lot less </p>';
        this.engelskBank["#question2 .mye"] = '<p> A lot more </p>';
        this.engelskBank["#ml1"] = '<p>Used a lot <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> Not used </p>';
        this.engelskBank["#ml2"] = '<p>Used a lot <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> Not used </p>';
    }
 
}