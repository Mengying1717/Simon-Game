var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function() {
  if(!started){
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence(){
  userClickedPattern = [];//每次call nextSequence]时清空上一次的pattern数组
  level++;//每次call加
  $("#level-title").text("level " + level);

  var maximum = 3;
  var minimum = 0;
  var randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  var randomChosenColours = buttonColours[randomNumber];
  gamePattern.push(randomChosenColours);

  $("#" + randomChosenColours).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColours);
}

function playSound(name){
  var audio = new Audio('sounds/'+ name +'.mp3');
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
    console.log("success");

    if(userClickedPattern.length == gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
