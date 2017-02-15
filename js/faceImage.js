var allTheCharacters = [];
var theHuman = [];
var theComputer = [];
var humanTempArr = [];
var compTempArr = [];
var guessedCorrectCompProperty = compTempArr[0] || {};
var turn = true;
var messageToPlayer;
var messageToCPU;
var computerHasProperty;
var winner = false;

$(document).ready(function() {

    $.ajaxSetup({
        cache: false,
    });

    // function Person(id, male, female, blackHair, whiteHair, blondeHair,
    //     redHair, purpleHair, blueHair, beard, moustache, glasses, earrings, hat, image) {
    //     this.id = id;
    //     this.male = male;
    //     this.female = female;
    //     this.blackHair = blackHair;
    //     this.whiteHair = whiteHair;
    //     this.blondeHair = blondeHair;
    //     this.redHair = redHair;
    //     this.purpleHair = purpleHair;
    //     this.blueHair = blueHair;
    //     this.beard = beard;
    //     this.moustache = moustache;
    //     this.glasses = glasses;
    //     this.earrings = earrings;
    //     this.hat = hat;
    //     this.image = image;
    // }



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

    //console.log(allTheCharacters);

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
    function grabInputValue() {
        // click event on select submit
        $(".pickAFeatureBtn").on('click', function(e) {
            e.preventDefault();
            player1Turn();
        });
    }
    grabInputValue();

    function player1Turn() {
        // Assign <select> value to var
        var computerHasProperty = ($('.featureList').val());
        theComputer;
        //console.log(theComputer[0].id);
        //check theComputer array for computerHasProperty(select) property
        for (var i = 0; i < theComputer.length; i++) {
            // line below check for property val from dropdown against theComputer 
            if (theComputer[i].hasOwnProperty(computerHasProperty) && theComputer[i][computerHasProperty] === true) {
                guessedCorrectCompProperty[computerHasProperty] = theComputer[i][computerHasProperty];
                if (compTempArr.length === 0)
                    // compTempArr.push(theComputer['id']);
                    compTempArr.push(guessedCorrectCompProperty);
                console.log(compTempArr);
                // Run function to make change images to X versions 
                correctPropertyChoice();
                removeRedundantCharacter();
            } else {
                // Run function to make computer guess 
                console.log('Noooooooooo!');
                wrongPropertyChoice();

            }
        }
    };

    function correctPropertyChoice() {
        var computerHasProperty = ($('.featureList').val());
        //if the object does contain property
        alert("Good guess - click on characters that arent/dont have " + computerHasProperty + " to remove from game!")
    };

    function wrongPropertyChoice() {
        var computerHasProperty = ($('.featureList').val());
        //if the object does contain property
        alert("Unlucky! "  + computerHasProperty + " is not a property")
    };
    
    function removeRedundantCharacter(){
        $redundantFace = $('.faces');
        $redundantFace.on('click', function(e) {
            e.preventDefault();
            /* Act on the event */
            $(this).attr('src', 'img/wrong/face1-wrong.jpg');
        });
    }




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
