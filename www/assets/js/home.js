/*
var player1={name:"" , nick: "", photo:"", totalpoints: 0, tttPoints:0, memoPoints:0, simonPoints:0};
var player2={name:"" , nick: "", photo:"", totalpoints: 0, tttPoints:0, memoPoints:0, simonPoints:0};

localStorage.clear();
localStorage.setItem('tile', tileValue);
localStorage.getItem('tile');
*/

var player1=JSON.parse(localStorage.getItem('player1'));
var player2=JSON.parse(localStorage.getItem('player2'));
var motive= localStorage.getItem('motive');
var previousMotive ='afternoon';

function playSound(sound, id){

    const rollSound = new Audio("assets/files/"+sound+".mp3");
    $("#"+id+"").click(e => rollSound.play());
}

function loadHome(){

    if(motive==null){
        $("body").css("background-image","url('assets/images/afternoon.jpg'");
    }
    else{
        $("body").css("background-image","url('assets/images/"+motive+".jpg'");
        $("#motive").val(motive);

        $("button").addClass(motive);
        $("select").addClass(motive);
        $(".playerData").addClass(motive);
        previousMotive = motive;
    }

    if(player1==null && player2==null){
        player1={name:"" , nick: "", photo:"", totalpoints:0, tttPoints:0, memoPoints:0, simonPoints:0};
        player2={name:"" , nick: "", photo:"", totalpoints:0, tttPoints:0, memoPoints:0, simonPoints:0};
        $("#ask").removeClass("hide"); 
        $("#login1").removeClass("hide");
        var totalPoints1=player1.tttPoints+player1.memoPoints+player1.simonPoints;
        $("#player1TotalPoints").html(totalPoints1);

        var totalPoints2=player2.tttPoints+player2.memoPoints+player2.simonPoints;
        $("#player2TotalPoints").html(totalPoints2);    
    }
    else{
        $("#ask").addClass("hide");

        $("#player1Nick").empty();
        $("#player2Nick").empty();

        $("#player1Nick").append(player1.nick);
        $("#player2Nick").append(player2.nick);

        $("#user1img").attr("src", player1.photo);
        $("#player1Pic").attr("src", player1.photo);

        $("#user2img").attr("src", player2.photo);
        $("#player2Pic").attr("src", player2.photo);

        var totalPoints1=player1.tttPoints+player1.memoPoints+player1.simonPoints;
        $("#player1TotalPoints").html(totalPoints1);

        var totalPoints2=player2.tttPoints+player2.memoPoints+player2.simonPoints;
        $("#player2TotalPoints").html(totalPoints2);
    }
}

var src= document.getElementById("player1Pic").src;

