/* globals Quintus:false */
/*jshint strict: false */


window.addEventListener("load",function() {

	var Q = window.Q = Quintus({ audioSupported: [ 'mp3','ogg' ] })
			.include("Sprites, Scenes, Input, Touch, UI, TMX, Anim, 2D, Audio")
			.setup({ width: 480, height: 500 })
			.controls().touch()
			.enableSound();


	Q.scene("level1", function(stage){
		Q.stageTMX("level.tmx", stage);
		stage.add("viewport");

	});
	

	Q.load([""], function() {
  		Q.loadTMX("level.tmx", function() {
  			Q.stageScene("level1");
  		});
	});

});