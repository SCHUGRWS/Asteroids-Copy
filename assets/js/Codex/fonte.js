var assets=[
    {"tipo":"image","nome":"fundo","asset":"assets/images/Fundo Escurecido.png"},
    {"tipo":"image","nome":"nave","asset":"assets/images/Nave.png"},
    {"tipo":"image","nome":"tiro","asset":"assets/images/Tiro Risco.png"},
    {"tipo":"image","nome":"meteoroGrande","asset":"assets/images/Meteoro Branco Grande.png"},
    {"tipo":"image","nome":"meteoroMedio","asset":"assets/images/Meteoro Branco Grande.png"},
    {"tipo":"image","nome":"meteoroPequeno","asset":"assets/images/Meteoro Branco Grande.png"},
    {"tipo":"image","nome":"explosaoMeteoro","asset":"assets/images/pixel1.png"},
    {"tipo":"image","nome":"somFundo","asset":"assets/images/circulo-play.png"},
    {"tipo":"image","nome":"reset","asset":"assets/images/reset.png"},
    {"tipo":"sound","nome":"somTiro1","asset":"assets/sounds/laser.wav"},
    {"tipo":"sound","nome":"somTiro2","asset":"assets/sounds/laser2.wav"},
    {"tipo":"sound","nome":"somExplosao1","asset":"assets/sounds/explosao1.wav"},
    {"tipo":"sound","nome":"somExplosao2","asset":"assets/sounds/explosao2.wav"},
]
var arrayMeteoros=["meteoroGrande","meteoroMedio","meteoroPequeno"];

var arrayCores=["FF00A5","23FF0F","FFBB00","FF0015","FFFF00","FF0000","D4FF02","FF00D8","00F6FF","54FF00","33FF00","0800FF","F600FF","FF6100","FF5400"];

var widthCanvas = document.getElementById('canvasGame').offsetWidth;
var heightCanvas = document.getElementById('canvasGame').offsetHeight; 

heightCanvas=window.screen.height*0.87;

var score = 0;

var scoreFase = 2000;

var mensagemFase;

var meteorosPequenosDestruidos = 0;

var mensagemGameOver;

var vidas = 3;

var vida = [];

var morto=false;

var somExplosao;
var somTiro;

var game = new Phaser.Game(widthCanvas, heightCanvas, Phaser.AUTO, 'canvasGame', { preload: preload, create: create, update: update });
//game.x = 200;
preload();
create();

var nave;
var reset;

var cursors;

var tiro;
var tiros;
var tiroTime = game.time.now;
var tiroTime=0;

var explosaoMeteoro;

var mensgemScore;

function preload() {

    //game.load.baseURL = 'http://examples.phaser.io/assets/';
    //game.load.crossOrigin = 'Catolica SC - ';
    
    //game.stage.backgroundColor = '#000000';
    
    assets.forEach(loadAssets);
    

}


function create() {
    
    //var fundo = game.add.sprite(0,0,'fundo');
    //fundo.width = widthCanvas*0.99;
    //fundo.height = heightCanvas;
    
    if(!(parseFloat(game.time.now)>tiroTime)){
        tiroTime = game.time.now + 0.001;
    }
    
    var style = { font: "bold 36px Arial", fill: "#ffffff" };
    
    mensagemFase = game.add.text((widthCanvas*0.9)-200, 15, "teste"+score, style);

        //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
    mensagemFase.setTextBounds(50, 15, 200, 100);
    
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
    
    carregaVidas();
    
    //  Our ships tiros
    tiros = game.add.group();
    tiros.enableBody = true;
    tiros.physicsBodyType = Phaser.Physics.ARCADE;

    //  All 40 of them
    tiros.createMultiple(40, 'tiro');
    tiros.setAll('anchor.x', 0.58);
    tiros.setAll('anchor.y', 1);

    meteoros = game.add.group();
    meteoros.enableBody = true;
    meteoros.physicsBodyType = Phaser.Physics.ARCADE;
    
    nave.body.drag.set(100);
    nave.body.maxVelocity.set(200);

    //  Game input
    cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
    
    criarMeteoro(undefined,undefined,arrayMeteoros[0],8,undefined,undefined);
    //criarMeteoro(undefined,undefined,arrayMeteoros[2],10,50,50);
    //criarMeteoro(undefined,undefined,arrayMeteoros[3],10,25,25);
    
    //nave.rotation = 90;

}