function login1(num){

    //num(1=login; 2=edit)

    player1.name= document.getElementById("name1").value;
    player1.nick= document.getElementById("nick1").value;
    

    if(player1.name =="" || player1.name == undefined){ 
        $("#name1").addClass("wrong");
        $("#name1").attr("placeholder", "Ingrese el nombre del jugador 1");
    }else{
        $("#name1").removeClass("wrong");
    }

    if(player1.nick =="" || player1.nick == undefined){ 
        $("#nick1").addClass("wrong");
        $("#nick1").attr("placeholder", "Ingrese el nick del jugador 1");
    }else{
        $("#nick1").removeClass("wrong");
    }

    if(player1.photo==""){
        $("#user1img").addClass("wrong");
    }
    else{
        $("#user1img").removeClass("wrong");
    }
        
    if(player1.name!=="" && player1.name!==undefined && player1.nick!=="" && player1.nick!==undefined && player1.photo!==""){
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

     //num(1=login; 2=edit)

    player2.name= document.getElementById("name2").value;
    player2.nick= document.getElementById("nick2").value;

    if(player2.name =="" || player2.name==player1.name || player2.name==undefined){ 
        $("#name2").addClass("wrong");
        $("#name2").attr("placeholder", "Ingrese el nombre del jugador 2");
    }else{
        $("#name2").removeClass("wrong");
    }

    if(player2.nick =="" || player2.nick==player1.nick|| player2.nick==undefined){ 
        $("#nick2").addClass("wrong");
        $("#nick2").attr("placeholder", "Ingrese el nick del jugador 2");
    }else{
        $("#nick2").removeClass("wrong");
    }

    if(player2.photo==""){
        $("#user2img").addClass("wrong");
    }
    else{
        $("#user2img").removeClass("wrong");
    }

    if(player2.name!=="" && player2.nick!=="" && player2.nick!==player1.nick && player2.name !== player1.name && player2.name!==undefined && player2.nick!==undefined && player2.photo!==""){
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

    //player(1= player 1; 2= player 2; 3= both players)

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

        $("#delete1").removeClass("hide");
        $("#buttonLogin1").attr("onclick","login1(2)");
    }
    else{
        $("#ask").removeClass("hide");
        $("#login2").removeClass("hide");

        $("#login-head2").html("Edite los datos del jugador 2");
        document.getElementById("name2").setAttribute("placeholder",player2.name);
        document.getElementById("nick2").setAttribute("placeholder",player2.nick);

        $("#delete2").removeClass("hide");
        $("#buttonLogin2").attr("onclick","login2(2)");
    }
}

function sureAbout(num){
    if(num==1){
        var login= "login1";
        $("#yes").attr("onclick","deleteUser(1)");
    }else{
        var login="login2"
        $("#yes").attr("onclick","deleteUser(2)");
    }
    $("#"+login+"").addClass("hide");
    $("#sureAbout").removeClass("hide");
    $("#sureAboutHead").html("¿Seguro que quiere eliminar al jugador "+num+"? Luego no podrá recuperar sus datos");
}

function deleteUser(player){
    if(player==1){

        player1={name:"" , nick: "", photo:"", totalpoints: 0, tttPoints:0, memoPoints:0, simonPoints:0};
        player1 = JSON.stringify(player1);
        window.localStorage.setItem('player1', player1);
        player1= JSON.parse(localStorage.getItem('player1'));

        totalPoints1=player1.tttPoints+player1.memoPoints+player1.simonPoints;
        $("#player1TotalPoints").html("");
        $("#player1TotalPoints").append(totalPoints1);

        $("#user1img").attr("src", "assets/images/user.svg");
        $("#player1Pic").attr("src", "assets/images/user.svg");

        document.getElementById("name1").value = "";
        document.getElementById("nick1").value = "";
        $("#sureAbout").addClass("hide");
        $("#login1").removeClass("hide");
        $("#delete1").addClass("hide");
        login1(2);
    }
    else{

        player2={name:"" , nick: "", photo:"", totalpoints: 0, tttPoints:0, memoPoints:0, simonPoints:0};
        player2 = JSON.stringify(player2);
        window.localStorage.setItem('player2', player2);
        player2= JSON.parse(localStorage.getItem('player2'));

        totalPoints2=player2.tttPoints+player2.memoPoints+player2.simonPoints;
        $("#player2TotalPoints").html("");
        $("#player2TotalPoints").append(totalPoints2);

        $("#user2img").attr("src", "assets/images/user.svg");
        $("#player2Pic").attr("src", "assets/images/user.svg");

        document.getElementById("name2").value = "";
        document.getElementById("nick2").value = "";
        $("#sureAbout").addClass("hide");
        $("#login2").removeClass("hide");
        $("#delete2").addClass("hide");
        login2(2);
    }
}
function back(){
    $("#sureAbout").addClass("hide");
    $("#ask").addClass("hide");
}

function changeMotive(){
    motive = document.getElementById("motive").value;
    window.localStorage.setItem('motive', motive);

    $("body").css("background-image","url('assets/images/"+motive+".jpg'");

    $("button").removeClass(previousMotive);
    $(".playerData").removeClass(previousMotive);
    $("select").removeClass(previousMotive);

    $("button").addClass(motive);
    $("select").addClass(motive);
    $(".playerData").addClass(motive);
    previousMotive = motive;
}

function takePicture(id){

    navigator.camera.getPicture(onSuccess, onFail, { 
        quality: 25,
        destinationType: Camera.DestinationType.DATA_URL,
        correctOrientation:true
    });

    function onSuccess(imageData){
        
        var pictureTaken= "data:image/jpeg;base64," + imageData;
        if(id==1){
            $("#user1img").attr("src", pictureTaken);
            $("#player1Pic").attr("src", pictureTaken);

            player1.photo = pictureTaken;
        }
        else{
            $("#user2img").attr("src", pictureTaken);
            $("#player2Pic").attr("src", pictureTaken);

            player2.photo = pictureTaken;
        }
    }

    function onFail(message){
    alert('failed because: ' + message);
    }
}