// My scripts
// ============


// Avoid `console` errors in browsers that lack a console.
//////////////////////////////////////////////////////////

(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////
// Rock-Paper-Scissors JS logic
//////////////////////////////////


/////////////////////////////////////
// The game selection comes first...

(function gameSelector() {

    $('.choose-game ul[role="tablist"]').each(function() {

        /* 
            For each button / 'tab', we want to keep track of
            which one is active and it's associated content.
        */
        var $active, $content, $links = $(this).find("a");

        /* 
            If the location.hash matches one of the links, use that as the active tab.
            Otherwise, if not, use the the first link as the initial active tab.
        */
        $active = $($links.filter('[href="' + location.hash + '"]')[0] || $links[0]);
        $active.addClass("active");

        // Add aria-hidden attribute "false" to make the applicable content visible to a screenreader...
        $content = $($active[0].hash).attr("aria-hidden", false);

        // Hide the other content and add aria-hidden attribute "true" to make the applicable content invisible to a screenreader...
        $links.not($active).each(function() {
            $(this.hash).hide().attr("aria-hidden", true)
        });

        // Here comes the click event...
        $('.choose-game ul[role="tablist"] li a').on("click", function(event) {

            event.preventDefault(); // Prevent link default behaviour

            // Make the other button / 'tab' inactive and the content hidden from screenreaders...
            $active.removeClass("active");
            $content.hide().attr("aria-hidden", true);

            // Modify the variables with the new link and content...
            $active = $(this);
            $content = $(this.hash);

            // Make the button / 'tab' active and and the content visible to screenreaders...
            $active.addClass("active");
            $content.fadeIn('slow').attr("aria-hidden", false).removeClass('hidden');
        })
    })
}());

///////////////////////////////////////////////////


//////////////////////////////////
// You versus computer logic

var computerChoice = null,
    yourChoice = null;

// The computer's random selection...
var latestComputerChoice = function () {

    computerChoice = Math.random();
    // Assign a randomly generated number to rock, paper, or scissors.
    if (computerChoice < .33) {
        computerChoice = "rock";
    } else if (computerChoice < .66) {
        computerChoice = "paper";
    } else {
        computerChoice = "scissors";
    };

    // Checking what it's logging in the browser console...
    console.log('Computer choice: ', computerChoice);
};

// The results decision making stuff ie. whether you tie, win or lose...
var winDecision = function () {

    // Result decision messages...
    var messageTie = "<div class='decision'><strong>It's a tie.</strong></div>",
        messageLose = "<div class='decision'><strong>You lose <small>:-(</small></strong></div>",
        messageWin = "<div class='decision'><strong>You win!</strong></div>";

    // Find the right place to insert the new elements into the DOM...
    var result = $('.choose-game #tab1 .result');
    // Remove the previous message first...
    var resultRemove = $('.choose-game #tab1 .result .decision').remove();

    if (yourChoice == computerChoice) {
            result.append(messageTie);
        } else if (yourChoice == "rock") {
            if (computerChoice == "scissors") {
                result.append(messageWin);
            } else {
                result.append(messageLose);
            }
        } else if (yourChoice == "paper") {
            if (computerChoice == "rock") {
                result.append(messageWin);
            } else {
                result.append(messageLose);
            }
        } else if (yourChoice == "scissors") {
            if (computerChoice == "paper") {
                result.append(messageWin);
            } else {
                result.append(messageLose);
            }
        }
};

// On the user's click event...
$('.choose-game #tab1 li a').click(function (event) {

    event.preventDefault(); // Prevent the usual link default behaviour

    // Pick up the applicable class from the selection you made (eg. "rock")...
    var opt = $(this).attr('class');
    yourChoice = opt.substring(0, opt.length);

    // Checking what it's logging in the browser console...
    console.log('Your choice: ', yourChoice);

    // Remove the previous message first...
    var resultRemove = $('.choose-game #tab1 .result .you').remove() && $('.choose-game #tab1 .result .computer').remove();

    // Run the latestComputerChoice function...
    latestComputerChoice();
    
    // Run the winDecision function...
    winDecision();

    // Find the right place to insert the new elements into the DOM...
    var result = $('.choose-game #tab1 .result');
    // DOM elements and content showing the user's choice...
    var resultYourChoice = "<div class='you'>You <span class='visuallyhidden'>chose</span>&#8674; <em>" + yourChoice + "</em></div>";
    // DOM elements and content showing the computer's choice...
    var resultComputerChoice = "<div class='computer'>Computer <span class='visuallyhidden'>chose</span>&#8674; <em>" + computerChoice + "</em></div>";

    // Hey presto!
    $(result).append(resultYourChoice) && $(result).append(resultComputerChoice);

});



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


//////////////////////////////////
// Computer versus computer logic

var computerChoiceA = null,
    computerChoiceB = null;

var latestComputerChoiceA = function () {

    computerChoiceA = Math.random();
    // Assign a randomly generated number to rock, paper, or scissors.
    if (computerChoiceA < .33) {
        computerChoiceA = "rock";
    } else if (computerChoiceA < .66) {
        computerChoiceA = "paper";
    } else {
        computerChoiceA = "scissors";
    };

    // Checking what it's logging in the browser console...
    console.log('Computer A: ', computerChoiceA);
};

var latestComputerChoiceB = function () {

    computerChoiceB = Math.random();
    // Assign a randomly generated number to rock, paper, or scissors.
    if (computerChoiceB < .33) {
        computerChoiceB = "rock";
    } else if (computerChoiceB < .66) {
        computerChoiceB = "paper";
    } else {
        computerChoiceB = "scissors";
    };

    // Checking what it's logging in the browser console...
    console.log('Computer B: ', computerChoiceB);
};

// The results decision making stuff ie. whether you tie, win or lose...
var winComputerDecision = function () {

    // Result decision messages...
    var messageTie = "<div class='decision'><strong>It's a tie.</strong></div>",
        messageComputerAWin = "<div class='decision'><strong>Computer <em>A</em> wins!</strong></div>",
        messageComputerBWin = "<div class='decision'><strong>Computer <em>B</em> wins!</strong></div>";

    // Find the right place to insert the new elements into the DOM...
    var result = $('.choose-game #tab2 .result');
    // Remove the previous message first...
    var resultRemove = $('.choose-game #tab2 .result .decision').remove();

    if (computerChoiceA == computerChoiceB) {
            result.append(messageTie);
        } else if (computerChoiceA == "rock") {
            if (computerChoiceB == "scissors") {
                result.append(messageComputerAWin);
            } else {
                result.append(messageComputerBWin);
            }
        } else if (computerChoiceA == "paper") {
            if (computerChoiceB == "rock") {
                result.append(messageComputerAWin);
            } else {
                result.append(messageComputerBWin);
            }
        } else if (computerChoiceA == "scissors") {
            if (computerChoiceB == "paper") {
                result.append(messageComputerAWin);
            } else {
                result.append(messageComputerBWin);
            }
        }
};


$('.choose-game #tab2 .start, .choose-game #tab2 li a').click(function (event) {

    event.preventDefault(); // Prevent the usual link default behaviour

    // Remove the previous message first...
    var resultComputersRemove = $('.choose-game #tab2 .result .computerA').remove() && $('.choose-game #tab2 .result .computerB').remove();

    // Run the latestComputerChoice functions...
    latestComputerChoiceA();
    latestComputerChoiceB();
    
    // Run the winComputerDecision function...
    winComputerDecision();

    // Find the right place to insert the new elements into the DOM...
    var resultComputers = $('.choose-game #tab2 .result');
    // DOM elements and content showing the user's choice...
    var resultComputerAChoice = "<div class='computerA'>Computer <em>A</em> <span class='visuallyhidden'>chose</span>&#8674; <em>" + computerChoiceA + "</em></div>";
    // DOM elements and content showing the computer's choice...
    var resultComputerBChoice = "<div class='computerB'>Computer <em>B</em> <span class='visuallyhidden'>chose</span>&#8674; <em>" + computerChoiceB + "</em></div>";

    // Hey presto!
    $(resultComputers).append(resultComputerAChoice) && $(resultComputers).append(resultComputerBChoice);

});


///////////////////////////////////////////////////////////////