/* globals Quintus:false */
/*jshint strict: false */


window.addEventListener("load", function() {

    var Q = window.Q = Quintus({ audioSupported: ['mp3', 'ogg'] })
        .include("Sprites, Scenes, Input, Touch, UI, TMX, Anim, 2D, Audio")
        .setup({ width: 320, height: 480 })
        .controls().touch()
        .enableSound();

    Q.scene("level1", function(stage) {
        Q.stageTMX("level.tmx", stage);
        stage.add("viewport");
    });


    Q.load(["fdi.png", "flechaI.png", "flechaD.png", "tick1.png", "puerta/1.png", "puerta/2.png", "puerta/3.png", "puerta/4.png", "puerta/5.png", "puerta/6.png", "coins.mp3", "coins.ogg"], function() {
        Q.loadTMX("level.tmx", function() {
            Q.stageScene("startGame");
        });
    });

   
    Q.scene('screenMain', function(stage) {

        stage.insert(new Q.Repeater({ asset: "fdi.png" }));
        
        var box = stage.insert(new Q.UI.Container({
            x: Q.width / 2,
            y: Q.height / 2,
        }));

        var label = box.insert(new Q.UI.Text({
            x: 0,
            y: -225,
            label: "Organizacion",
            size: 20
        }));

        var flechaI = box.insert(new Q.UI.Button({
            x: -110,
            y: -210,
            asset: "flechaI.png"
        }));

        /*var flechaD = box.insert(new Q.UI.Button({
            x: 110,
            y: -210,
            asset: "flechaD.png"
        }))*/

        var botonAlquimia = box.insert(new Q.UI.Button({
            x: -70,
            y: -150,
            w: 150,
            fill: "#CCCCCC",
            label: "Alquimia"
        }));

        var botonEdificios = box.insert(new Q.UI.Button({
            x: -70,
            y: -90,
            w: 150,
            fill: "#CCCCCC",
            label: "Edificios"
        }));

        var botonAprender = box.insert(new Q.UI.Button({
            x: -70,
            y: -30,
            w: 150,
            fill: "#CCCCCC",
            label: "Aprender"
        }));

        var botonReclutar = box.insert(new Q.UI.Button({
            x: -70,
            y: 30,
            w: 150,
            fill: "#CCCCCC",
            label: "Reclutar"
        }));

        var label = stage.insert(new Q.UI.Text({ x: 250, y: 80, size: 17, label: "Coins: " + Q.state.p.coins }));

        Q.state.on("change.coins", this, function(coins) {
            label.p.label = "Coins: " + coins;
        });

        if (Q.state.p.taquillas) {
            botonAlquimia.on("click", function() {
                Q.audio.play("coins.mp3");
                Q.state.inc("coins", 1);
            });
        }

        botonEdificios.on("click", function() {
            Q.clearStages();
            Q.stageScene("edificios");
        });

        botonAprender.on("click", function() {
            Q.clearStages();
            Q.stageScene("aprender");
        });

        botonReclutar.on("click", function() {
            Q.clearStages();
            Q.stageScene("reclutar");
        });

        flechaI.on("click", function() {
            Q.clearStages();
            Q.stageScene("expedicion");
        });

    });


    Q.scene('expedicion', function(stage) {

        stage.insert(new Q.Repeater({ asset: "fdi.png" }));
        var box = stage.insert(new Q.UI.Container({
            x: Q.width / 2,
            y: Q.height / 2,
        }));

        var label = box.insert(new Q.UI.Text({
            x: 0,
            y: -225,
            label: "Expedición",
            size: 20
        }));

        var flechaD = box.insert(new Q.UI.Button({
            x: 110,
            y: -210,
            asset: "flechaD.png"
        }));

        var botonLogros = box.insert(new Q.UI.Button({
            x: -70,
            y: -150,
            w: 150,
            fill: "#CCCCCC",
            label: "Logros"
        }));

        var botonSalir = box.insert(new Q.UI.Button({
            x: -70,
            y: -90,
            w: 150,
            fill: "#CCCCCC",
            label: "Salir"
        }));

        flechaD.on("click", function() {
            Q.clearStages();
            Q.stageScene("screenMain");
        });

        botonSalir.on("click", function() {
            Q.clearStages();
            Q.stageScene("level1");
        });

    });


    Q.scene('edificios', function(stage) {
        stage.insert(new Q.Repeater({ asset: "fdi.png" }));

        var box = stage.insert(new Q.UI.Container({
            x: Q.width / 2,
            y: Q.height / 2
        }));

        var label = box.insert(new Q.UI.Text({
            x: 0,
            y: -225,
            label: "Edificios",
            size: 20
        }));

        var flechaI = box.insert(new Q.UI.Button({
            x: -110,
            y: -210,
            asset: "flechaI.png"
        }));

        var botonTaquillas = box.insert(new Q.UI.Button({
            x: -70,
            y: -150,
            w: 150,
            fill: "#CCCCCC",
            label: "Taquillas"
        }));

        var botonClase = box.insert(new Q.UI.Button({
            x: -70,
            y: -90,
            w: 150,
            fill: "#CCCCCC",
            label: "Clase"
        }));

        var labelClase = box.insert(new Q.UI.Text({
            x: 50,
            y: -105,
            label: "x500",
            size: 20
        }));

        var botonQuiosco = box.insert(new Q.UI.Button({
            x: -70,
            y: -30,
            w: 150,
            fill: "#CCCCCC",
            label: "Quiosco"
        }));

        var botonAparcamiento = box.insert(new Q.UI.Button({
            x: -70,
            y: 30,
            w: 150,
            fill: "#CCCCCC",
            label: "Aparcamiento"
        }));

        flechaI.on("click", function() {
            Q.clearStages();
            Q.stageScene("screenMain");
        });

        botonTaquillas.on("click", function() {
            Q.state.p.taquillas = true;
            box.insert(new Q.UI.Button({ x: 50, y: -145, asset: "tick1.png" }));
        });

        if(Q.state.p.taquillas){
            box.insert(new Q.UI.Button({ x: 50, y: -145, asset: "tick1.png" }));
        }
    });


    Q.scene('aprender', function(stage) {
        stage.insert(new Q.Repeater({ asset: "fdi.png" }));

        var box = stage.insert(new Q.UI.Container({
            x: Q.width / 2,
            y: Q.height / 2
        }));

        var label = box.insert(new Q.UI.Text({
            x: 0,
            y: -225,
            label: "Aprender",
            size: 20
        }));

        var flechaI = box.insert(new Q.UI.Button({
            x: -110,
            y: -210,
            asset: "flechaI.png"
        }));

        var botonCmasmas = box.insert(new Q.UI.Button({
            x: -70,
            y: -150,
            w: 150,
            fill: "#CCCCCC",
            label: "C++"
        }));

        var botonJava = box.insert(new Q.UI.Button({
            x: -70,
            y: -90,
            w: 150,
            fill: "#CCCCCC",
            label: "Java"
        }));

        var botonGestion = box.insert(new Q.UI.Button({
            x: -70,
            y: -30,
            w: 150,
            fill: "#CCCCCC",
            label: "Gestión"
        }));

        var botonC = box.insert(new Q.UI.Button({
            x: -70,
            y: 30,
            w: 150,
            fill: "#CCCCCC",
            label: "C"
        }));

        flechaI.on("click", function() {
            Q.clearStages();
            Q.stageScene("screenMain");
        });
    });


    Q.scene('reclutar', function(stage) {
        stage.insert(new Q.Repeater({ asset: "fdi.png" }));

        var box = stage.insert(new Q.UI.Container({
            x: Q.width / 2,
            y: Q.height / 2
        }));

        var label = box.insert(new Q.UI.Text({
            x: 0,
            y: -225,
            label: "Reclutar",
            size: 20
        }));

        var flechaI = box.insert(new Q.UI.Button({
            x: -110,
            y: -210,
            asset: "flechaI.png"
        }));

        var botonAmigos = box.insert(new Q.UI.Button({
            x: -70,
            y: -150,
            w: 150,
            fill: "#CCCCCC",
            label: "Hacer amigos"
        }));

        flechaI.on("click", function() {
            Q.clearStages();
            Q.stageScene("screenMain");
        });
    });


    Q.scene('startGame', function(stage) {

        var box = stage.insert(new Q.UI.Container({
            x: Q.width / 2,
            y: Q.height / 2
        }));

        Q.state.reset({ coins: 0, taquillas: false });

        var button = box.insert(new Q.UI.Button({ asset: "puerta/1.png" }));

        var empezarJuego = function(){
            box.insert(new Q.UI.Button({ asset: "puerta/2.png" }));
            setTimeout(function(){box.insert(new Q.UI.Button({ asset: 'puerta/3.png' }));}, 200);
            setTimeout(function(){box.insert(new Q.UI.Button({ asset: 'puerta/4.png' }));}, 400);
            setTimeout(function(){box.insert(new Q.UI.Button({ asset: 'puerta/5.png' }));}, 600);
            setTimeout(function(){box.insert(new Q.UI.Button({ asset: 'puerta/6.png' }));}, 800);
            setTimeout(function(){Q.stageScene("screenMain");}, 1500);
        };

        Q.input.on("confirm", button, function() {
            empezarJuego();
        });

        button.on("click", function() {
            empezarJuego();
        });
    });

});
