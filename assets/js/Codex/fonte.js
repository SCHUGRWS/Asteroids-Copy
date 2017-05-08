var widthCanvas = document.getElementById('canvasGame').offsetWidth;
var heightCanvas = document.getElementById('canvasGame').offsetHeight;
var game = new Phaser.Game(widthCanvas, heightCanvas, Phaser.AUTO, 'canvasGame', { preload: preload, create: create, update: update });
game.x = 200;
preload();
create();

var nave;
var cursors;

var tiro;
var tiros;
var tiroTime = game.time.now;

function preload() {

    //game.load.baseURL = 'http://examples.phaser.io/assets/';
    //game.load.crossOrigin = 'Catolica SC - ';
    
    game.stage.backgroundColor = '#000000';
    
    game.load.image('nave', 'assets/images/Nave.png');
    game.load.image('tiro', 'assets/images/Tiro Risco.png');
    

}


function create() {
    if(!(parseFloat(game.time.now)>tiroTime)){
        tiroTime = game.time.now + 0.001;
    }
    game.renderer.clearBeforeRender = false;
    game.renderer.roundPixels = true;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    nave = game.add.sprite(0,0,'nave');
    nave.width = widthCanvas*0.03;
    nave.height = widthCanvas*0.03;
    nave.position.x = widthCanvas/2;
    nave.position.y = heightCanvas/2;
    nave.anchor.setTo(0.5, 0.5);
    
    game.physics.enable(nave, Phaser.Physics.ARCADE);
    
    //  Our ships tiros
    tiros = game.add.group();
    tiros.enableBody = true;
    tiros.physicsBodyType = Phaser.Physics.ARCADE;

    //  All 40 of them
    tiros.createMultiple(40, 'tiro');
    tiros.setAll('anchor.x', 0.58);
    tiros.setAll('anchor.y', 1);

    nave.body.drag.set(100);
    nave.body.maxVelocity.set(200);

    //  Game input
    cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
    
    //nave.rotation = 90;

}



function update () {
    //nave.rotation = game.physics.arcade.angleToPointer(nave)+1.55;
    if (cursors.up.isDown)
    {
        game.physics.arcade.accelerationFromRotation(nave.rotation-1.55, 200, nave.body.acceleration);
    }
    else
    {
        nave.body.acceleration.set(0);
    }

    if (cursors.left.isDown)
    {
        nave.body.angularVelocity = -300;
    }
    else if (cursors.right.isDown)
    {
        nave.body.angularVelocity = 300;
    }
    else
    {
        nave.body.angularVelocity = 0;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    {
        disparoNave();
    }

    screenWrap(nave);

    //tiros.forEachExists(screenWrap, this);
}


function disparoNave () {

    if(parseFloat(game.time.now)>tiroTime){
        tiro = tiros.getFirstExists(false);
        if (tiro)
        {
            tiro.reset(nave.body.x+(nave.width/2), nave.body.y + 20);
            tiro.lifespan = 4000;
            tiro.width = widthCanvas*0.005;
            tiro.height = widthCanvas*0.015;
            tiro.rotation = nave.rotation-0.0001;
            game.physics.arcade.velocityFromRotation(nave.rotation-1.5555, 400, tiro.body.velocity);
            tiroTime = game.time.now + 200;
        }
    }

}

function screenWrap (sprite) {
    if (sprite.x < 0)
    {
        sprite.x = game.width;
    }
    else if (sprite.x > game.width)
    {
        sprite.x = 0;
    }

    if (sprite.y < 0)
    {
        sprite.y = game.height;
    }
    else if (sprite.y > game.height)
    {
        sprite.y = 0;
    }

}

function render () {

}