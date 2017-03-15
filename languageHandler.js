var languageHandler = {
    
    norskBank: {}, //"selector" as key and text as data
    engelskBank: {}, // kind of dictionary like
    
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
            console.log(key);
            $(key).empty().append(text);
        }
        $('#sideteller').empty().append('<p> Question ' + sidetall + ' of ' + sideantall + ' </p>');
        $('#question4 textarea').attr("placeholder", "If you have some thoughts about the exercise, please write them here!");
    },
        
    fillData: function(){
        this.norskBank["#sideteller"] = '<p> Spørsmål ' + sidetall + ' av ' + sideantall + ' </p>';
        this.norskBank["#question1 p"] = '<p>Hvor mye følte du at du lærte ved denne øvingen?</p>';
        this.norskBank["#question2 p"] = '<p>Hvor lang tid brukte du sånn omtrentelig?</p>';
        this.norskBank["#question3 p"] = '<p>Hvordan vil du veie tidsforbruken av de ulike ressursene opp mot hverandre?</p>';
        this.norskBank["#question4 .sporsmal #topP"] = '<p>Tusen takk!</p><p>Dine svar vil bli til stor hjelp.</p>';
        this.norskBank["#question4 #send"] = '<p>Send!</p>';
        this.norskBank["#evaluationButton p"] = '<p>Evaluering</p>';
        this.norskBank["#informationButton p"] = '<p>Informasjon</p>';
        this.norskBank["#aboutButton p"] = '<p>Om oss</p>';
        
        
        this.engelskBank["#sideteller"] = '<p> Question ' + sidetall + ' of ' + sideantall + ' </p>';
        this.engelskBank["#question1 p"] = '<p>How much did you learn from this exercise?</p>';
        this.engelskBank["#question2 p"] = '<p>Relatively, how much time did you use on this exercise?</p>';
        this.engelskBank["#question3 p"] = '<p>How will you rate the time-usage of used resources compared to each other?</p>';
        this.engelskBank["#question4 .sporsmal #topP"] = '<p>Thank you!</p><p>Your answers will help a lot.</p>';
        this.engelskBank["#question4 #send"] = '<p>Send!</p>';
        this.engelskBank["#evaluationButton p"] = '<p>Evaluation</p>';
        this.engelskBank["#informationButton p"] = '<p>Information</p>';
        this.engelskBank["#aboutButton p"] = '<p>About</p>';
    }
 
}