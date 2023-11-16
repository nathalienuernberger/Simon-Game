
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;

$("html").one("keypress", function () {
    nextSequence();
    $("#level-title").text("Level "+level);
});

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

$(".btn").click(function (){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

function startOver(){
    level = 0;
    gamePattern = [];
    $("html").one("keypress", function () {
        nextSequence();
        $("#level-title").text("Level "+level);
    });
}

function checkAnswer(currentLevel){
      if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
       // console.log("correct");
        if (gamePattern.length === userClickedPattern.length){ 
            setTimeout(function() { 
            nextSequence();
            }, 1000);
        }
        } else {
        var audioGameOver = new Audio("sounds/wrong.mp3");
        audioGameOver.play();

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200)
        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
        }
    }
