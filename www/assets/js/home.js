/*
var player1={name:"" , nick: "", totalpoints: 0, tttPoints:0, memoPoints:0, simonPoints:0};
var player2={name:"" , nick: "", totalpoints: 0, tttPoints:0, memoPoints:0, simonPoints:0};

localStorage.clear();
localStorage.setItem('tile', tileValue);
localStorage.getItem('tile');
*/

var player1=JSON.parse(localStorage.getItem('player1'));
var player2=JSON.parse(localStorage.getItem('player2'));
var motive= localStorage.getItem('motive');

function loadHome(){

    if(motive!==null){
        var motive= localStorage.getItem('motive');
        $("body").css("background-image","url('assets/images/"+motive+".jpg'");
    }
    else{
        $("body").css("background-image","url('assets/images/afternoon.jpg'");
    }

    if(player1==null && player2==null){
        player1={name:"" , nick: "", totalpoints: 0, tttPoints:0, memoPoints:0, simonPoints:0};
        player2={name:"" , nick: "", totalpoints: 0, tttPoints:0, memoPoints:0, simonPoints:0};
        $("#ask").removeClass("hide"); 
        $("#login1").removeClass("hide");    
    }
    else{
        $("#ask").addClass("hide");

        $("#player1Nick").empty();
        $("#player2Nick").empty();

        $("#player1Nick").append(player1.nick);
        $("#player2Nick").append(player2.nick);

        var totalPoints1=player1.tttPoints+player1.memoPoints+player1.simonPoints;
        $("#player1TotalPoints").append(totalPoints1);

        var totalPoints2=player2.tttPoints+player2.memoPoints+player2.simonPoints;
        $("#player2TotalPoints").append(totalPoints2);
    }
}

function login1(num){

    player1.name= document.getElementById("name1").value;
    player1.nick= document.getElementById("nick1").value;
    var src= document.getElementById("user1img").src;

    if(player1.name ==""){ 
        $("#name1").addClass("wrong");
    }else{
        $("#name1").removeClass("wrong");
    }

    if(player1.nick ==""){ 
        $("#nick1").addClass("wrong");
    }else{
        $("#nick1").removeClass("wrong");
    }

    if(src==""){ 
        $("#user1img").addClass("wrong");
    }else{
        $("#user1img").removeClass("wrong");
    }

    if(player1.name!=="" && player1.nick!==""){
        if(num==1){
            $("#login1").addClass("hide");
            $("#login2").removeClass("hide");    
        }
        else{
            $("#login1").addClass("hide");
            $("#ask").addClass("hide");

            logged(1);
        }
    }
}

function login2(num){ 

    player2.name= document.getElementById("name2").value;
    player2.nick= document.getElementById("nick2").value;

    if(player2.name =="" || player2.name==player1.name){ 
        $("#name2").addClass("wrong");
    }else{
        $("#name2").removeClass("wrong");
    }

    if(player2.nick =="" || player2.nick==player1.nick){ 
        $("#nick2").addClass("wrong");
    }else{
        $("#nick2").removeClass("wrong");
    }

    if(player2.name!=="" && player2.nick!=="" && player2.nick!==player1.nick && player2.name !== player1.name){
        if(num==1){
            logged(3);
        }else{
            $("#login2").addClass("hide");
            $("#ask").addClass("hide");

            logged(2);
        }
    }
}

function logged(player){
    if(player==1){
        $("#ask").addClass("hide");
        $("#login1").addClass("hide");
        
        
        $("#player1Nick").empty();
        $("#player1Nick").append(player1.nick);

        player1 = JSON.stringify(player1);
        window.localStorage.setItem('player1', player1);
        player1= JSON.parse(localStorage.getItem('player1'));
    }
    else if(player==2){
        $("#ask").addClass("hide");
        $("#login2").addClass("hide");
        
        $("#player2Nick").empty();
        $("#player2Nick").append(player2.nick);

        player2 = JSON.stringify(player2);
        window.localStorage.setItem('player2', player2);
        player2= JSON.parse(localStorage.getItem('player2'));
    }
    else{

        $("#ask").addClass("hide");
        $("#login2").addClass("hide");  

        $("#player1Nick").empty();
        $("#player2Nick").empty();
        $("#player1Nick").append(player1.nick);
        $("#player2Nick").append(player2.nick);
    
        player1 = JSON.stringify(player1);
        player2 = JSON.stringify(player2);
    
        window.localStorage.setItem('player1', player1);
        window.localStorage.setItem('player2', player2);
    }
}

function editPlayer(player){
    if (player==1){
        $("#ask").removeClass("hide");
        $("#login1").removeClass("hide");

        $("#login-head1").html("Edite los datos del jugador 1");
        document.getElementById("name1").setAttribute("placeholder",player1.name);
        document.getElementById("nick1").setAttribute("placeholder",player1.nick);

        $("#buttonLogin1").attr("onclick","login1(2)");
    }
    else{
        $("#ask").removeClass("hide");
        $("#login2").removeClass("hide");

        $("#login-head2").html("Edite los datos del jugador 2");
        document.getElementById("name2").setAttribute("placeholder",player2.name);
        document.getElementById("nick2").setAttribute("placeholder",player2.nick);

        $("#buttonLogin2").attr("onclick","login2(2)");
    }
}

function sureAbout(num){
    if(num==1){
        var player=player1.nick;
        var login= "login1";
    }else{
        var player=player2.nick;
        var login="login2"
    }
    $("#"+login+"").empty();
    $("#sureAbout").removeClass("hide");
    $("#sureAboutHead").html("¿Seguro que quiere eliminar al jugador "+player+"? Luego no podrá recuperar sus datos");
}

function changeMotive(){
    motive = document.getElementById("motive").value;
    window.localStorage.setItem('motive', motive);

    $("body").css("background-image","url('assets/images/"+motive+".jpg'");
}