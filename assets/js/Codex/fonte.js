var widthCanvas = document.getElementById('canvasGame').offsetWidth;
var heightCanvas = document.getElementById('canvasGame').offsetHeight;
var game = new Phaser.Game(widthCanvas, heightCanvas, Phaser.AUTO, 'canvasGame', { preload: preload, create: create, update: update });
game.x = 200;
preload();
create();


function preload() {

    //game.load.baseURL = 'http://examples.phaser.io/assets/';
    game.load.crossOrigin = 'Catolica SC - ';
    
    game.stage.backgroundColor = '#000000';
    
    game.load.image('nave', 'assets/images/Nave 100% Pronta.png');
    

}


function create() {

    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    nave = game.add.sprite(0,0,'nave');
    nave.width = widthCanvas*0.03;
    nave.height = widthCanvas*0.03;
    nave.position.x = widthCanvas/2;
    nave.position.y = heightCanvas/2;
    nave.anchor.setTo(0.5, 0.5);
    
    game.physics.enable(nave, Phaser.Physics.ARCADE);

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
        //fireBullet();
    }

    //screenWrap(sprite);
}

function render () {

}