function update () {
    //nave.rotation = game.physics.arcade.angleToPointer(nave)+1.55;
    if (cursors.up.isDown)
    {
        game.physics.arcade.accelerationFromRotation(nave.rotation-1.55, 400, nave.body.acceleration);
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
    
    meteoros.forEachExists(screenWrap, this);
    
    game.physics.arcade.overlap(nave, meteoros, colisaoMeteroro, null, this);
    
    game.physics.arcade.overlap(tiros, meteoros, colisaoMeteroro, null, this);
    
    
    tiros.forEachExists(screenWrap, this);
    
    mensagemFase.setText(""+score);
}


function disparoNave () {

    if((parseFloat(game.time.now)>tiroTime)&&(!morto)){
        tiro = tiros.getFirstExists(false);
        if (tiro)
        {
            tiro.reset(nave.body.x+(nave.width/2), nave.body.y + 20);
            tiro.lifespan = 2000;
            tiro.width = widthCanvas*0.01;
            tiro.height = widthCanvas*0.03;
            tiro.rotation = nave.rotation-0.0001;
            game.physics.arcade.velocityFromRotation(nave.rotation-1.5555, 400, tiro.body.velocity);
            somTiro = game.add.audio('somTiro2');
            somTiro.play();
            tiroTime = game.time.now + 300;
        }
    }

}

//function geraMeteoro (x,y,tipo,quantidade) {
//
//    if (tipo===undefined){
//        tipo = 1;
//    }
//    
//    if(tipo == 1){
//        if(parseFloat(game.time.now)>meteroroTime){
//            meteoroGrande = meteorosGrandes.getFirstExists(false);
//            if (meteoroGrande)
//            {
//                meteoroGrande.tint ="0x"+arrayCores[Math.floor(Math.random() * arrayCores.length)];
//                meteoroGrande.reset(widthCanvas+Math.round(Math.random()), heightCanvas+Math.round(Math.random()));
//                meteoroGrande.lifespan = 0;
//                meteoroGrande.width = 100;
//                meteoroGrande.height = 100;
//
//                meteoroGrande.anchor.set(0.5, 0.5);
//                meteoroGrande.body.angularVelocity = game.rnd.integerInRange(10,20);
//
//                var randomAngle = game.math.degToRad(game.rnd.angle());
//                game.physics.arcade.velocityFromRotation(randomAngle, 200, meteoroGrande.body.velocity);
//                meteroroTime = game.time.now + 600;
//            }
//        }
//    }
//    
//    if(tipo == 2){
//        if (quantidade === undefined) { quantidade = 1; }
//        
//        for (var i=0; i<pieces; i++) {
//            var meteoroMedio = this.asteroidGroup.create(x, y, size);
//            asteroid.anchor.set(0.5, 0.5);
//            asteroid.body.angularVelocity = game.rnd.integerInRange(asteroidProperties[size].minAngularVelocity, asteroidProperties[size].maxAngularVelocity);
// 
//            var randomAngle = game.math.degToRad(game.rnd.angle());
//            var randomVelocity = game.rnd.integerInRange(asteroidProperties[size].minVelocity, asteroidProperties[size].maxVelocity);
// 
//            game.physics.arcade.velocityFromRotation(randomAngle, randomVelocity, asteroid.body.velocity);
//        }
//    }
//
//}

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

function colisaoMeteroro (objeto, meteoro) {
    objeto.kill();
    
    console.log(objeto.key);
    
    if(objeto.key=="nave" && objeto.key!="tiro"){
        vidas=vidas-1;
        calculaVida();
        morto=true;
        if(vidas >0){
            game.time.events.add(Phaser.Timer.SECOND * 3, restauraNave, this);
        }
        if(vidas==0){
            var style = { font: "bold 36px Arial", fill: "#ffffff" };
    
            mensagemGameOver = game.add.text(((widthCanvas/2)-100), ((heightCanvas/2)-100), "GAME OVER", style);
            reset = game.add.sprite(0,0,'reset');
            reset.width = widthCanvas*0.15;
            reset.height = heightCanvas*0.1;
            reset.position.x = (widthCanvas/2)-90;
            reset.position.y = (heightCanvas/2)-20;
            reset.inputEnabled = true;
            reset.events.onInputDown.add(resetar, this);
        }
    }
    
    dadosMeteoro=meteoro;
    
    meteoro.kill();
    
    somExplosao = game.add.audio('somExplosao2');
    somExplosao.play();
    explosaoMeteoroDestruidos(meteoro);
    dividirMeteoro(meteoro);
}

function criarMeteoro (x, y, tipo, quantidade, tamanhoX, tamanhoY) {
    if(x===undefined){
        x=widthCanvas+Math.round(Math.random())
    }
    
    if(y===undefined){
        y=heightCanvas+Math.round(Math.random())
    }
    
    if(tamanhoX===undefined){
        tamanhoX=100;
    }
    
    if(tamanhoY===undefined){
        tamanhoY=100;
    }
    
    var count=0;
    
    for(count=0;count<quantidade;count++){
        
        var meteoro = this.meteoros.create(x, y, tipo);
        meteoro.tint ="0x"+arrayCores[Math.floor(Math.random() * arrayCores.length)];
        meteoro.lifespan = 0;
        meteoro.width = tamanhoX;
        meteoro.height = tamanhoY;

        meteoro.anchor.set(0.5, 0.5);
        meteoro.body.angularVelocity = game.rnd.integerInRange(10,20);

        var randomAngle = game.math.degToRad(game.rnd.angle());
        game.physics.arcade.velocityFromRotation(randomAngle, 200, meteoro.body.velocity);
    }
        
}

function loadAssets(asset){
    if (asset.tipo=="image"){
        game.load.image(asset.nome, asset.asset);
    }
    if (asset.tipo=="sound"){
        game.load.audio(asset.nome, asset.asset);
    }
    
}

function dividirMeteoro(meteoro){
    if(meteoro.key==arrayMeteoros[0]){
        criarMeteoro(meteoro.x,meteoro.y,arrayMeteoros[1],2,50,50);
        score = score + 10;
    }
    if(meteoro.key==arrayMeteoros[1]){
        criarMeteoro(meteoro.x,meteoro.y,arrayMeteoros[2],3,25,25);
        score = score + 25;
    }
    if(meteoro.key==arrayMeteoros[2]){
        score = score + 50;
        meteorosPequenosDestruidos=meteorosPequenosDestruidos+1;
        if(meteorosPequenosDestruidos >= 6){
            meteorosPequenosDestruidos = 0;
            criarMeteoro(undefined,undefined,arrayMeteoros[0],1,undefined,undefined);
        }
    }
}

function explosaoMeteoroDestruidos(meteoro){
    explosaoMeteoro = game.add.emitter(meteoro.x,meteoro.y,10);
   
    explosaoMeteoro.makeParticles('explosaoMeteoro');
    
    //explosaoMeteoro.makeParticles('somFundo');
    
    //explosaoMeteoro.width=1000;
    //explosaoMeteoro.height=1000;
    
    explosaoMeteoro.setRotation(0,0);
    explosaoMeteoro.setAlpha(0.2,0.4);
    explosaoMeteoro.gravity = 0;
    
    explosaoMeteoro.hash.forEach(loadEmitter, this);
    
    explosaoMeteoro.start(false,1500,0.001,10);
    
    
    
}

function loadEmitter(emmiter){
    
}

function carregaVidas(){
    var i = 0;
    var distancia=20;
    
    for(i=0;i<vidas;i++){
        vida[i] = game.add.sprite(0,0,'nave');
        vida[i].width = widthCanvas*0.03;
        vida[i].height = widthCanvas*0.03;
        vida[i].position.x = distancia;
        vida[i].position.y = 15;
        distancia = distancia+45;
    }
}

function calculaVida(){
    if(vidas<3){
        vida[vidas].visible=false;
    }
    if(vidas > 0){
        vida[vidas-1].visible=true;
    }
}

function restauraNave(){
    nave.reset(widthCanvas/2, heightCanvas/2);
    morto=false;
}

function resetar(){
    vidas = 3;
    carregaVidas();
    
    reset.kill();
    mensagemGameOver.kill();
    score = 0;
    
    restauraNave();
}

function render () {

}
