var canvas = null,
    ctx = null;
var 
    v = 20,
    lastPress = null;
    var KEY_LEFT =37,    KEY_UP =38,    KEY_RIGHT =39,    KEY_DOWN =40 , KEY_SPACE =32;
    var pause = true;
    var gameover=false;
    var dir = 1 ;
    var body = new Array();
    body[0] = new Rectangle(40,200,20,20);
    var food = new Rectangle(300,120,20,20);
    var score =0;
    var walls = new Array();
    // walls.push(new Rectangle(260,120,40,40));
    // walls.push(new Rectangle(900,120,40,40));
    // walls.push(new Rectangle(260 ,440,40,40));
    // walls.push(new Rectangle(900,440,40,40));
    
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
    /*
    if ( lastPress == KEY_UP && v > 0){ 
        v-=5;
    };
    if ( lastPress == KEY_RIGHT && v > 0){ 
         v-=5;
    };
    if ( lastPress == KEY_DOWN && v > 0){ 
        v-=5;
    };
    if ( lastPress == KEY_LEFT && v > 0){ 
        v-=5;
    }; */
},false);

function paint(ctx){
        ctx.fillStyle='#000';
        ctx.fillRect(0,0,canvas.width,canvas.height);

        ctx.fillStyle='#FFF';
        body[0].fill(ctx);
        ctx.fillStyle='#888';
        ctx.fillRect(body[0].x,body[0].y,5,5);
        //DRAWS WALLLS
        for (let i = 0; i < walls.length; i++) {
            walls[i].fill(ctx);            
        }
        //DRAWS FOOD
        ctx.fillStyle='#F00';
        food.fill(ctx)
        ctx.fillStyle='#0f0';
        ctx.fillText('Last Press: ' + lastPress,10,20);
        ctx.fillText('Score: '+score,10,30);
        ctx.fillText('Speed: '+v,10,40)
        if(pause){
        ctx.textAlign='center';
        if(gameover){
            ctx.fillText('GAME OVER',canvas.width/2,canvas.height/2)
        }
        else {
            ctx.fillText('PAUSE',canvas.width/2,canvas.height/2);
            ctx.fillText('[SPACEBAR TO CONTINUE]',canvas.width/2,canvas.height/2+20);
        }
        ctx.textAlign='left';
        
        }
}
//Reset function
    function reset(){
        score=0;
        dir = 1;
        body[0].x=40;
        body[0].y=200;
        food.x = random(canvas.width/20 -1) *20;
        food.y = random(canvas.height/20 -1) *20;
        lastPress = KEY_RIGHT;
        gameover = false;
    }
//actions during the game
function act(){
    // x += v;
    // if(x > canvas.width){
    //     x = -24 ;
    // }
    //change Direction;
    if(!pause){
    if(gameover){
            reset();
        } 
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
        body[0].y -= v;
    }
    if ( dir == 1) {
        body[0].x +=v
    }
    if ( dir == 2 ) {
        body[0].y +=v
    }
    if ( dir == 3) {
        body[0].x -=v
    }
    // Out Screen
    if(body[0].x + body[0].width > canvas.width){
    body[0].x = 0  ;
    }
    if(body[0].y + body[0].width > canvas.height){
    body[0].y =0;
    }
    if(body[0].x < 0 ){
    body[0].x = canvas.width;
    }
    if(body[0].y <0){
    body[0].y = canvas.height;
    }
    }
    if(lastPress == KEY_SPACE ){
        pause = !pause;
        lastPress=null;
    }
    if(body[0].intersects(food)){
        score += 1;
        food.x = random(canvas.width/20 -1) *20;
        food.y = random(canvas.height/20 -1) *20;
      //  v = 15;
    }
    // for(let ix =0; ix < 4;ix++){
    //     if(walls[ix].intersects(food)){
    //         food.x = random(canvas.width/20 -1) *20;
    //         food.y = random(canvas.height/20 -1) *20;
    //     }
    //     if(body[0].intersects(walls[ix])){
    //         gameover = true;
    //        pause = true;
    //     }
    // }
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

