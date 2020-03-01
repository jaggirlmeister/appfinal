var motive= localStorage.getItem('motive');
if(motive!==null){
    $("body").css("background-image","url('../assets/images/"+motive+".jpg'");
}

var player1data=JSON.parse(localStorage.getItem('player1'));
var player2data=JSON.parse(localStorage.getItem('player2'));
$("#playerOne").append(player1data.nick);
$("#playerTwo").append(player2data.nick);

var winOne = player1data.tttPoints;
var winTwo = player2data.tttPoints;
$("#player1Points-ttt").append(winOne);
$("#player2Points-ttt").append(winTwo);

var CPUsequence=[];
var userSequence =[];

//points
var points=0;
var pointsPlayer1=0;
var pointsPlayer2=0;
var cont=0;
var selectedColor;

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
}

function check(color, position){

    if(color==CPUsequence[position]){
        //alert("eureka!"+ position);
        if(position+1==CPUsequence.length){
            setTimeout(function(){
                createSequence();
            },1000)
            //alert("contador igual longitud: "+cont)
        }
    }
    else{
        //alert("game over! your Score: "+CPUsequence.length);
        gameOver();
    }
}

function playSound(id){
    var audio= document.getElementById(id);
    audio.play();
}

function createSequence(){

    $("announce").addClass("hide");

    var randomNum= Math.floor(Math.random()*4);
    CPUsequence.push(randomNum);

    points++;
    $("#cont div").addClass("disable");

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
        $("#cont div").removeClass("disable");
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

    if(player == 0){
        player = 1;
        document.getElementById("playerOne").classList.remove("glow");
        document.getElementById("playerTwo").classList.add("glow");
        localStorage.setItem('simonTurn', player);

        $("announce").removeClass("hide");
        $("winnerText").html("Llegaste a "+CPUsequence.length+" secuencias");

    } else{
        player = 0;
        document.getElementById("playerTwo").classList.remove("glow");
        document.getElementById("playerOne").classList.add("glow");
        localStorage.setItem('simonTurn', player);
        
        $("announce").removeClass("hide");
        $("winnerText").html("Llegaste a "+CPUsequence.length+" secuencias");

    }

    cont=0;
    CPUsequence=[];
    userSequence =[];

    createSequence();
}
