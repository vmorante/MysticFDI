/* globals Quintus:false */
/*jshint strict: false */


window.addEventListener("load",function() {

	var Q = window.Q = Quintus({ audioSupported: [ 'mp3','ogg' ] })
			.include("Sprites, Scenes, Input, Touch, UI, TMX, Anim, 2D, Audio")
			.setup({ width: 320, height: 480 })
			.controls().touch()
			.enableSound();


});