var repeat = function (method, period, reinitializer) {
		var 
			delayedFunction = null,
			keepRunning = true,
			postStop = null,
			moreRepeats = 0,
			reinitializer;


		if (typeof method !== 'function') {
			throw new TypeError('The first argument is not a function');
		}

		if (typeof period !== 'number') {
			throw new TypeError('The second argument is not a number');
		}

		if (typeof reinitalizer !== "undefined") {
			if (typeof reinitializer !== 'function' ) {
				throw new TypeError( 'The third argument is not a function');
			}
		} else {
			reinitializer = reinitializer || function (){};
		}
	return {
        
		start: function(numRuns) {
			var self = this;
			if (keepRunning) {
				postStop = null;
				method();
        	    if (typeof numRuns === 'undefined' || typeof numRuns != 'number') {
                    delayedFunction = setTimeout(self['start'].bind(self), period);
				} else if (typeof numRuns === 'number') {    
                    if (numRuns > 1) {
                        delayedFunction = setTimeout(self['start'].bind(self, (--numRuns)), period);
					} else { //numRuns === 1
						if (moreRepeats > 0) {
							var repeats = moreRepeats;
							moreRepeats = self.moreRepeats = 0;
							delayedFunction = setTimeout(self['start'].bind(self, repeats), period);
						} else {
							keepRunning = false;
							return true;
						}
					}
				}
			} else {
				if (postStop) setTimeout(postStop(), period);
			}
		},

		stop: function () {
			keepRunning = false;
		},
        
		restart: function (numRuns) {
			var self = this;
			if (!keepRunning) { //keepRunning === false
				keepRunning = true;
				if (numRuns && typeof numRuns === "number") self.start(numRuns)
				else self.start();
			} else { //keepRunning === true
				postStop = function () {
				    reinitializer();
				    keepRunning = true;
				    if (typeof numRuns !== 'undefined' && typeof numRuns === 'number') {
				        self['start'].bind(self)(numRuns);
				    } else {
				        self['start'].bind(self)();
				    }
                };
                self.stop();
			}
		},
            
		/**
		 * Add numToAdd to the number of times the function will run. If doRunImmediately, 
		 * instantly launch not running. Otherwise just add it to a cumulative # of times
		 * it will run once it's launched. If the function is already running and non-infinite,
		 * add numToAdd to the number of times it will run.
		 */
		addRepeats: function(numToAdd, doRunImmediately) {
			var self = this, 
			newNum;
			moreRepeats = self.moreRepeats = moreRepeats + numToAdd;
			if (keepRunning === false) {
				if (doRunImmediately !== "undefined" && doRunImmediately === true) {
					newNum = moreRepeats;
					moreRepeats = self.moreRepeats = 0;
					keepRunning = true;
					self['start'].bind(self)(newNum);
				}
			}
		},
        
		status: function () {
			return keepRunning;
		},
	};
};