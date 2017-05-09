var widthCanvas = document.getElementById('canvasGame').offsetWidth;
var heightCanvas = document.getElementById('canvasGame').offsetHeight; 

heightCanvas=window.screen.height*0.87;

var arrayCores=["FF00A5","23FF0F","FFBB00","FF0015","FFFF00","FF0000","D4FF02","FF00D8","00F6FF","54FF00","33FF00","0800FF","F600FF","FF6100","FF5400"];

var game = new Phaser.Game(widthCanvas, heightCanvas, Phaser.AUTO, 'canvasGame', { preload: preload, create: create, update: update });
//game.x = 200;
preload();
create();

var nave;
var cursors;

var tiro;
var tiros;
var tiroTime = game.time.now;

var meteoroGrande;
var meteorosGrandes;
var meteroroTime = game.time.now;

function preload() {

    //game.load.baseURL = 'http://examples.phaser.io/assets/';
    //game.load.crossOrigin = 'Catolica SC - ';
    
    //game.stage.backgroundColor = '#000000';
    
    game.load.image('nave', 'assets/images/Nave.png');
    game.load.image('tiro', 'assets/images/Tiro Risco.png');
    game.load.image('meteoroGrande', 'assets/images/Meteoro Branco Grande.png');
    game.load.image('fundo', 'assets/images/Fundo Escurecido.png');
    

}


function create() {
    
    var fundo = game.add.sprite(0,0,'fundo');
    fundo.width = widthCanvas*0.99;
    fundo.height = heightCanvas;
    
    if(!(parseFloat(game.time.now)>tiroTime)){
        tiroTime = game.time.now + 0.001;
    }
    
    if(!(parseFloat(game.time.now)>meteroroTime)){
        meteroroTime = game.time.now + 0.001;
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
    
    //  Meteoros
    meteorosGrandes = game.add.group();
    meteorosGrandes.enableBody = true;
    meteorosGrandes.physicsBodyType = Phaser.Physics.ARCADE;

    //  4 meteoros
    meteorosGrandes.createMultiple(12, 'meteoroGrande');
    meteorosGrandes.setAll('anchor.x', 0.58);
    meteorosGrandes.setAll('anchor.y', 1);

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

    geraMeteoro();
    
    meteorosGrandes.forEachExists(screenWrap, this);
    //tiros.forEachExists(screenWrap, this);
}


function disparoNave () {

    if(parseFloat(game.time.now)>tiroTime){
        tiro = tiros.getFirstExists(false);
        if (tiro)
        {
            tiro.reset(nave.body.x+(nave.width/2), nave.body.y + 20);
            tiro.lifespan = 2000;
            tiro.width = widthCanvas*0.01;
            tiro.height = widthCanvas*0.03;
            tiro.rotation = nave.rotation-0.0001;
            game.physics.arcade.velocityFromRotation(nave.rotation-1.5555, 400, tiro.body.velocity);
            tiroTime = game.time.now + 300;
        }
    }

}

function geraMeteoro () {

    if(parseFloat(game.time.now)>meteroroTime){
        meteoroGrande = meteorosGrandes.getFirstExists(false);
        if (meteoroGrande)
        {
            meteoroGrande.tint ="0x"+arrayCores[Math.floor(Math.random() * arrayCores.length)];
            meteoroGrande.reset(widthCanvas+Math.round(Math.random()), heightCanvas+Math.round(Math.random()));
            meteoroGrande.lifespan = 0;
            meteoroGrande.width = 100;
            meteoroGrande.height = 100;
            var randomAngle = game.math.degToRad(game.rnd.angle());
            game.physics.arcade.velocityFromRotation(randomAngle, 200, meteoroGrande.body.velocity);
            meteroroTime = game.time.now + 600;
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