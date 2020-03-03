var motive= localStorage.getItem('motive');
if(motive!==null){
    $("body").css("background-image","url('../assets/images/"+motive+".jpg'");
}

var player1data=JSON.parse(localStorage.getItem('player1'));
var player2data=JSON.parse(localStorage.getItem('player2'));
$("#playerOne").append(player1data.nick);
$("#playerTwo").append(player2data.nick);

var simonPointsOne = player1data.simonPoints;
var simonPointsTwo = player2data.simonPoints;
$("#player1Points-simon").append(simonPointsOne);
$("#player2Points-simon").append(simonPointsTwo);

var CPUsequence=[];
var userSequence =[];
var cont=0;
var selectedColor;
//var gameStarted = false;
var theEnd = false;

var player = localStorage.getItem('simonTurn');

if(player==null || player==0){
    player=0;
    document.getElementById("playerOne").classList.add("glow");
}
else{
    player=1;
    document.getElementById("playerTwo").classList.add("glow");
}

function turnOnColor(color){
    $("#"+color+"-button").addClass(color+"Shadow");
    setTimeout(function(){
        $("#"+color+"-button").removeClass(color+"Shadow");
    },300);
}

function playAudio(color){
    var audio= document.getElementById(color);
    //audio.play();
    
    audio.currentTime = 0;
    var playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.then(_ => {
        // Automatic playback started!
        // Show playing UI.
      })
      .catch(error => {
        // Auto-play was prevented
        // Show paused UI.
      });
    }
}

function usersChoice(color, num){

    playAudio(color);
    turnOnColor(color);

    userSequence.push(num);
    selectedColor=num;
   
    check(selectedColor, cont);

    if(cont==CPUsequence.length-1){
        cont=0;
    }else{
        cont++;
    }

    if(theEnd==true){
        cont=0;
        theEnd=false;
    }
}

function check(color, position){

    if(color==CPUsequence[position]){
        
        if(position+1==CPUsequence.length){
            setTimeout(function(){
                createSequence();
            },1000)
            // alert("contador igual longitud: "+cont)
        }
    }
    else{
        //alert("game over! your Score: "+CPUsequence.length);
        gameOver();
    }

    $("#counter").empty();
    $("#counter").append(position+1);
}

function playSound(id){
    var audio= document.getElementById(id);
    audio.play();
}

function startGame(){
    $(".simonButton").removeClass("disable");
    
    $("#start").addClass("disabledButton");
    $("#start").addClass("disable");

    createSequence();
}

function createSequence(){

    $("#counter").empty();
    $("#counter").append("Mirá");

    $("#announce-simon").addClass("hide");

    var randomNum= Math.floor(Math.random()*4);
    CPUsequence.push(randomNum);

    $(".simonButton").addClass("disable");

    for (var i = 0; i < CPUsequence.length; i++) {
        (function (i) {
          setTimeout(function () {
              showSequence(CPUsequence[i], i);
           }, 800*i);
        })(i);
    };
}

function showSequence(color, i){
    //0=green, 1=red, 2=blue, 3=yellow
    if(i+1==CPUsequence.length){
        $(".simonButton").removeClass("disable");

        setTimeout(function () {
            $("#counter").empty();
            $("#counter").append("Go!");
         }, 700*1);
    }

    switch(color){ 
        case 0:
            $("#green-button").addClass("greenShadow");
            playSound("green");
            setTimeout(function(){
                $("#green-button").removeClass("greenShadow");
            },300)

            break;
        case 1:
            $("#red-button").addClass("redShadow");
            playSound("red");
            setTimeout(function(){
                $("#red-button").removeClass("redShadow");
            },300)
            
            break;
        case 2:
            $("#blue-button").addClass("blueShadow");
            playSound("blue");
            setTimeout(function(){
                $("#blue-button").removeClass("blueShadow");
            },300)
                
            break;
        case 3:
            $("#yellow-button").addClass("yellowShadow");
            playSound("yellow");
            setTimeout(function(){
                $("#yellow-button").removeClass("yellowShadow");
            },300)
                
            break;
    }
}

function gameOver(){

  //  sequences= CPUsequence.length-1;

    if(player == 0){
        player = 1;
        document.getElementById("playerOne").classList.remove("glow");
        document.getElementById("playerTwo").classList.add("glow");
        localStorage.setItem('simonTurn', player);

        $("#announce-simon").removeClass("hide");
        $("#winnerText").html("Llegaste a "+cont+" secuencias");

        simonPointsOne = simonPointsOne + cont;
        $("#player1Points-simon").empty();
        $("#player1Points-simon").append(simonPointsOne);
        player1data.simonPoints = simonPointsOne;
        player1data = JSON.stringify(player1data);
        localStorage.setItem('player1', player1data);
        player1data=JSON.parse(localStorage.getItem('player1'));

        theEnd=true;

    } else{
        player = 0;
        document.getElementById("playerTwo").classList.remove("glow");
        document.getElementById("playerOne").classList.add("glow");
        localStorage.setItem('simonTurn', player);
        
        $("#announce-simon").removeClass("hide");
        $("#winnerText").html("Llegaste a "+cont+" secuencias");

        simonPointsTwo = simonPointsTwo + cont;
        $("#player2Points-simon").empty();
        $("#player2Points-simon").append(simonPointsTwo);
        player2data.simonPoints = simonPointsTwo;
        player2data = JSON.stringify(player2data);
        localStorage.setItem('player2', player2data);
        player2data=JSON.parse(localStorage.getItem('player2'));

        theEnd=true;
    }

CPUsequence=[];
userSequence =[];
}