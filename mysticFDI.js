/* globals Quintus:false */
/*jshint strict: false */


window.addEventListener("load", function() {

    var Q = window.Q = Quintus({ audioSupported: ['mp3', 'ogg'] })
        .include("Sprites, Scenes, Input, Touch, UI, TMX, Anim, 2D, Audio")
        .setup({ width: 320, height: 480 })
        .controls().touch()
        .enableSound();


    Q.load(["fdi.png", "flechaI.png", "flechaD.png", "tick1.png"], function() {

    });
    Q.scene("level1", function(stage) {
        Q.stageTMX("level.tmx", stage);
        stage.add("viewport");

    });


    Q.load([""], function() {
        Q.loadTMX("level.tmx", function() {
            Q.stageScene("startGame");
        });
    });

    // Q.loadTMX("start.tmx", function() {

    //     Q.stageScene("screenMain");

    // });
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
        }))
        var flechaD = box.insert(new Q.UI.Button({
            x: 110,
            y: -210,

            asset: "flechaD.png"
        }))

        var button2 = box.insert(new Q.UI.Button({
            x: -70,
            y: -150,

            w: 150,
            fill: "#CCCCCC",

            label: "Alquimia"
        }))

        var button3 = box.insert(new Q.UI.Button({
            x: -70,
            y: -90,
            //w: 20,
            //h: 20,
            w: 150,
            fill: "#CCCCCC",
            label: "Edificios"

        }))

        var button4 = box.insert(new Q.UI.Button({
            x: -70,
            y: -30,
            w: 150,
            fill: "#CCCCCC",
            label: "Aprender"
        }))
        var button5 = box.insert(new Q.UI.Button({
            x: -70,
            y: 30,
            w: 150,
            fill: "#CCCCCC",
            label: "Reclutar"
        }))

        var label = stage.insert(new Q.UI.Text({ x: 250, y: 60, size: 17, label: "Coins: 0" }));
        Q.state.on("change.coins", this, function(coins) {
            label.p.label = "coins: " + coins;
        });

        if (Q.state.p.taquillas == true) {
            button2.on("click", function() {

                Q.state.inc("coins", 1);

            });
        }

        button3.on("click", function() {
            Q.clearStages();

            Q.stageScene("edificios");

        });
        button4.on("click", function() {
            Q.clearStages();

            Q.stageScene("aprender");

        });
        button5.on("click", function() {
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
        }))

        var logros = box.insert(new Q.UI.Button({
            x: -70,
            y: -150,

            w: 150,
            fill: "#CCCCCC",

            label: "Logros"
        }))

        var salir = box.insert(new Q.UI.Button({
            x: -70,
            y: -90,
            //w: 20,
            //h: 20,
            w: 150,
            fill: "#CCCCCC",
            label: "Salir"

        }))



        flechaD.on("click", function() {
            Q.clearStages();

            Q.stageScene("screenMain");

        });

        salir.on("click", function() {
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
        }))

        var button2 = box.insert(new Q.UI.Button({
            x: -70,
            y: -150,

            w: 150,
            fill: "#CCCCCC",

            label: "Taquillas"
        }))



        var button3 = box.insert(new Q.UI.Button({
            x: -70,
            y: -90,
            w: 150,
            fill: "#CCCCCC",
            label: "Clase"
        }))
        var labelClase = box.insert(new Q.UI.Text({
            x: 50,
            y: -105,
            label: "x500",
            size: 20
        }));

        var button4 = box.insert(new Q.UI.Button({
            x: -70,
            y: -30,
            w: 150,
            fill: "#CCCCCC",
            label: "Quiosco"
        }))
        var button5 = box.insert(new Q.UI.Button({
            x: -70,
            y: 30,
            w: 150,
            fill: "#CCCCCC",
            label: "Aparcamiento"
        }))


        flechaI.on("click", function() {
            Q.clearStages();
            Q.stageScene("screenMain");

        });

        button2.on("click", function() {
            Q.state.p.taquillas = true;
            box.insert(new Q.UI.Button({ x: 50, y: -145, asset: "tick1.png" }));



        });

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
        }))

        var button2 = box.insert(new Q.UI.Button({
            x: -70,
            y: -150,

            w: 150,
            fill: "#CCCCCC",

            label: "C++"
        }))

        var button3 = box.insert(new Q.UI.Button({
            x: -70,
            y: -90,
            w: 150,
            fill: "#CCCCCC",
            label: "Java"
        }))

        var button4 = box.insert(new Q.UI.Button({
            x: -70,
            y: -30,
            w: 150,
            fill: "#CCCCCC",
            label: "Gestion"
        }))
        var button5 = box.insert(new Q.UI.Button({
            x: -70,
            y: 30,
            w: 150,
            fill: "#CCCCCC",
            label: "C"
        }))


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
        }))

        var button2 = box.insert(new Q.UI.Button({
            x: -70,
            y: -150,

            w: 150,
            fill: "#CCCCCC",

            label: "Hacer amigos"
        }))




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

        var button = box.insert(new Q.UI.Button({ asset: "fdi.png" }));
        Q.input.on("confirm", button, function() {
            Q.clearStages();
            Q.stageScene("screenMain");
            //Q.stageScene("coins", 2);



        });
        button.on("click", function() {
            Q.clearStages();
            Q.stageScene('screenMain');
            //Q.stageScene("coins", 2);


        });


    });

});
