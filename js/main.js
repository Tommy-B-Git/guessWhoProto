var allTheCharacters = [];
var allTheCharactersComp = [];
var theHuman = [];
var theComputer = [];
var singleChar;
var charsWithFeature = [];
var turn = 0;
var allNames = [];
var allHumanNames = [];
var questionsAskedByComputer = [];

// allTheCharacters.length = 18
// questions.length = 15

var newGame = function() {
    $('.start-button').one('click', function(event) {
        turn == 0;
        //humanTurn();
        //checkForWinner();

        turn == 1;
        //setUpComputersTurnClick();
        //computerTurn();
        //checkForWinner();
    });
};

$(document).ready(function() {
    newGame();
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
        allTheCharactersComp.push(val);
    });

}

console.log(allTheCharacters);
console.log(allTheCharactersComp);

// Start button click event
$('.start-button').on('click', function() {
    pickAPlayer();
    pickComputerPlayer();
    // alert("Now pick from an attribute from the dropdown menu");
    $('.instructDialog').find('p').text('Great!!! Now pick an attribute from the dropdown menu');
});

// Reset button click event
$('.reset-button').on('click', function() {
    resetPlayer();
});

// Pick random  H U M A N  player
function pickAPlayer() {
    //theHuman = [];
    random = Math.floor(Math.random() * allTheCharacters.length - 1);
    // console.log(allTheCharacters[random]);
    player1 = allTheCharacters[random];
    // Store human char in theHuman Array
    theHuman.push(player1);
    console.log(theHuman);

    $.each(theHuman, function(index, val) {
        /* iterate through array or object */
        //console.log(val.image);
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
    random = Math.floor(Math.random() * allTheCharacters.length - 1);
    // console.log(allTheCharacters[random]);
    comp1 = allTheCharacters[random];
    // Store human char in theComputer Array
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

// Loop scorebpard images
$('td.scoreboard').each(function(i) {
    $(this).css('background-image', 'url(img/score-avatar.jpg)')
        .css('width', '2.6vw')
        .css('height', '4.4vh')
        .css('background-size', 'cover')
        .css('background-position', 'center center')
        .css('padding', '3px');
});

//Get <SELECT> values
function grabInputValue() {
    // click event on select submit
    $(".pickAFeatureBtn").on('click', function(e) {
        e.preventDefault();

        humanTurn();
        console.log(turn);
    });
}
grabInputValue();


function humanTurn() {
    for (i = allTheCharactersComp.length; i >= 0; i--) {
        var singlePerson = allTheCharactersComp[i];
        // console.log(singlePerson);
        for (var key in singlePerson) {
            var hasFeature = $('.featureList').val();
            if (key === hasFeature && singlePerson[key] === !0) {
                //console.log(key + " -> " + singlePerson[key]);
                var name = singlePerson.name;
                //console.log(name);
                allNames.push(name);
                //console.log(allNames);
                var nameString = allNames.toString();
                allTheCharactersComp.splice(i, 1);
                console.log(allTheCharactersComp);
                //correctPropertyChoice();
                removeRedundantCharacterImages();
                $('.dialogBox').find('p')
                    .text("Click on " + nameString + " to remove them from the game! Then click ok to continue.")
                    .append('<br><button class="okButton">Ok, I got that</button>');
            }
        }
    }
    turn = 1;
    if (turn = 1) {
        setUpComputersTurnClick();
    } else {
        humanTurn();
    }
};

// C O M P U T E R  T U R N  E V E N T  H A N D L E R S

$('.yesButton').on('click', function() {
    if (turn = 0) {
        humanTurn();
    } else {
        computerTurn();
    }
});
$('.noButton').on('click', function() {
    if (turn = 0) {
        humanTurn();
    } else {
        computerTurn();
    }
});

function computerTurn() {
    console.log('computers turn');
    var humanHasProperty = questions[0].key;
    console.log(humanHasProperty);

    for (i = allTheCharacters.length; i >= 0; i--) {
        var singleHuman = allTheCharacters[i];
        // console.log(singleHuman);
        for (var key in singleHuman) {
            var hasFeature = $('.featureList').val();
            if (key === humanHasProperty && singleHuman[key] === !0) {
                //console.log(key + " -> " + singleHuman[key]);
                var name = singleHuman.name;
                console.log(name);
                allHumanNames.push(name);
                //console.log(allHumanNames);
                var humanNameString = allHumanNames.toString();
                allTheCharacters.splice(i, 1);
                console.log(allTheCharacters);
                //correctPropertyChoice();
                removeRedundantCharacterImages();
                // $('.dialogBox').find('p')
                //     .text("It is the Player 1 turn again!!!")
                //     .append('<br><button class="okButton">Ok, I got that</button>');
            }
        }
    }
    turn = 0;
    if (turn = 0) {
        humanTurn();
    } else {
        setUpComputersTurnClick();
    }
};


// S E T  U P  C O M P U T E R  T U R N
function setUpComputersTurnClick() {
    $('.okButton').on('click', function(e) {
        alert("clicked!!!");
        // questions comes from questions.js file
        var theQuestion = questions[0].question;
        console.log(theQuestion);
        //alert('Button clicked!');
        $('.dialogBox').find('p').empty();
        $('.instructDialog').hide();
        $('.computerDialog')
            .show()
            .find('p').text(theQuestion);
        questions.shift();
        console.log(questions);
        // F I R E  C O M P U T E R  L O G I C
    })
};

function removeRedundantCharacterImages() {
    $redundantFace = $('.faces');
    $redundantFace.on('click', function(e) {
        e.preventDefault();
        // Act on the event
        $(this).fadeIn('slow').attr('src', 'img/wrong/correct-choice.jpg');
    });
}
