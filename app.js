var canvas = null,
    ctx = null;
var x = 2,
    y = 100,
    v = 2,
    lastPress = null;
    var KEY_LEFT =37,    KEY_UP =38,    KEY_RIGHT =39,    KEY_DOWN =40 , KEY_SPACE =32;
    var pause = true;
    var dir = 0;


 window.requestAnimationFrame = (function(){
    return window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function(callback){
            window.setTimeout(callback,17);
            };
}());

document.addEventListener('keydown',function(evt){
    lastPress = evt.which; //
},false);

function paint(ctx){
        ctx.fillStyle='#000';
        ctx.fillRect(0,0,canvas.width,canvas.height);

        ctx.fillStyle='#FFF';
        ctx.fillRect(x,y,25,25);
        ctx.fillStyle='#0f0';
        ctx.fillText('Last Press: ' + lastPress,10,20);
        if( pause){
        ctx.textAlign='center';
        ctx.fillText('PAUSE',canvas.width/2,canvas.height/2);
        ctx.fillText('[SPACEBAR TO CONTINUE]',canvas.width/2,canvas.height/2+20);
        ctx.textAlign='left';
        }
}

function act(){
    // x += v;
    // if(x > canvas.width){
    //     x = -24 ;
    // }
    //change Direction;
    if(!pause){
    if ( lastPress == KEY_UP){ 
        dir = 0;
    };
    if ( lastPress == KEY_RIGHT){ 
        dir = 1;
    };
    if ( lastPress == KEY_DOWN){ 
        dir = 2;
    };
    if ( lastPress == KEY_LEFT){ 
        dir = 3;
    };
    //Move rect
    if ( dir == 0 ) {
        y -= 10;
    }
    if ( dir == 1) {
        x +=10
    }
    if ( dir == 2 ) {
        y +=10
    }
    if ( dir == 3) {
        x -=10
    }
    // Out Screen
    if(x > canvas.width){
    x =0;
    }
    if(y > canvas.height){
    y =0;
    }
    if(x <0){
    x = canvas.width;
    }
    if(y <0){
    y = canvas.height;
    }
    }
    if(lastPress == KEY_SPACE ){
        pause = !pause;
        lastPress=null;
    }
}
function repaint(){
    window.requestAnimationFrame(repaint);
    paint(ctx);
}

function run(){
    setTimeout(run,50);
    act();
}

function init(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    run();
    repaint();
}
window.addEventListener('load',init,false); 

