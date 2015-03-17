///////////////////////////////////////////////////////////////////////////////
// PathRecorder viewer extension
// by Daniel Du
//
//

//   Usage example:




///////////////////////////////////////////////////////////////////////////////
AutodeskNamespace("Autodesk.ADN.Viewing.Extension");

Autodesk.ADN.Viewing.Extension.PathRecorder = function (viewer, options) {

    Autodesk.Viewing.Extension.call(this, viewer, options);

    var _self = this;

    var _interval = null;

    // the array to store the views, which can be a path
    var savedViews = [];

    _self.load = function () {

        console.log('Autodesk.ADN.Viewing.Extension.PathRecorder loaded');


        ///////////////////////
        //
        //////////////////////
        var Stopwatch = function() {

            var _startTime = new Date().getTime();

            this.start = function (){

                _startTime = new Date().getTime();
            };

            this.getElapsedMs = function(){

                var elapsedMs = new Date().getTime() - _startTime;

                _startTime = new Date().getTime();

                return elapsedMs;
            }
        }


		Autodesk.Viewing.Viewer.prototype.startRecording = function(){
			console.log('path recording started');


			var viewer = this;

            var watch = new Stopwatch();

            _interval = setInterval(function () {

                var elapsed = watch.getElapsedMs();

               	var v = viewer.getState();
               	savedViews.push(v);
                
                console.log(v + ' saved.');

            }, 100);


		};

		Autodesk.Viewing.Viewer.prototype.stopRecording = function(){
			//save the recorded path

			clearInterval(_interval);

			console.log('path recording stopped');


		};

		Autodesk.Viewing.Viewer.prototype.pauseRecording = function(){
			
		};

		Autodesk.Viewing.Viewer.prototype.replayRecording = function(){
			
			//
			//we use stack here, so need to reverse 
			savedViews.reverse();

			console.log('path recording start replaying');

			var viewer = this;

            var watch = new Stopwatch();

            _interval = setInterval(function () {

                var elapsed = watch.getElapsedMs();

                var s = savedViews.pop();
               	viewer.restoreState(s);
               	console.log(s + ' restored');
               	
               	//all state are popped up. stop replaying
                if (s == null) {
                	clearInterval(_interval)
                }

            }, 100);
		};









        return true;
    };

    _self.unload = function () {

        console.log('Autodesk.ADN.Viewing.Extension.PathRecorder unloaded');
        return true;
    };
};

Autodesk.ADN.Viewing.Extension.PathRecorder.prototype =
    Object.create(Autodesk.Viewing.Extension.prototype);

Autodesk.ADN.Viewing.Extension.PathRecorder.prototype.constructor =
    Autodesk.ADN.Viewing.Extension.PathRecorder;

Autodesk.Viewing.theExtensionManager.registerExtension(
    'Autodesk.ADN.Viewing.Extension.PathRecorder',
    Autodesk.ADN.Viewing.Extension.PathRecorder);

