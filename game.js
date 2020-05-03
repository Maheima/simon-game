var buttonColours = ["red","blue","green","yellow"];  //list that contains the colour names
var gamePattern = [];  //Empty list
var userClickedPattern = [];

var level = 0;
var started = false; //to keep a track that the function is called just once.

//Detecting the keypress
$(document).keypress(function(){
  if (!started){
    $("#level-title").text("Level - "+ level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success!");
    if(gamePattern.length===userClickedPattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }else{
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  randomNumber = Math.floor(Math.random()*4) ;
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+ randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


function playSound(name){
  var mySound = new Audio("sounds/"+name+".mp3");
  mySound.play();
}


function animatePress(currentColour){
  $("#"+ currentColour).addClass("pressed");
  setTimeout(function () {
    $("#"+ currentColour).removeClass("pressed");
  }, 100);
}

function  startOver(){
  started = false;
  level = 0;
  gamePattern = [];
}
