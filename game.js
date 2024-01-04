var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

document.addEventListener('keypress', function() {
    if (!started) {
        document.getElementById('level-title').textContent = 'Level ' + level;
        nextSequence();
        started = true;
    }
});

var buttons = document.querySelectorAll('.btn');

buttons.forEach(function(button) {                     // for loop for each button user presses
    button.addEventListener('click', function() {
        var userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);

        animatePress(userChosenColour);
        playSound(userChosenColour);

        checkAnswer(userClickedPattern.length - 1);
        
    });
});


// step 9
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        document.body.classList.add("game-over");
        document.getElementById('level-title').textContent = 'Game Over, Press Any Key to Restart';

        setTimeout(function() {
            document.body.classList.remove("game-over");
        }, 200);


        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;    // step 8
    document.getElementById('level-title').textContent = 'Level ' + level;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    animatePress(randomChosenColour);
    playSound(randomChosenColour);
}


// step 6
function animatePress(currentColor) {
    var element = document.getElementById(currentColor);
    element.classList.add("pressed");

    setTimeout(function() {
        element.classList.remove("pressed");
    }, 100);  // 100 milliseconds delay
}


// step 5
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


// step 7
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


