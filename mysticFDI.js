/* globals Quintus:false */
/*jshint strict: false */


window.addEventListener("load", function() {

    var Q = window.Q = Quintus({ audioSupported: ['mp3', 'ogg'] })
        .include("Sprites, Scenes, Input, Touch, UI, TMX, Anim, 2D, Audio")
        .setup({ width: 320, height: 480 })
        .controls().touch()
        .enableSound();


    Q.animations('player_anim', {
        front: { frames: [0, 1, 2, 3], rate: 1 / 30, loop: false },
        side_right: { frames: [4, 5, 6, 7], rate: 1 / 7, loop: false, flip: false },
        side_left: { frames: [4, 5, 6, 7], rate: 1 / 7, loop: false, flip: "x" },
        back: { frames: [8, 9, 10, 11], rate: 1 / 7, loop: false }
    });

    Q.load(["fdi.png", "fletxaI.png", "fletxaD.png", "tick1.png", "puerta/1.png", "puerta/2.png", "puerta/3.png", "puerta/4.png", "puerta/5.png", "puerta/6.png", "personaje.png", "player.json", "coins.mp3", "coins.ogg"], function() {
        Q.loadTMX("prueba.tmx", function() {
            Q.compileSheets("personaje.png", "player.json");
            Q.stageScene("startGame");
        });
    });

    Q.scene("level1", function(stage) {
        Q.stageTMX("prueba.tmx", stage);
        stage.add("viewport");
        var player = stage.insert(new Q.Player({ x: 250, y: 350, scale: 1 / 7 }));

        stage.add("viewport").follow(player);
    });




    Q.Sprite.extend("Player", {
        init: function(p) {
            this._super(p, { sheet: "front", sprite: "player_anim", gravity: 0 });
            this.add('2d, stepControls, animation');
        },

        step: function(dt) {
            Q.input.on("right", this, function() {
                this.play("side_right");
            });

            Q.input.on("left", this, function() {
                this.play("side_left");
            });

            Q.input.on("up", this, function() {
                this.play("back");
            });

            Q.input.on("down", this, function() {
                this.play("front");
            });
        }
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
            asset: "fletxaI.png"
        }));

        /*var flechaD = box.insert(new Q.UI.Button({
            x: 110,
            y: -210,
            asset: "fletxaD.png"
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
        //coins
        var labelCoins = stage.insert(new Q.UI.Text({ x: 250, y: 80, size: 17, label: "Coins: " + Q.state.p.coins }));

        Q.state.on("change.coins", this, function(coins) {
            labelCoins.p.label = "Coins: " + coins;
        });

        //c++
        var labelCmasmas = stage.insert(new Q.UI.Text({ x: 250, y: 110, size: 17, label: "C++: " + Q.state.p.cmasmas }));

        Q.state.on("change.cmasmas", this, function(cmasmas) {
            labelCmasmas.p.label = "C++: " + cmasmas;
        });

        //gestion
        var labelGestion = stage.insert(new Q.UI.Text({ x: 250, y: 140, size: 17, label: "Gestión: " + Q.state.p.gestion }));

        Q.state.on("change.gestion", this, function(gestion) {
            labelGestion.p.label = "Gestión: " + gestion;
        });

        //c

        var labelC = stage.insert(new Q.UI.Text({ x: 250, y: 170, size: 17, label: "C: " + Q.state.p.c }));

        Q.state.on("change.gestion", this, function(c) {
            labelC.p.label = "C: " + c;
        });

        //ensamblador

        var labelEnsamblador = stage.insert(new Q.UI.Text({ x: 250, y: 200, size: 17, label: "Ensamblador: " + Q.state.p.ensamblador }));

        Q.state.on("change.gestion", this, function(ensamblador) {
            labelEnsamblador.p.label = "Ensamblador: " + ensamblador;
        });

        //matematicas
        var labelMatematicas = stage.insert(new Q.UI.Text({ x: 250, y: 230, size: 17, label: "Matematicas: " + Q.state.p.matematicas }));

        Q.state.on("change.matematicas", this, function(matematicas) {
            labelMatematicas.p.label = "Matematicas: " + matematicas;
        });

        //fisica

        var labelFisica = stage.insert(new Q.UI.Text({ x: 250, y: 260, size: 17, label: "Fisica: " + Q.state.p.fisica }));

        Q.state.on("change.fisica", this, function(fisica) {
            labelFisica.p.label = "Fisica: " + fisica;
        });


        botonAlquimia.on("click", function() {
            Q.audio.play("coins.mp3");
            Q.state.inc("coins", 1);
        });


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
            asset: "fletxaD.png"
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
            asset: "fletxaI.png"
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

        var botonCocina = box.insert(new Q.UI.Button({
            x: -70,
            y: -30,
            w: 150,
            fill: "#CCCCCC",
            label: "Cocina"
        }));

        var botonCafeteria = box.insert(new Q.UI.Button({
            x: -70,
            y: 30,
            w: 150,
            fill: "#CCCCCC",
            label: "Cafeteria"
        }));


        var botonAparcamiento = box.insert(new Q.UI.Button({
            x: -70,
            y: 60,
            w: 150,
            fill: "#CCCCCC",
            label: "Aparcamiento"
        }));

        flechaI.on("click", function() {
            Q.clearStages();
            Q.stageScene("screenMain");
        });

        botonTaquillas.on("click", function() {
            if (!Q.state.p.taquillas) {
                dinero = comprobarDinero(1, "edificios")
                if (dinero) {
                    Q.state.p.taquillas = true;
                    box.insert(new Q.UI.Button({ x: 50, y: -145, asset: "tick1.png" }));
                    Q.state.dec("coins", 1);
                }
            }
        });

        if (Q.state.p.taquillas) {
            box.insert(new Q.UI.Button({ x: 50, y: -145, asset: "tick1.png" }));
        } else {
            var labelTaquillas = box.insert(new Q.UI.Text({
                x: 50,
                y: -155,
                label: "x1",
                size: 20
            }));
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
            asset: "fletxaI.png"
        }));

        var botonCmasmas = box.insert(new Q.UI.Button({
            x: -70,
            y: -150,
            w: 150,
            fill: "#CCCCCC",
            label: "C++"
        }));
        var labelCmasmas = box.insert(new Q.UI.Text({
            x: 70,
            y: -160,
            label: "x80",
            size: 20
        }));

        var botonEnsamblador = box.insert(new Q.UI.Button({
            x: -70,
            y: -90,
            w: 150,
            fill: "#CCCCCC",
            label: "Ensamblador"
        }));

        var labelEnsamblador = box.insert(new Q.UI.Text({
            x: 70,
            y: -100,
            label: "x150",
            size: 20
        }));

        var botonGestion = box.insert(new Q.UI.Button({
            x: -70,
            y: -30,
            w: 150,
            fill: "#CCCCCC",
            label: "Gestión"
        }));

        var labelGestion = box.insert(new Q.UI.Text({
            x: 70,
            y: -40,
            label: "x50",
            size: 20
        }));

        var botonMatematicas = box.insert(new Q.UI.Button({
            x: -70,
            y: 30,
            w: 150,
            fill: "#CCCCCC",
            label: "Matematicas"
        }));

        var labelMatematicas = box.insert(new Q.UI.Text({
            x: 70,
            y: 20,
            label: "x150",
            size: 20
        }));

        var botonC = box.insert(new Q.UI.Button({
            x: -70,
            y: 90,
            w: 150,
            fill: "#CCCCCC",
            label: "C"
        }));

        var labelC = box.insert(new Q.UI.Text({
            x: 70,
            y: 80,
            label: "x120",
            size: 20
        }));
        var botonFisica = box.insert(new Q.UI.Button({
            x: -70,
            y: 150,
            w: 150,
            fill: "#CCCCCC",
            label: "Fisica"
        }));

        var labelFisica = box.insert(new Q.UI.Text({
            x: 70,
            y: 140,
            label: "x50",
            size: 20
        }));

        flechaI.on("click", function() {
            Q.clearStages();
            Q.stageScene("screenMain");
        });

        botonCmasmas.on("click", function() {
            dinero = comprobarDinero(80, "aprender")
            if (dinero) {
                Q.state.dec("coins", 80);
                Q.state.inc("cmasmas", 1);
            }
        });

        botonGestion.on("click", function() {
            dinero = comprobarDinero(50, "aprender")
            if (dinero) {
                Q.state.dec("coins", 50);
                Q.state.inc("gestion", 1);
            }
        });

        botonC.on("click", function() {
            dinero = comprobarDinero(120, "aprender")
            if (dinero) {
                Q.state.dec("coins", 120);
                Q.state.inc("c", 1);
            }
        });

        botonEnsamblador.on("click", function() {
            dinero = comprobarDinero(150, "aprender")
            if (dinero) {
                Q.state.dec("coins", 150);
                Q.state.inc("ensamblador", 1);
            }
        });

        botonMatematicas.on("click", function() {
            dinero = comprobarDinero(150, "aprender")
            if (dinero) {
                Q.state.dec("coins", 150);
                Q.state.inc("matematicas", 1);
            }
        });

        botonFisica.on("click", function() {
            dinero = comprobarDinero(50, "aprender")
            if (dinero) {
                Q.state.dec("coins", 50);
                Q.state.inc("fisica", 1);
            }
        });
    });


    Q.scene('reclutar', function(stage) {
        stage.insert(new Q.Repeater({ asset: "fdi.png" }));
        var posicionY = -150;
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
            asset: "fletxaI.png"
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
        if (Q.state.p.alumnoSoftware > 0) {
            posicionY = posicionY + 60;
            var botonSoftware = box.insert(new Q.UI.Button({
                x: -70,
                y: posicionY,
                w: 150,
                fill: "#CCCCCC",
                label: "Software"
            }));
        }
        if (Q.state.p.alumnoInformatica > 0) {
            posicionY = posicionY + 60;
            var botonInformatica = box.insert(new Q.UI.Button({
                x: -70,
                y: posicionY,
                w: 150,
                fill: "#CCCCCC",
                label: "Informatica"
            }));
            //alumnoi=new
            stage.insert(new Q.UI.Text({ x: 50, y: posicionY, size: 12, label: "Vida: " + Q.state.p.c }));
        }
        if (Q.state.p.alumnoComputadores) {
            posicionY = posicionY + 60;
            var botonComputadores = box.insert(new Q.UI.Button({
                x: -70,
                y: posicionY,
                w: 150,
                fill: "#CCCCCC",
                label: "computadores"
            }));
        }

        botonAmigos.on("click", function() {
            Q.stageScene("elegirPersonaje", 1, { escena: "reclutar" });
        });
    });


    function comprobarDinero(precio, escena) {
        if (precio > Q.state.p.coins) {
            Q.stageScene("dineroInsuficiente", 1, { escena: escena, label: "No tienes dinero suficiente" });
            return false;
        } else
            return true;
    }


    function comprobarConocimientos(conocimiento1, conocimiento2, tipoAlumno, escena) {
        if (tipoAlumno.conocimiento1 > conocimiento1 || tipoAlumno.conocimiento2 > conocimiento2) {
            Q.stageScene("dineroInsuficiente", 1, { escena: escena, label: "No tienes conocimientos suficientes" });
            return false;
        } else
            return true;
    }


    Q.scene('dineroInsuficiente', function(stage) {

        var box = stage.insert(new Q.UI.Container({
            x: Q.width / 2,
            y: Q.height / 2,
            fill: "#F0F8FF"
        }));

        var button = box.insert(new Q.UI.Button({
            x: 0,
            y: 0,
            size: 15,
            fill: "#CCCCCC",
            label: "Aceptar"
        }));
        var label = box.insert(new Q.UI.Text({
            x: 10,
            size: 15,
            y: -10 - button.p.h,
            label: stage.options.label
        }));
        button.on("click", function() {
            Q.clearStages();
            Q.stageScene(stage.options.escena);
        });

        box.fit(20);

    });


    Q.scene('elegirPersonaje', function(stage) {

        var box = stage.insert(new Q.UI.Container({
            x: Q.width / 2,
            y: Q.height / 2,
            fill: "#F0F8FF"
        }));

        var software = box.insert(new Q.UI.Button({
            x: 0,
            y: -30,
            size: 8,
            fill: "#CCCCCC",
            label: "Elegir",
            font: 10
        }));
        var label = box.insert(new Q.UI.Text({
            x: 10,
            size: 10,
            y: -60,
            label: "Alumno de software x4 Gestion, x1 Matematicas"
        }));

        var computadores = box.insert(new Q.UI.Button({
            x: 0,
            y: 30,
            size: 8,
            fill: "#CCCCCC",
            label: "Elegir",
            font: 10
        }));

        var label = box.insert(new Q.UI.Text({
            x: 0,
            size: 10,
            y: 0,
            label: "Alumno de computadores x3 Ensamblador, x2 C"
        }));

        var informatica = box.insert(new Q.UI.Button({
            x: 0,
            y: 90,
            size: 8,
            fill: "#CCCCCC",
            label: "Elegir",
            font: 10
        }));

        var label = box.insert(new Q.UI.Text({
            x: 10,
            size: 10,
            y: 60,
            label: "Alumno de informatica x5 C++, x1 Fisica"
        }));

        software.on("click", function() {
            alumnoS = new Q.AlumnoSoftware();
            conocimientos = comprobarConocimientos(Q.state.p.gestion, Q.state.p.matematicas, alumnoS, "reclutar")
            if (conocimientos) {
                Q.state.inc("alumnoSoftware", 1);
            }
        });
        computadores.on("click", function() {
            alumnoS = new Q.AlumnoComputadores();
            conocimientos = comprobarConocimientos(Q.state.p.ensamblador, Q.state.p.c, alumnoS, "reclutar")
            if (conocimientos) {
                Q.state.inc("alumnoComputadores", 1);
            }
        });
        informatica.on("click", function() {
            alumnoS = new Q.AlumnoInformatica();
            conocimientos = comprobarConocimientos(Q.state.p.cmasmas, Q.state.p.fisica, alumnoS, "reclutar")
            if (conocimientos) {
                Q.state.inc("alumnoInformatica", 1);
            }
        });
        box.fit(20);

    });

    //clases
    Q.Class.extend("AlumnoSoftware", {
        init: function() {
            this.vida = 3;
            this.velocidad = 4;
            this.poder = 2;
            //gestion
            this.conocimiento1 = 4;
                //matematicas
            this.conocimiento2 = 1;


        }
    });
    Q.Class.extend("AlumnoInformatica", {
        init: function() {
            this.vida = 3;
            this.velocidad = 4;
            this.poder = 2;
            //c++
            this.conocimiento1 = 5;
            //fisica
            this.conocimiento2 = 1;


        }
    });
    Q.Class.extend("AlumnoComputadores", {
        init: function() {
            this.vida = 3;
            this.velocidad = 4;
            this.poder = 2;
            //ensamblado
            this.conocimiento1 = 3;
            //c
            this.conocimiento2 = 2;


        }
    });


    Q.scene('startGame', function(stage) {

        var box = stage.insert(new Q.UI.Container({
            x: Q.width / 2,
            y: Q.height / 2
        }));

        Q.state.reset({ coins: 0, taquillas: false, cmasmas: 0, gestion: 0, c: 0, ensamblador: 0, matematicas: 0, fisica: 0, alumnoSoftware: 0, alumnoComputadores: 0, alumnoInformatica: 1 });

        var button = box.insert(new Q.UI.Button({ asset: "puerta/1.png" }));

        var empezarJuego = function() {
            box.insert(new Q.UI.Button({ asset: "puerta/2.png" }));
            setTimeout(function() { box.insert(new Q.UI.Button({ asset: 'puerta/3.png' })); }, 200);
            setTimeout(function() { box.insert(new Q.UI.Button({ asset: 'puerta/4.png' })); }, 400);
            setTimeout(function() { box.insert(new Q.UI.Button({ asset: 'puerta/5.png' })); }, 600);
            setTimeout(function() { box.insert(new Q.UI.Button({ asset: 'puerta/6.png' })); }, 800);
            setTimeout(function() { Q.stageScene("screenMain"); }, 1500);
        };

        Q.input.on("confirm", button, function() {
            empezarJuego();
        });

        button.on("click", function() {
            empezarJuego();
        });
    });

});