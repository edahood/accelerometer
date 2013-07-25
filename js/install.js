import device;
import event.Emitter as Emitter;
import util.setProperty as setProperty;

var Accelerometer = Class(Emitter, function (supr) {
	var self = this;
	this.init = function() {
		this.isDebugging = false;
		supr(this, 'init', arguments);
		this.queue = [];
		this.captures = {motion: true, orientation: true};
		this.last_motion = null;
		this.last_orientation = null;
		this.errors = [];
	};
	this.motionHandler = function(evt){
		GLOBAL.accelerometer.emit('devicemotion', evt);
		GLOBAL.accelerometer.last_motion = evt;
		
	};
	this.orientationHandler = function(evt){
		GLOBAL.accelerometer.last_orientation = evt;
		GLOBAL.accelerometer.emit('orientation', evt);
	};
	
	this.debugging = function(val){
		if (arguments.length === 0){
			this.isDebugging = false;
		}
		else {
			this.isDebugging = arguments[0];
		}
	};
	this.sendRequest = function(req){
		if (!GLOBAL.NATIVE || device.simulatingMobileNative) {
		}
		else {
			NATIVE.plugins.sendEvent("AccelerometerPlugin", "onRequest", JSON.stringify(req));
		}
	};
	/*
	 * Turn On Motion Capture
	*/
	this.enableMotionCapture = function(){
		var cmd = {'cmd': 'ENABLE_MOTION'};
		this.sendRequest(cmd);
		this.captures.motion = true;
		this.emit("MOTION_CAPTURE", true);
	};
	this.disableMotionCapture = function(){
		var cmd = {'cmd': 'DISABLE_MOTION'};
		this.sendRequest(cmd);
		this.captures.motion = false;
		this.emit("MOTION_CAPTURE", false);
	};
	/*
	 * Turn On Orientation Capture
	*/
	this.enableOrientationCapture = function(){
		var cmd = {'cmd': 'ENABLE_ORIENTATION'};
		this.sendRequest(cmd);
		this.captures.orientation = true;
		this.emit("ORIENTATION_CAPTURE", true);
	};
	this.disableOrientationCapture = function(){
		var cmd = {'cmd': 'DISABLE_ORIENTATION'};
		this.sendRequest(cmd);
		this.captures.orientation = false;
		this.emit("ORIENTATION_CAPTURE", false);
	};
	this.getLastMotion = function(){
		return this.last_motion;
	};
	this.getLastOrientation = function(){
		return this.last_orientation;
	};
	this.clear = function(){
		this.queue = [];
		this.last_motion = false;
		this.last_orientation = false;
		this.errors = [];
	};


});

GLOBAL.accelerometer = new Accelerometer;

if (!GLOBAL.NATIVE || device.simulatingMobileNative) {
	console.log("Installing fake accelerometer");
} else {
	NATIVE.events.registerHandler("devicemotion", function(evt){
		//console.log("Received Motion Event!");
		GLOBAL.accelerometer.motionHandler(evt);
	});
	NATIVE.events.registerHandler("deviceorientation", function(evt){
		//console.log("Orientation Event!");
		GLOBAL.accelerometer.orientationHandler(evt);
	});
} 