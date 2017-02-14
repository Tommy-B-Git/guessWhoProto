var allTheCharacters = [];
var theHuman = [];
var theComputer = [];
var humanTempArr = [];
var compTempArr = [];

$(document).ready(function() {

    $.ajaxSetup({
        cache: false,
    });


    // Get JSON and callback so JSON can be stored globally
    $.getJSON('people.json', callback);
    // Populate faces and names in HTML
    function callback(data) {
        /*optional stuff to do after success  */
        var $charNames = $('.char-names');
        var $faceImage = $('.faces');

        $.each(data, function(index, val) {
            console.log("success");
            /* iterate through array or object */
            /* .eq() method constructs new object from one element from set  */
            $charNames.eq(index).text(val.name);
            $faceImage.eq(index).attr('src', val.image);
            //Push all JSON to array
            allTheCharacters.push(val);
        });

    };

    console.log(allTheCharacters);

    // Start button click event
    $('.start-button').on('click', function() {
        pickAPlayer();
        pickComputerPlayer();
    });

    // Reset button click event
    $('.reset-button').on('click', function() {
        resetPlayer();
    });

    // Pick random  H U M A N  player
    function pickAPlayer() {
        //theHuman = [];
        random = Math.floor(Math.random() * allTheCharacters.length);
        // console.log(allTheCharacters[random]);
        player1 = allTheCharacters[random];
        theHuman.push(player1);
        console.log(theHuman);

        $.each(theHuman, function(index, val) {
            /* iterate through array or object */
            console.log(val.image);
            $('img.who-player').attr('src', val.image).css('width', '100px')
                .css('width', '120px')
                .css('height', '160px')
                .css('margin', '4px')
                .css('padding', '0');
        });
    }

    // Pick random  C O M P U T E R  player
    function pickComputerPlayer() {
        //theComputer = [];
        random = Math.floor(Math.random() * allTheCharacters.length);
        // console.log(allTheCharacters[random]);
        comp1 = allTheCharacters[random];
        theComputer.push(comp1);
        console.log(theComputer);
        $('img.who-computer').attr('src', 'img/comp-avatar.jpg')
            .css('width', '120px')
            .css('height', '160px')
            .css('margin', '4px')
            .css('padding', '0');
    }

    // R E S E T  B U T T O N
    function resetPlayer() {
        theHuman = [];
        theComputer = [];
        $('img.who-player, img.who-computer').attr('src', 'img/who-avatar.jpg')
            .css('width', '120px')
            .css('height', '160px')
            .css('margin', '4pxs')
            .css('padding', '0');
        console.log(theHuman);
        console.log(theComputer);
    }



    // I N S T R U C T I O N S  S L I D E Rs
    $('#my-slider').unslider();


    //Get SELECT values
    function grabInputVal() {
        $(".pickAFeatureBtn").on('click', function(e) {
            e.preventDefault();
            //console.log($(".featureList").val());
            var computerHas = ($(".featureList").val());
            theComputer;
            //console.log(theComputer);
            //check theComputer array for computerHas property
            for (var i = 0; i < theComputer.length; i++) {
                //console.log(theComputer[i]);
                // line below check for property val from dropdown against theComputer 
                if (theComputer[i].hasOwnProperty(computerHas) && theComputer[i][computerHas] === true) {
                    var compTempObj = {};
                    // compTempObj.prop = computerHas;
                    compTempObj[computerHas] = theComputer[i][computerHas];
                    compTempArr.push(compTempObj);
                    console.log(compTempArr);
                } else {
                    console.log('Noooooooooo!');
                }
            }

        });
    }

    grabInputVal()


}); //end of document.ready



// Loop scorebpard images
$('td.scoreboard').each(function(i) {
    $(this).css('background-image', 'url(img/score-avatar.jpg)')
        .css('width', '2.6vw')
        .css('height', '4.4vh')
        .css('background-size', 'cover')
        .css('background-position', 'center center')
        .css('padding', '3px');
});
