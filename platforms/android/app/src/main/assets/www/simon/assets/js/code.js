function playSound(id){
    var audio= document.getElementById(id);
    audio.play();
}

var motive= localStorage.getItem('motive');
if(motive!==null){
    $("body").css("background-image","url('../assets/images/"+motive+".jpg'");
}

