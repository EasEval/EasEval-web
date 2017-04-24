var languageHandler = {
    norDict: {}, //jquery-selector as key and text as data
    engDict: {},
    finDict: {},
     /*kind of dictionary like, some people call them associative arrays, but really they are just objects with hashing */

    setFinnish : function(){
        $("#question4 p").empty();
        for (var key in this.finDict){
            var text = this.finDict[key];
            $(key).empty().append(text);
        };
        this.changeQuestionNumber();
        this.setFinalText();
        $("#question4 textarea").attr("placeholder", "Jos sinulla on ajatuksia harjoituksesta, ole hyvä ja kirjoita ne tähän!");
    },
    
    setNorwegian : function(){
        $("#question4 p").empty();
        for (var key in this.norDict){
            var text = this.norDict[key];
            $(key).empty().append(text);
        };
        this.changeQuestionNumber();
        this.setFinalText();
        $("#question4 textarea").attr("placeholder", "Skriv gjerne en tilbakemelding her, om du har noen tanker rundt øvingen!");
    },
    
    setEnglish: function(){
        $("#question4 p").empty();
        for (var key in this.engDict){
            var text = this.engDict[key];
            $(key).empty().append(text);
        };
        this.changeQuestionNumber();
        this.setFinalText();
        $("#question4 textarea").attr("placeholder", "If you have some thoughts about the exercise, please write them here!");
    },
    
    changeQuestionNumber: function(){
      if (currentLanguage == "norwegian"){
          $("#pageNumber").empty().append("<p> Spørsmål " + currentPage + " av " + totalPages + " </p>");
      } else if (currentLanguage == "british") {
          $("#pageNumber").empty().append("<p> Question " + currentPage + " of " + totalPages + " </p>");
      } else{
          $("#pageNumber").empty().append("<p> Kysymys " + currentPage + " sta " + totalPages + " </p>");
      };
    },
    
    setSendError: function() {
        if (currentLanguage == "norwegian"){
            $("#finalMsg").empty().append("<p>Noe gikk galt med innsendingen av skjemaet. Sjekk internetforbinelsen din. Kontakt oss hvis problemet likevel skulle vedvare. </p>");
        } else if (currentLanguage == "british") {
            $("#finalMsg").empty().append("<p>Something went wrong with the process of sending. Check your internet connection and contanct us if the problem persists. </p>");
        } else{
             $("#finalMsg").empty().append("<p>Jokin meni vikaan lähetyksen. Tarkista Internet-yhteys. Ota yhteyttä, jos ongelma ei ratkea. </p>");
        }; 
        $("#finalMsg p").css("color", "red");
    },
    
    setAlreadySent: function(){
        if (currentLanguage == "norwegian"){
            $("#finalMsg").empty().append("<p>Du har allerede levert en evaluering for denne øvingen. </p>");
        } else if (currentLanguage == "british") {
            $("#finalMsg").empty().append("<p>You have already delivered an evaluation for this exercise. </p>");
        } else{
             $("#finalMsg").empty().append("<p> Olet jo antanut tätä. </p>");
        };
        $("#finalMsg p").css("color", "red");
    },
    
    setFinalText: function(){
        if (sentEval){
          if (currentLanguage == "norwegian"){
              $("#finalMsg").empty().append("<p>Tusen takk!</p><p>Dine svar vil bli til stor hjelp.</p>");
          } else if (currentLanguage == "british") {
              $("#finalMsg").empty().append("<p>Thank you!</p><p>Your answers will help a lot.</p>");
          } else {
              $("#finalMsg").empty().append("<p>Kiitos!</p><p>Vastauksesi auttavat paljon.</p>");
          };
      } else {
         if (currentLanguage == "norwegian") {
             $("#finalMsg").empty().append("<p>Skjemaet er klart til å sendes.</p>");
         } else if (currentLanguage == "british"){
             $("#finalMsg").empty().append("<p>You may now submit your evaluation.</p>");
         } else {
            $("#finalMsg").empty().append("<p>Voit nyt lähettää arviointisi.</p>");
         };
      };  
    },
        
    fillData: function(){
        // this function fills up the dicts with language-data
        this.norDict["#question1 .question"] = "<p>Hvor mye følte du at du lærte ved denne øvingen?</p>";
        this.norDict["#question2 .question"] = "<p>Hvordan var arbeidsmengden sammenlignet med andre øvinger?</p>";
        this.norDict["#question3 .question"] = "<p>Hvordan vil du veie tidsforbruken av de ulike ressursene opp mot hverandre?</p>";
        this.norDict["#question4 #sendButton"] = "<p>Send</p>";
        this.norDict["#evaluationButton p"] = "<p>Evaluering</p>";
        this.norDict["#informationButton p"] = "<p>Informasjon</p>";
        this.norDict["#aboutButton p"] = "<p>Om oss</p>";
        this.norDict["#question1 .lilSpent"] = "<p> Veldig lite </p>";
        this.norDict["#question1 .muchSpent"] = "<p> Veldig mye </p>";
        this.norDict["#question2 .lilSpent"] = "<p> Veldig liten </p>";
        this.norDict["#question2 .muchSpent"] = "<p> Veldig stor </p>";
        this.norDict["#leftDescription"] = "<p>Mye brukt</p> <p>Lite brukt</p> ";
        this.norDict["#rightDescription"] = "<p>Mye brukt</p> <p>Lite brukt</p> ";
        this.norDict["#lectureLabel p"] = "<p>forelesning</p>";
        this.norDict["#internetLabel p"] = "<p>internett</p>";
        this.norDict["#copyLabel p"] = "<p>kok/kopiering</p>";
        this.norDict["#textbookLabel p"] = "<p>pensumbøker</p>";
        this.norDict["#otherLabel p"] = "<p>annet</p>";
        this.norDict["#information"] = "<p>EasEval er en applikasjon der du som student skal gi tilbakemelding på øvingene dine. Målet er å synliggjøre studentenes læringsprossess og at fagansvarlige skal få representativ feedback fra alle som gjennomgår øvingsopplegget. Din ærlige tilbakemelding er viktig. </p>"+
        "<p> Naviger deg gjennom de fire sidene og trykk send når du er ferdig. Tips: Du kan raskt navigere deg frem og tilbake med venstre og høyre piltast! </p>"+
        "<p> Du er helt anonym i alle evalueringene dine. Denne nettsiden bruker cookies, men dette er kun for å hindre at du svarer på samme skjema flere ganger. </p>"+
        "<p> På spørsmål der det er flere slidere (spm. 3), vil resultatene bli kalkulert relativt til hverandre. Hvis du for eksempel gir full score til alle 5 slidere, vil hver av dem få en prosentvis tildeling på 20%. </p>"+
        "<p> Vi ønsker ikke at det å svare på skjemaet skal være en tidkrevende og smertefull rutine for deg. Dersom du har noen tilbakemeldinger på hvordan vi kan forbedre brukeropplevelsen, kontakt oss på <i> petersal (at) stud.ntnu.no </i>! </p>"
        this.norDict["#about"]="<p>EasEval er utviklet som del av et skoleprosjekt i faget Programvareutviling på NTNU. Tema for dette året er å lage en bot som bidrar til å løse problemer med utdanningen på universitetet. Vår bot genererer nyttig og visuelt appellerende statistikk basert på studenters tilbakemelding etter hver øving.</p>"+
        "<p> Statistikken finner du i en app på iOS under navnet EasEval. Den er i utgangspunktet tiltenkt for fagstaben. </p>"+
        "<p> Utviklerne går alle i 2. klasse datateknologi: August Lund Eilertsen, Eivind Aksnes Rebnord, Simen Ullern og Peter Salvesen.</p>"+
        "<p> All kildekode for EasEval ligger fritt ute på <a href='https://www.github.com/EasEval' target='_blank'>Github</a>.</p>"+
        "<p> Kontakt oss på<i> petersal (at) stud.ntnu.no </i>hvis du lurer på noe! </p>";
        
        
        this.engDict["#question1 .question"] = "<p>How much did you learn from this exercise?</p>";
        this.engDict["#question2 .question"] = "<p>How much time did you spend on this exercise compared to usual?</p>";
        this.engDict["#question3 .question"] = "<p>How will you rate the time-usage of these resources compared to each other?</p>";
        this.engDict["#question4 #sendButton"] = "<p>Send</p>";
        this.engDict["#evaluationButton p"] = "<p>Evaluation</p>";
        this.engDict["#informationButton p"] = "<p>Information</p>";
        this.engDict["#aboutButton p"] = "<p>About</p>";
        this.engDict["#question1 .lilSpent"] = "<p> Very little </p>";
        this.engDict["#question1 .muchSpent"] = "<p> Very much </p>";
        this.engDict["#question2 .lilSpent"] = "<p> A lot less </p>";
        this.engDict["#question2 .muchSpent"] = "<p> A lot more </p>";
        this.engDict["#leftDescription"] = "<p>Used a lot</p> <p>Not used </p>";
        this.engDict["#rightDescription"] = "<p>Used a lot</p> <p>Not used </p>";
        this.engDict["#lectureLabel p"] = "<p>lecture</p>";
        this.engDict["#internetLabel p"] = "<p>internet</p>";
        this.engDict["#copyLabel p"] = "<p>copying</p>";
        this.engDict["#textbookLabel p"] = "<p>textbook</p>";
        this.engDict["#otherLabel p"] = "<p>other</p>";
        this.engDict["#information"] = "<p>EasEval is an application where you as a student can evaluate your given exercises. The goal is to increase the transparency of how students learn and solve their problems, as well as giving the teaching staff useful and relevant feedback. Your honest opinion is important. </p>"+
        "<p> Navigate your way through the four pages and press send when your are done. Tip: You can easily navigate back and forth by using the left and right arrow key! </p>"+
        "<p> You are fully anonymous in all your evaluations. This website uses cookies, but this is only to prevent you from submitting more than one form for a particular exercise. </p>"+
        "<p> On questions where there are multiple sliders (question 3), the result will be calculated relatively to the other sliders. If you for example give full score to all 5 sliders, each of them will get a percentage-based amount of 20%. </p>"+
        "<p> We do not wish that filling out this form becomes a painful routine for you. If you have feedback on how we can improve, do not hesitate to contact us at <i> petersal (at) stud.ntnu.no </i>! </p>"
        this.engDict["#about"]="<p>EasEval has been developed as a part of a school project in Software Engineering at NTNU, Trondheim. This years theme is to make a bot that seeks to enchance the learning experience at universities. Our bot generates useful and appealing statistics based on the students feedback after each exercise.</p>"+
        "<p> The statistics is available in an app on iOS under the name EasEval. It is intended mainly for the teaching staff. </p>"+
        "<p> The developers are all second year computer science students: August Lund Eilertsen, Eivind Aksnes Rebnord, Simen Ullern and Peter Salvesen.</p>"+
        "<p> All source code for EasEval is openly available at <a href='https://www.github.com/EasEval' target='_blank'>Github</a>.</p>"+
        "<p> Contact us at <i> petersal (at) stud.ntnu.no </i>if you have any questions! </p>";
        
        this.finDict["#question1 .question"] = "<p>Kuinka paljon opit tästä harjoituksesta?</p>";
        this.finDict["#question2 .question"] = "<p>Kuinka paljon aikaa käytit tähän harjoitukseen tavalliseen verrattuna?</p>";
        this.finDict["#question3 .question"] = "<p>Kuinka arvioisit näiden resurssien ajankäytön verrattuna toisiinsa?</p>";
        this.finDict["#question4 #sendButton"] = "<p>Lähetä</p>";
        this.finDict["#evaluationButton p"] = "<p>Arviointi</p>";
        this.finDict["#informationButton p"] = "<p>Tieto</p>";
        this.finDict["#aboutButton p"] = "<p>Noin</p>";
        this.finDict["#question1 .lilSpent"] = "<p> Erittäin vähän </p>";
        this.finDict["#question1 .muchSpent"] = "<p> Erittäin paljon </p>";
        this.finDict["#question2 .lilSpent"] = "<p> Paljon vähemmän </p>";
        this.finDict["#question2 .muchSpent"] = "<p> Paljon enemmän </p>";
        this.finDict["#leftDescription"] = "<p>Käytetty paljon</p> <p>Ei käytetty </p>";
        this.finDict["#rightDescription"] = "<p>Käytetty paljon</p> <p>Ei käytetty </p>";
        this.finDict["#lectureLabel p"] = "<p>luento</p>";
        this.finDict["#internetLabel p"] = "<p>internet</p>";
        this.finDict["#copyLabel p"] = "<p>kopiointi</p>";
        this.finDict["#textbookLabel p"] = "<p>tekstikirja</p>";
        this.finDict["#otherLabel p"] = "<p>muu</p>";
        this.finDict["#information"] = "<p> EasEval on sovellus, jossa voit opiskelijana arvioida omia harjoituksiasi. Tavoitteena on lisätä opiskelijoiden oppimisen ja ongelmanratkaisun läpinäkyvyyttä sekä antaa opetushenkilökunnalle hyödyllistä ja asiaankuuluvaa palautetta. Rehellinen mielipiteesi on tärkeä. . </p>"+
        "<p> Käy läpi 4 sivua ja paina lähetä, kun olet valmis. Vinkki: Voit helposti selata eteen- ja taaksepäin käyttämällä vasenta ja oikeaa nuolinäppäintä!</p>"+
        "<p> Kaikki arviointisi ovat täysin anonyymeja. Tämä nettisivu käyttää evästeitä, mutta vain siksi, että se estää sinua lähettämästä useamman kuin yhden lomakkeen harjoitusta kohden. </p>"+
        "<p> Kysymyksissä, joissa on useita liukusäätimiä (kysymys 3), tulos lasketaan suhteessa muihin liukusäätimiin. Jos esimerkiksi annat kaikille viidelle liukusäätimelle täydet pisteet, jokainen niistä saa prosentteihin perustuvan määrän 20%. </p>"+
        "<p> Emme tahdo, että tämän lomakkeen täyttämisestä tulee sinulle tuskallinen rutiini. Jos haluat antaa palautetta siitä, mitä voisimme tehdä paremmin, älä epäröi ottaa yhteyttä meihin osoitteessa <i> petersal (at) stud.ntnu.no </i>! </p>"
        this.finDict["#about"]="<p>EasEval on kehitetty osana ohjelmistokehityksen opiskeluprojektia Norjan teknis- luonnontieteellisessä yliopistossa, NTNU:ssa, Trondheimissa. Tämän vuoden teemana on tehdä botti, jonka tarkoituksena on parantaa oppimiskokemusta yliopistoissa. Meidän bottimme luo hyödyllisiä ja vetoavia tilastoja, jotka perustuvat oppilaiden jokaisen harjoituksen jälkeen antamaan palautteeseen. </p>"+
        "<p> Tilastot ovat saatavilla EasEval-nimisessä sovelluksessa iOS-käyttöjärjestelmällä. Se on tarkoitettu pääasiassa opetushenkilökunnalle. </p>"+
        "<p> Kaikki kehittäjät ovat toisen vuoden tietojenkäsittelytiede opiskelijoita: August Lund Eilertsen, Eivind Aksnes Rebnord, Simen Ullern ja Peter Salvesen.</p>"+
        "<p> AKaikki EasEvalin lähdekoodit ovat avoimesti saatavilla <a href='https://www.github.com/EasEval' target='_blank'>Github</a>.</p>"+
        "<p> Jos sinulla on kysyttävää, ota meihin yhteyttä osoitteessa <i> petersal (at) stud.ntnu.no </i>! </p>";
    }
 
};