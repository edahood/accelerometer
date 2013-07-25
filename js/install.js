import device;
import event.Emitter as Emitter;
import util.setProperty as setProperty;

var Accelerometer = Class(Emitter, function (supr) {
	var self = this;
	this.init = function() {
		this.isDebugging = false;
		supr(this, 'init', arguments);
		self.queue = [];

		self.last_motion = null;
		self.last_orientation = null;
		self.errors = [];
	};
	this.motionHandler = function(evt){
		self.last_motion = evt;
		self.emit('devicemotion', evt);
	};
	this.orientationHandler = function(evt){
		self.last_orientation = evt;
		self.emit('orientation', evt);
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
		return self.last_motion;
	};
	this.getLastOrientation = function(){
		return self.last_orientation;
	};
	this.clear = function(){
		self.queue = [];
		self.last_motion = false;
		self.last_orientation = false;
		self.errors = [];
	};


});

GLOBAL.accelerometer = new Accelerometer;

if (!GLOBAL.NATIVE || device.simulatingMobileNative) {
	console.log("Installing fake accelerometer");
} else {
	NATIVE.events.registerHandler("devicemotion", bind(GLOBAL.accelerometer, 'motionHandler'));
	NATIVE.events.registerHandler("deviceorientation", bind(GLOBAL.accelerometer, 'orientationHandler'));
} 