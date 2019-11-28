var player1={name:"" , nick: "", totalpoints: 0};
var player2={name:"" , nick: "", totalpoints: 0};
/*
localStorage.clear();
localStorage.setItem('tile', tileValue);
localStorage.getItem('tile');
*/


var savePlayer1;
var savePlayer2;

function loadHome(){
savePlayer1=JSON.parse(localStorage.getItem('player1'));
savePlayer2=JSON.parse(localStorage.getItem('player2'));
alert(savePlayer2);
    if(savePlayer1==null && savePlayer2==null){
        login1();
    }
    else{
        alert("Estos son los valores que tengo: "+savePlayer1 + savePlayer2);
        $("#player1Nick").empty();
        $("#player2Nick").empty();
        $("#player1Nick").append(savePlayer1.nick);
        $("#player2Nick").append(savePlayer2.nick);
        $("#ask").remove();
    }
}

function login1(){
    $("#ask").append("<div id='login' class='container'></div>");
    $("#login").append("<p>Ingrese los datos del Jugador 1</p>");
    $("#login").append("<img id='user1img' class='playerPic' src='assets/images/user.svg' onclick='takePicture()'></img>");
    $("#login").append("<label>Nombre</label><br><input placeholder='Ingrese nombre del jugador 1' type='text' id='name1' name='name' required>");
    $("#login").append("<label>Nickname</label><br><input placeholder='Ingrese nickname del jugador 1' type='text' id='nick1' name='nick' required>");
    $("#login").append("<button type='submit' onclick='login2()' required>Ingresar</button>");

}

function login2(){ 
    player1.name= document.getElementById("name1").value;
    player1.nick= document.getElementById("nick1").value;
    var src= document.getElementById("user1img").src;

    if(player1.name ==""){ 
        $("#name1").addClass("wrong");
    }
    if(player1.nick ==""){ 
        $("#nick1").addClass("wrong");
    }

    if(src==""){ 
        $("#user1img").addClass("wrong");
    }

    if(player1.name!=="" && player1.nick!==""){
        $("#login").empty();
        $("#login").append("<p>Ingrese los datos del Jugador 2</p>");
        $("#login").append("<img id='user2img' class='playerPic' src='assets/images/user.svg' onclick='takePicture()'></img>");
        $("#login").append("<label>Nombre</label><br><input placeholder='Ingrese nombre del jugador 2' type='text' id='name2' name='name' required>");
        $("#login").append("<label>Nickname</label><br><input placeholder='Ingrese nickname del jugador 2' type='text' id='nick2' name='nick' required>");
        $("#login").append("<button type='submit' onclick='logged()' required>Ingresar</button>");
    }
}

function logged(){
    player2.name= document.getElementById("name2").value;
    player2.nick= document.getElementById("nick2").value;

    if(player2.name =="" || player2.name==player1.name){ 
        $("#name2").addClass("wrong");
    }
    if(player2.nick =="" || player2.nick==player1.nick){ 
        $("#nick2").addClass("wrong");
    }

    if(player2.name!=="" && player2.nick!=="" && player2.nick!==player1.nick && player2.name !== player1.name){
    $("#ask").addClass("hide");

    savePlayer1 = JSON.stringify(player1);
    savePlayer2 = JSON.stringify(player2);

    alert(savePlayer1 +"  "+savePlayer2);

    window.localStorage.setItem('player1', savePlayer1);
    window.localStorage.setItem('player2', savePlayer2);

    $("#player1Nick").empty();
    $("#player2Nick").empty();
    $("#player1Nick").append(player1.nick);
    $("#player2Nick").append(player2.nick);
    }
}

function changeMotive(){
    var motive = document.getElementById("motive").value;

    $("body").css("background-image","url('assets/images/"+motive+".jpg'");
}


function editPlayer(player){
    if (player==1){
       // document.getElementById("player1Nick").innerHTML= "holis";
        document.getElementById("player1Data").classList.add("expandData");
    }
    else{
        document.getElementById("player2Data").classList.add("expandData");
    }
}