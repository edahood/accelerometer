Accelerometer Plugin


## Installation

Include it in the `manifest.json` file under the "addons" section for your game:

~~~
"addons": [
	"accelerometer"
],
~~~

At the top of your `src/Application.js` install the JS wrapper:

~~~
import plugins.accelerometer.install;
~~~

## USAGE ##:

// Turn On MotionCapture
GLOBAL.accelerometer.enableMotionCapture();

// Turn On OrientationCapture
GLOBAL.accelerometer.enableOrientationCapture();

// Disable On OrientationCapture
GLOBAL.accelerometer.disableOrientationCapture();


## EVENTS ##:
 // Orientation Events are emitted by GLOBAL.accelerometer as 
 emit('orientation', evt)

 // Motion Events are emitted by GLOBAL.accelerometer as 
 emit('devicemotion', evt)

// Changing the Motion CAPTURE STATUS
 emit("MOTION_CAPTURE", newvalue)

 //Changing the ORIENTATION CAPTURE STATUS
 emit("ORIENTATION_CAPTURE", newvalue)

