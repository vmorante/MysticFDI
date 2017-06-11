/* globals Quintus:false */
/*jshint strict: false */


window.addEventListener("load", function() {

    var Q = window.Q = Quintus({ audioSupported: ['mp3', 'ogg'] })
        .include("Sprites, Scenes, Input, Touch, UI, TMX, Anim, 2D, Audio")
        .setup({ width: 320, height: 480 })
        .controls().touch()
        .enableSound();


    Q.animations('player_anim', {
        front: { frames: [0, 1, 2, 3], rate: 1 / 2.5, loop: false },
        side_right: { frames: [4, 5, 6, 7], rate: 1 / 2.5, loop: false, flip: false },
        side_left: { frames: [4, 5, 6, 7], rate: 1 / 2.5, loop: false, flip: "x" },
        back: { frames: [8, 9, 10, 11], rate: 1 / 2.5, loop: false }
    });


    Q.load(["fdi.png", "fletxaI.png", "fletxaD.png", "tick1.png", "puerta/1.jpg", "puerta/2.jpg", "puerta/3.jpg", "puerta/4.jpg", "puerta/5.jpg", "puerta/6.jpg", "puerta/7.jpg", "puerta/8.jpg", "puerta/9.jpg", "puerta/10.jpg", "puerta/11.jpg", "puerta/12.jpg", "titulo.png", "personaje.png", "player.json", "coins.mp3", "coins.ogg", "mas.png", "menos.png", "quiz.json"], function() {
        Q.loadTMX("level.tmx", function() {
            Q.compileSheets("personaje.png", "player.json");
            Q.stageScene("startGame");
        });
    });


    Q.scene("level1", function(stage) {
        Q.stageTMX("level.tmx", stage);
        Q.stageScene("salirDelMapa", 1);
        Q.stageScene("energia", 2);
        var player = stage.insert(new Q.Player({ x: Q.state.get('xPlayer'), y: Q.state.get('yPlayer'), scale: 1 / 7 }));

        var n = ((Math.random() * 6) + 1).toFixed(0);
        var x = 0,
            y = 0,
            i = 0;

        for (i; i < n; i++) {
            x = (Math.random() * (570 - 90) + 90).toFixed(1);
            y = (Math.random() * (860 - 92) + 92).toFixed(1);
            stage.insert(new Q.Profesor({ x: parseInt(x), y: parseInt(y) }));
        }

        stage.add("viewport").follow(player);
    });


    Q.scene("energia", function(stage) {
        var label = stage.insert(new Q.UI.Text({ x: Q.width / 2, y: 15, size: 12, color: "white", label: "Energía: " + Q.state.get('energia') }));
        Q.state.on("change.energia", this, function(energia) {
            if (energia === 0) {
                Q.clearStages();
                Q.stageScene("screenMain");
            }
            label.p.label = "Energía: " + energia;
        });
    });


    Q.scene("salirDelMapa", function(stage) {
        var botonSalir = stage.insert(new Q.UI.Button({
            x: Q.width - 50,
            y: 20,
            h: 20,
            w: 85,
            fill: "#CCCCCC",
            font: { size: 50 },
            label: "Salir del mapa"
        }));

        botonSalir.on("click", function() {
            Q.clearStages();
            Q.stageScene("screenMain");
        });
    });


    Q.Sprite.extend("Player", {
        init: function(p) {
            this._super(p, { sheet: "front", sprite: "player_anim", gravity: 0 });
            this.add('2d, stepControls, animation');
            this.t = 0;
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


    Q.Sprite.extend("Profesor", {
        init: function(p) {
            this._super(p, { w: 12, h: 12, gravity: 0 });
            this.add('2d');

            this.on("hit.sprite", function(collision) {
                if (collision.obj.isA("Player")) {
                    Q.state.set({ xPlayer: collision.obj.p.x, yPlayer: collision.obj.p.y });
                    Q.clearStages();
                    Q.stageScene("batalla");
                }
            });
        }
    });


    Q.scene('batalla', function(stage) {
        var box = stage.insert(new Q.UI.Container({
            x: Q.width / 2,
            y: Q.height / 2,
            fill: "rgba(0,0,0,0.5)"
        }));

        var button = box.insert(new Q.UI.Button({
            x: 0,
            y: 0,
            fill: "#CCCCCC",
            label: "Batalla"
        }));
        var quiz = box.insert(new Q.UI.Button({
            x: 0,
            y: 60,
            fill: "#CCCCCC",
            label: "Quiz"
        }));

        button.on("click", function() {
            Q.clearStages();
            Q.stageScene('level1');
        });

        quiz.on("click", function() {
            Q.clearStages();
            Q.stageScene('quiz');
        });
        box.fit(20);
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

        var flechaD = box.insert(new Q.UI.Button({
            x: 110,
            y: -210,
            asset: "fletxaD.png"
        }));

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
        var labelMatematicas = stage.insert(new Q.UI.Text({ x: 250, y: 230, size: 17, label: "Matemáticas: " + Q.state.p.matematicas }));

        Q.state.on("change.matematicas", this, function(matematicas) {
            labelMatematicas.p.label = "Matemáticas: " + matematicas;
        });

        //fisica
        var labelFisica = stage.insert(new Q.UI.Text({ x: 250, y: 260, size: 17, label: "Física: " + Q.state.p.fisica }));

        Q.state.on("change.fisica", this, function(fisica) {
            labelFisica.p.label = "Física: " + fisica;
        });

        //comida
        var labelComida = stage.insert(new Q.UI.Text({ x: 250, y: 290, size: 17, label: "Comida: " + Q.state.p.comida }));

        Q.state.on("change.comida", this, function(comida) {
            labelComida.p.label = "Comida: " + comida;
        });

        //energia
        var labelEnergia = stage.insert(new Q.UI.Text({ x: 250, y: 320, size: 17, label: "Energia: " + Q.state.p.energia }));

        Q.state.on("change.energia", this, function(energia) {
            labelEnergia.p.label = "Energia: " + energia;
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

        flechaD.on("click", function() {
            Q.clearStages();
            Q.stageScene("casa");
        });
    });


    Q.scene('expedicion', function(stage) {
        var posible = false;

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

        var masSoftware = box.insert(new Q.UI.Button({ x: 20, y: -150, asset: "mas.png" }));
        box.insert(new Q.UI.Text({ x: 85, y: -160, label: "A. software", size: 11 }));
        var textSoftware = box.insert(new Q.UI.Text({ x: 85, y: -150, label: "N: " + Q.state.p.equipoSoftware, size: 11 }));
        var menosSoftware = box.insert(new Q.UI.Button({ x: 145, y: -150, asset: "menos.png" }));

        var masInformatica = box.insert(new Q.UI.Button({ x: 20, y: -110, asset: "mas.png" }));
        box.insert(new Q.UI.Text({ x: 85, y: -120, label: "A. informatica", size: 11 }));
        var textInformatica = box.insert(new Q.UI.Text({ x: 85, y: -110, label: "N: " + Q.state.p.equipoInformatica, size: 11 }));

        var menosInformatica = box.insert(new Q.UI.Button({ x: 145, y: -110, asset: "menos.png" }));

        var masComputadores = box.insert(new Q.UI.Button({ x: 20, y: -70, asset: "mas.png" }));
        box.insert(new Q.UI.Text({ x: 85, y: -80, label: "A. computadores", size: 11 }));
        var textComputadores = box.insert(new Q.UI.Text({ x: 85, y: -70, label: "N: " + Q.state.p.equipoComputadores, size: 11 }));

        var menosComputadores = box.insert(new Q.UI.Button({ x: 145, y: -70, asset: "menos.png" }));

        Q.state.on("change.equipoSoftware", this, function(equipoSoftware) {
            textSoftware.p.label = "N: " + equipoSoftware;
        });

        Q.state.on("change.equipoInformatica", this, function(equipoInformatica) {
            textInformatica.p.label = "N: " + equipoInformatica;
        });

        Q.state.on("change.equipoComputadores", this, function(equipoComputadores) {
            textComputadores.p.label = "N: " + equipoComputadores;
        });

        flechaD.on("click", function() {
            Q.clearStages();
            Q.stageScene("screenMain");
        });

        botonSalir.on("click", function() {
            if (Q.state.get('energia') > 0) {
                Q.clearStages();
                Q.stageScene("level1");
            } else {
                Q.stageScene("materialInsuficiente", 1, { escena: "expedicion", label: "No tienes energía suficiente" });
            }
        });

        masSoftware.on("click", function() {
            posible = comprobarExpedicion(Q.state.p.alumnoSoftware, Q.state.p.equipoSoftware);
            if (posible) {
                Q.state.inc("equipoSoftware", 1);
                Q.state.inc("equipoActual", 1);
            }

        });

        menosSoftware.on("click", function() {
            if (Q.state.p.equipoSoftware > 0) {
                Q.state.dec("equipoSoftware", 1);
                Q.state.dec("equipoActual", 1);
            }

        });

        masInformatica.on("click", function() {
            posible = comprobarExpedicion(Q.state.p.alumnoInformatica, Q.state.p.equipoInformatica);
            if (posible) {
                Q.state.inc("equipoInformatica", 1);
                Q.state.inc("equipoActual", 1);
            }
        });

        menosInformatica.on("click", function() {
            if (Q.state.p.equipoInformatica > 0) {
                Q.state.dec("equipoInformatica", 1);
                Q.state.dec("equipoActual", 1);
            }

        });

        masComputadores.on("click", function() {
            posible = comprobarExpedicion(Q.state.p.alumnoComputadores, Q.state.p.equipoComputadores);
            if (posible) {
                Q.state.inc("equipoComputadores", 1);
                Q.state.inc("equipoActual", 1);
            }
        });

        menosComputadores.on("click", function() {
            if (Q.state.p.equipoComputadores > 0) {
                Q.state.dec("equipoComputadores", 1);
                Q.state.dec("equipoActual", 1);
            }
        });
    });


    function comprobarExpedicion(tipoAlumno, equipoAlumno) {
        if (tipoAlumno <= equipoAlumno || Q.state.p.equipoActual >= Q.state.p.tamañoEquipo) {
            Q.stageScene("materialInsuficiente", 1, { escena: "expedicion", label: "No tienes alumnos suficientes" });
            return false;
        } else {
            return true;
        }
    }


    Q.scene('edificios', function(stage) {
        stage.insert(new Q.Repeater({ asset: "fdi.png" }));
        var dinero = false;

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
            label: "x50",
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
            y: 90,
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
                dinero = comprobarDinero(1, "edificios");
                if (dinero) {
                    Q.state.p.taquillas = true;
                    box.insert(new Q.UI.Button({ x: 50, y: -145, asset: "tick1.png" }));
                    Q.state.dec("coins", 1);
                    labelTaquillas.destroy();
                }
            }
        });

        botonClase.on("click", function() {
            dinero = comprobarDinero(50, "edificios");
            if (dinero) {
                Q.state.inc("totalTrabajadores", 3);
                Q.state.dec("coins", 50);
            }
        });

        botonCocina.on("click", function() {
            if (!Q.state.p.cocina) {
                dinero = comprobarDinero(50, "edificios");
                if (dinero) {
                    Q.state.p.cocina = true;
                    box.insert(new Q.UI.Button({ x: 50, y: -30, asset: "tick1.png" }));
                    Q.state.dec("coins", 50);
                    labelCocina.destroy();
                }
            }
        });

        botonCafeteria.on("click", function() {
            if (!Q.state.p.cafeteria) {
                dinero = comprobarDinero(50, "edificios");
                if (dinero) {
                    Q.state.p.cafeteria = true;
                    box.insert(new Q.UI.Button({ x: 50, y: 30, asset: "tick1.png" }));
                    Q.state.dec("coins", 50);
                    labelCafeteria.destroy();
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

        if (Q.state.p.cocina) {
            box.insert(new Q.UI.Button({ x: 50, y: -30, asset: "tick1.png" }));
        } else {
            var labelCocina = box.insert(new Q.UI.Text({
                x: 50,
                y: -30,
                label: "x50",
                size: 20
            }));
        }

        if (Q.state.p.cafeteria) {
            box.insert(new Q.UI.Button({ x: 50, y: 30, asset: "tick1.png" }));
        } else {
            var labelCafeteria = box.insert(new Q.UI.Text({
                x: 50,
                y: 30,
                label: "x50",
                size: 20
            }));
        }
    });


    Q.scene('aprender', function(stage) {
        var dinero = false;
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
            label: "Matemáticas"
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
            label: "Física"
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
            dinero = comprobarDinero(80, "aprender");
            if (dinero) {
                Q.state.dec("coins", 80);
                Q.state.inc("cmasmas", 1);
            }
        });

        botonGestion.on("click", function() {
            dinero = comprobarDinero(50, "aprender");
            if (dinero) {
                Q.state.dec("coins", 50);
                Q.state.inc("gestion", 1); //200w 333h
            }
        });

        botonC.on("click", function() {
            dinero = comprobarDinero(120, "aprender");
            if (dinero) {
                Q.state.dec("coins", 120);
                Q.state.inc("c", 1);
            }
        });

        botonEnsamblador.on("click", function() {
            dinero = comprobarDinero(150, "aprender");
            if (dinero) {
                Q.state.dec("coins", 150);
                Q.state.inc("ensamblador", 1);
            }
        });

        botonMatematicas.on("click", function() {
            dinero = comprobarDinero(150, "aprender");
            if (dinero) {
                Q.state.dec("coins", 150);
                Q.state.inc("matematicas", 1);
            }
        });

        botonFisica.on("click", function() {
            dinero = comprobarDinero(50, "aprender");
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

            var alumnoS = new Q.AlumnoSoftware();
            box.insert(new Q.UI.Text({ x: 45, y: posicionY, size: 12, label: "Vida: " + alumnoS.vida }));
            box.insert(new Q.UI.Text({ x: 45, y: posicionY - 15, size: 12, label: "Poder: " + alumnoS.poder }));
            var labelSN = box.insert(new Q.UI.Text({ x: 115, y: posicionY, size: 12, label: "N: " + Q.state.p.alumnoSoftware }));
            box.insert(new Q.UI.Text({ x: 115, y: posicionY - 15, size: 12, label: "Velocidad: " + alumnoS.velocidad }));

            Q.state.on("change.alumnoSoftware", this, function(alumnoSoftware) {
                labelSN.p.label = "N: " + alumnoSoftware;
            });
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

            var alumnoI = new Q.AlumnoInformatica();
            box.insert(new Q.UI.Text({ x: 45, y: posicionY, size: 12, label: "Vida: " + alumnoI.vida }));
            box.insert(new Q.UI.Text({ x: 45, y: posicionY - 15, size: 12, label: "Poder: " + alumnoI.poder }));
            var labelIN = box.insert(new Q.UI.Text({ x: 115, y: posicionY, size: 12, label: "N: " + Q.state.p.alumnoInformatica }));
            box.insert(new Q.UI.Text({ x: 115, y: posicionY - 15, size: 12, label: "Velocidad: " + alumnoI.velocidad }));

            Q.state.on("change.alumnoInformatica", this, function(alumnoInformatica) {
                labelIN.p.label = "N: " + alumnoInformatica;
            });
        }

        if (Q.state.p.alumnoComputadores > 0) {
            posicionY = posicionY + 60;
            var botonComputadores = box.insert(new Q.UI.Button({
                x: -70,
                y: posicionY,
                w: 150,
                fill: "#CCCCCC",
                label: "computadores"
            }));

            var alumnoC = new Q.AlumnoComputadores();
            box.insert(new Q.UI.Text({ x: 45, y: posicionY, size: 12, label: "Vida: " + alumnoC.vida }));
            box.insert(new Q.UI.Text({ x: 45, y: posicionY - 15, size: 12, label: "Poder: " + alumnoC.poder }));
            var labelCN = box.insert(new Q.UI.Text({ x: 115, y: posicionY, size: 12, label: "N: " + Q.state.p.alumnoComputadores }));
            box.insert(new Q.UI.Text({ x: 115, y: posicionY - 15, size: 12, label: "Velocidad: " + alumnoC.velocidad }));

            Q.state.on("change.alumnoComputadores", this, function(alumnoComputadores) {
                labelCN.p.label = "N: " + alumnoComputadores;
            });
        }

        botonAmigos.on("click", function() {
            Q.stageScene("elegirPersonaje", 1, { escena: "reclutar" });
        });
    });


    function comprobarDinero(precio, escena) {
        if (precio > Q.state.p.coins) {
            Q.stageScene("materialInsuficiente", 1, { escena: escena, label: "No tienes dinero suficiente" });
            return false;
        } else
            return true;
    }


    function comprobarConocimientos(conocimiento1, conocimiento2, tipoAlumno, escena) {
        if (tipoAlumno.conocimiento1 > conocimiento1 || tipoAlumno.conocimiento2 > conocimiento2) {
            Q.stageScene("materialInsuficiente", 1, { escena: escena, label: "No tienes conocimientos suficientes" });
            return false;
        } else
            return true;
    }


    Q.scene('materialInsuficiente', function(stage) {

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
        var conocimientos = false;

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
            label: "Alumno de software x4 Gestion, x1 Matemáticas"
        }));

        var computadores = box.insert(new Q.UI.Button({
            x: 0,
            y: 30,
            size: 8,
            fill: "#CCCCCC",
            label: "Elegir",
            font: 10
        }));

        label = box.insert(new Q.UI.Text({
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

        label = box.insert(new Q.UI.Text({
            x: 10,
            size: 10,
            y: 60,
            label: "Alumno de informatica x5 C++, x1 Física"
        }));

        software.on("click", function() {
            var alumnoS = new Q.AlumnoSoftware();
            conocimientos = comprobarConocimientos(Q.state.p.gestion, Q.state.p.matematicas, alumnoS, "reclutar");
            if (conocimientos) {
                Q.state.inc("alumnoSoftware", 1);
            }
        });

        computadores.on("click", function() {
            var alumnoC = new Q.AlumnoComputadores();
            conocimientos = comprobarConocimientos(Q.state.p.ensamblador, Q.state.p.c, alumnoC, "reclutar");
            if (conocimientos) {
                Q.state.inc("alumnoComputadores", 1);
            }
        });

        informatica.on("click", function() {
            var alumnoI = new Q.AlumnoInformatica();
            conocimientos = comprobarConocimientos(Q.state.p.cmasmas, Q.state.p.fisica, alumnoI, "reclutar");
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


    Q.scene('casa', function(stage) {

        stage.insert(new Q.Repeater({ asset: "fdi.png" }));
        var box = stage.insert(new Q.UI.Container({
            x: Q.width / 2,
            y: Q.height / 2,
        }));

        var label = box.insert(new Q.UI.Text({
            x: 0,
            y: -225,
            label: "Casa",
            size: 20
        }));

        var flechaI = box.insert(new Q.UI.Button({
            x: -110,
            y: -210,
            asset: "fletxaI.png"
        }));

        var labelTrabajadores = box.insert(new Q.UI.Text({ x: -80, y: -150, size: 12, label: "Total Trabajadores: " + Q.state.p.totalTrabajadores }));

        Q.state.on("change.totalTrabajadores", this, function(totalTrabajadores) {
            labelTrabajadores.p.label = "Total trabajadores: " + totalTrabajadores;
        });

        var masCocinero = box.insert(new Q.UI.Button({ x: 20, y: -150, asset: "mas.png" }));
        box.insert(new Q.UI.Text({ x: 85, y: -160, label: "Cocinero", size: 11 }));
        var textCocinero = box.insert(new Q.UI.Text({ x: 85, y: -150, label: "N: " + Q.state.p.cocinero, size: 11 }));
        var menosCocinero = box.insert(new Q.UI.Button({ x: 145, y: -150, asset: "menos.png" }));

        var masCamarero = box.insert(new Q.UI.Button({ x: 20, y: -110, asset: "mas.png" }));
        box.insert(new Q.UI.Text({ x: 85, y: -120, label: "Camarero", size: 11 }));
        var textCamarero = box.insert(new Q.UI.Text({ x: 85, y: -110, label: "N: " + Q.state.p.camarero, size: 11 }));
        var menosCamarero = box.insert(new Q.UI.Button({ x: 145, y: -110, asset: "menos.png" }));

        var masRecolector = box.insert(new Q.UI.Button({ x: 20, y: -70, asset: "mas.png" }));
        box.insert(new Q.UI.Text({ x: 85, y: -80, label: "Recolector", size: 11 }));
        var textRecolector = box.insert(new Q.UI.Text({ x: 85, y: -70, label: "N: " + Q.state.p.recolector, size: 11 }));
        var menosRecolector = box.insert(new Q.UI.Button({ x: 145, y: -70, asset: "menos.png" }));

        Q.state.on("change.cocinero", this, function(cocinero) {
            textCocinero.p.label = "N: " + cocinero;
        });

        Q.state.on("change.camarero", this, function(camarero) {
            textCamarero.p.label = "N: " + camarero;
        });

        Q.state.on("change.recolector", this, function(recolector) {
            textRecolector.label = "N: " + recolector;
        });

        flechaI.on("click", function() {
            Q.clearStages();
            Q.stageScene("screenMain");
        });

        masCocinero.on("click", function() {
            if (Q.state.p.cocina) {

                if (Q.state.p.trabajadoresActuales < Q.state.p.totalTrabajadores) {
                    Q.state.inc("cocinero", 1);
                    Q.state.inc("trabajadoresActuales", 1);
                } else {
                    Q.stageScene("materialInsuficiente", 1, { escena: "casa", label: "No tiene trabajadores suficientes" });
                }
            } else {
                Q.stageScene("materialInsuficiente", 1, { escena: "casa", label: "Compre la cocina" });
            }
        });

        menosCocinero.on("click", function() {

            if (Q.state.p.cocinero > 0) {
                Q.state.dec("cocinero", 1);
                Q.state.dec("trabajadoresActuales", 1);
            }
        });

        masCamarero.on("click", function() {
            if (Q.state.p.cafeteria) {

                if (Q.state.p.trabajadoresActuales < Q.state.p.totalTrabajadores) {
                    Q.state.inc("camarero", 1);
                    Q.state.inc("trabajadoresActuales", 1);
                } else {
                    Q.stageScene("materialInsuficiente", 1, { escena: "casa", label: "No tiene trabajadores suficientes" });
                }
            } else {
                Q.stageScene("materialInsuficiente", 1, { escena: "casa", label: "Compre la cafeteria" });
            }
        });

        menosCamarero.on("click", function() {

            if (Q.state.p.camarero > 0) {
                Q.state.dec("camarero", 1);
                Q.state.dec("trabajadoresActuales", 1);
            }
        });

        masRecolector.on("click", function() {

            if (Q.state.p.trabajadoresActuales < Q.state.p.totalTrabajadores) {
                Q.state.inc("recolector", 1);
                Q.state.inc("trabajadoresActuales", 1);
            } else {
                Q.stageScene("materialInsuficiente", 1, { escena: "casa", label: "No tiene trabajadores suficientes" });
            }
        });

        menosRecolector.on("click", function() {

            if (Q.state.p.recolector > 0) {
                Q.state.dec("recolector", 1);
                Q.state.dec("trabajadoresActuales", 1);
            }
        });
    });


    function carga() {

        var contador_s = 0;
        cronometro = setInterval(
            function() {
                if (contador_s == 10) {
                    contador_s = 0;

                    if (Q.state.p.cocinero > 0) {
                        Q.state.inc("comida", Q.state.p.cocinero);
                    }

                    if (Q.state.p.camarero > 0) {
                        if (Q.state.p.comida >= 2 * Q.state.p.camarero) {
                            Q.state.dec("comida", Q.state.p.camarero * 2);
                            Q.state.inc("energia", Q.state.p.camarero);
                        }
                    }

                    if (Q.state.p.recolector > 0) {
                        if (Q.state.p.energia >= Q.state.p.recolector) {
                            Q.state.dec("energia", Q.state.p.recolector);
                            Q.state.inc("coins", Q.state.p.recolector);
                        }
                    }
                }
                contador_s++;
            }, 1000);
    }
    Q.scene('quiz', function(stage) {
        var textPregunta, respuesta1, respuesta2, respuesta3, correcta;
        $.getJSON("data/quiz.json", function(datos) {

            id = Math.floor(Math.random() * (3 - 1) + 1);


            $.each(datos["lista"], function(idx, pregunta) {
                if (pregunta.id === id) {
                    textPregunta = pregunta.pregunta;
                    respuesta1 = pregunta.respuestas.respuesta1.respuesta;
                    respuesta2 = pregunta.respuestas.respuesta2.respuesta;
                    respuesta3 = pregunta.respuestas.respuesta3.respuesta;
                    correcta = pregunta.correcta;

                    var box = stage.insert(new Q.UI.Container({
                        x: Q.width / 2,
                        y: Q.height / 2

                    }));
                    var labelPregunta = box.insert(new Q.UI.Text({
                        x: 0,
                        y: -30,
                        label: textPregunta,
                        size: 20,
                        color: "white"
                    }));

                    var botonRespuesta1 = box.insert(new Q.UI.Button({
                        x: 0,
                        y: 30,
                        w: 150,
                        fill: "#CCCCCC",
                        label: respuesta1
                    }));

                    var botonRespuesta2 = box.insert(new Q.UI.Button({
                        x: 0,
                        y: 90,
                        w: 150,
                        fill: "#CCCCCC",
                        label: respuesta2
                    }));



                    var botonRespuesta3 = box.insert(new Q.UI.Button({
                        x: 0,
                        y: 150,
                        w: 150,
                        fill: "#CCCCCC",
                        label: respuesta3
                    }));

                    botonRespuesta1.on("click", function() {
                        Q.stageScene("comprobarQuiz", 1, { respuesta: 1, correcta: correcta });

                    });
                    botonRespuesta2.on("click", function() {
                        Q.stageScene("comprobarQuiz", 1, { respuesta: 2, correcta: correcta });

                    });
                    botonRespuesta3.on("click", function() {
                        Q.stageScene("comprobarQuiz", 1, { respuesta: 3, correcta: correcta });

                    });
                }
            });
        });




    })

    Q.scene('comprobarQuiz', function(stage) {
        var mensaje
        if (stage.options.correcta == stage.options.respuesta)
            mensaje = "Has acertado";
        else
            mensaje = "Has fallado"

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
            label: mensaje
        }));

        button.on("click", function() {
            Q.clearStages();
            Q.stageScene("quiz");
        });

        box.fit(20);
    });

    Q.scene('startGame', function(stage) {

        var box = stage.insert(new Q.UI.Container({
            x: Q.width / 2,
            y: Q.height / 2
        }));

        Q.state.reset({ coins: 200, taquillas: false, cmasmas: 0, gestion: 0, c: 0, ensamblador: 0, matematicas: 0, fisica: 0, alumnoSoftware: 1, alumnoComputadores: 0, alumnoInformatica: 1, tamañoEquipo: 2, equipoActual: 0, equipoSoftware: 0, equipoInformatica: 0, equipoComputadores: 0, cocinero: 0, camarero: 0, recolector: 0, cocina: false, cafeteria: false, totalTrabajadores: 0, trabajadoresActuales: 0, comida: 0, energia: 50, xPlayer: 90, yPlayer: 925.5 });

        var button = box.insert(new Q.UI.Button({ asset: "puerta/1.jpg", scale: 1 / 2 }));
        var titulo = box.insert(new Q.UI.Button({ x: 0, y: -10, asset: "titulo.png" }));
        var label1 = box.insert(new Q.UI.Button({ x: 0, y: 190, h: 80, fill: "#CCCCCC", label: "Haz clic o presiona enter" }));
        var label2 = box.insert(new Q.UI.Button({ x: 0, y: label1.p.y + 20, label: "para entrar en la FDI" }));

        var empezarJuego = function() {
            box.insert(new Q.UI.Button({ asset: "puerta/2.jpg", scale: 1 / 2 }));
            setTimeout(function() { box.insert(new Q.UI.Button({ asset: 'puerta/3.jpg', scale: 1 / 2 })); }, 100);
            setTimeout(function() { box.insert(new Q.UI.Button({ asset: 'puerta/4.jpg', scale: 1 / 2 })); }, 300);
            setTimeout(function() { box.insert(new Q.UI.Button({ asset: 'puerta/5.jpg', scale: 1 / 2 })); }, 500);
            setTimeout(function() { box.insert(new Q.UI.Button({ asset: 'puerta/6.jpg', scale: 1 / 2 })); }, 700);
            setTimeout(function() { box.insert(new Q.UI.Button({ asset: 'puerta/7.jpg', scale: 1 / 2 })); }, 900);
            setTimeout(function() { box.insert(new Q.UI.Button({ asset: 'puerta/8.jpg', scale: 1 / 2 })); }, 1100);
            setTimeout(function() { box.insert(new Q.UI.Button({ asset: 'puerta/9.jpg', scale: 1 / 2 })); }, 1300);
            setTimeout(function() { box.insert(new Q.UI.Button({ asset: 'puerta/10.jpg', scale: 1 / 2 })); }, 1500);
            setTimeout(function() { box.insert(new Q.UI.Button({ asset: 'puerta/11.jpg', scale: 1 / 2 })); }, 1700);
            setTimeout(function() { box.insert(new Q.UI.Button({ asset: 'puerta/12.jpg', scale: 1 / 2 })); }, 1900);
            setTimeout(function() { Q.stageScene("screenMain"); }, 3000);
        };

        Q.input.on("confirm", button, function() {
            carga();
            empezarJuego();
        });

        button.on("click", function() {
            carga();
            empezarJuego();
        });
    });
});