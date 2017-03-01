#repeatJS
repeaptJS is a tool that can make your function to repaet, stop and restart

###Example1
```js
var theFun = function () {
    // Do something
};

var test = repeat(theFun, 1000);

test.start(); // will run the theFun every second.
test.stop(); // will stop the theFun from running.
test.restart(); // will stop, then start the function.
```

###Example2
```js
var reinit = function () {
    // Clean up
};

var test2 = repeat(theFun, 1000, reinit);

test2.start();
test2.restart(); // stops theFun, runs reinit, then starts theFun again
```

###Example3
```js
var theFun = function () {
    // Do something
};

var test = repeat(theFun, 1000);

test.start(10); // will run the theFun every second for 10 times.
test.addRepeats(5, false);// will run theFun 5 times after theFun run 10 times.
```

