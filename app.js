var canvas = null,
    ctx = null;
var 
    v = 15,
    lastPress = null;
    var KEY_LEFT =37,    KEY_UP =38,    KEY_RIGHT =39,    KEY_DOWN =40 , KEY_SPACE =32;
    var pause = true;
    var dir = 1 ;
    var player = new Rectangle(40,40,25,25);
    var food = new Rectangle(300,300,15,15);
    var score =0;


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
        player.fill(ctx);
        ctx.fillStyle='#F00';
        food.fill(ctx)
        ctx.fillStyle='#0f0';
        ctx.fillText('Last Press: ' + lastPress,10,20);
        ctx.fillText('Score: '+score,10,30);
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
        player.y -= v;
    }
    if ( dir == 1) {
        player.x +=v
    }
    if ( dir == 2 ) {
        player.y +=v
    }
    if ( dir == 3) {
        player.x -=v
    }
    // Out Screen
    if(player.x > canvas.width){
    player.x =0;
    }
    if(player.y > canvas.height){
    player.y =0;
    }
    if(player.x <0){
    player.x = canvas.width;
    }
    if(player.y <0){
    player.y = canvas.height;
    }
    }
    if(lastPress == KEY_SPACE ){
        pause = !pause;
        lastPress=null;
    }
    if(player.intersects(food)){
        score += 1;
        food.x = random(canvas.width/10 -1) *10;
        food.y = random(canvas.height/10 -1) * 10;

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
function Rectangle(x, y, width, height){
    this.x =(x ==null)?0: x;
    this.y =(y ==null)?0: y;
    this.width =(width ==null)?0: width;
    this.height =(height ==null)?this.width : height;
    this.intersects = function(rect){
        if(rect ==null){
        window.console.warn('Missing parameters on function intersects');
        }
        else {
             return(this.x < rect.x + rect.width &&this.x +this.width > rect.x &&this.y < rect.y + rect.height &&this.y +this.height > rect.y);
            }
    };
    this.fill =function(ctx){
        if(ctx ==null){
        window.console.warn('Missing parameters on function fill');}
        else{
            ctx.fillRect(this.x,this.y,this.width,this.height);
        }
    };
}

function random(max){
    return Math.floor(Math.random() * max);
}

window.addEventListener('load',init,false); 

