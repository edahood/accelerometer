import device;
import event.Emitter as Emitter;
import util.setProperty as setProperty;

var Accelerometer = Class(Emitter, function (supr) {
	var self = this;
	this.init = function() {
		this.isDebugging = false;
		supr(this, 'init', arguments);
		this.queue = [];

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
	this.logit = function(itm, msg){
		if (this.isDebugging){
		console.log(msg);
		console.log(itm);
		}
	};
	this.debugging = function(val){
		if (arguments.length === 0){
			this.isDebugging = false;
		}
		else {
			this.isDebugging = arguments[0];
		}
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