<h1 id="summary">Summary</h1>

* [Callback](#callback)
   * [Using Callback with Array Iterator Methods](#using-callback)
   * [Using Callback wiht Asynchronous Functions](#asynchronous)
      * [Uing Callbacks to Work with Asynchronous Code](#callback-asynchronous)
* [Classes](#classes)
   * [Defining Classes](#defining-classes)
   * [Instantiating a Class](#instantiating)
   * [The Constructor Method](#constructor)
   * [Object Instantiation](#object-instantiation)
   * [Defining Methods in a Class](#defining-methods)
   * [Overriding Methods](#overridding)
   * [Constructor Functions](#constructor-functions)
   * [Static Methods](#static)
   * [Inheritance](#inheritance)

<h1 id="callback">JavaScript Callback Functions</h1>

[Go Back to Summary](#summary)

* A callback function, or simply callback, is a function being passed to another function as an argument.

   ```JavaScript
      const colors = ['red', 'green', 'blue'];

      colors.forEach( (color, idx) => {
      console.log(`${idx + 1} - ${color}`);
      });
   ```

* In the above, the **anonymous** inline function being passed to `forEach` as its one and only argument - is a callback function.
* In compuer science, the function that accepts another function as inpu is known as a **higher order function**

   ```JavaScript
      let add = (a, b) => {
         return a + b;
      }
         
      let subtract = (a, b) => {
         return a - b;
      }
         
      let compute = (a, b, op) => {
         return op(a, b);
      }
         
      let result1 = compute(10, 5, add);
      let result2 = compute(10, 5, subtract);
   ```
> Be careful not to invoke the callback function when passing it as an argument - in other words, do not put parents after it. Otherwise you'll be passing the result of calling that function instead of the function itself.

* A callback function is a function being passed to another function to be called at a later point in time.
* Here are three cases for the callback function:

   1) To provide a function to be called by a higher-order function such as `forEach` or the `compute` function we wrote above.
   2) To provide a function to be executed each time an event happens - just like with the `.addEventListener`
   3) To provide a function to be executed when an **asynchronous** process has completed.

<h2 id="using-callback">Using Callback with Array Iterator Methods</h2>

[Go Back to Summary](#summary)

* One of the most popular cases for callback functions is to provide the to iterator methods on arrays.
* As we've seen, calling the `forEach` method is a great way to iterate over all of the elements in an array.
* The `forEach` method is designed to:

   1) Accept a callback function as its only argument
   2) Invoke that callback once for each element in the array

<h2 id="asynchronous">Using Callback wiht Asynchronous Functions</h2>

[Go Back to Summary](#summary)

* Asynchronous functions are necessary in JavaScript becuase JS runs on a single CPU thread dedicated to handling events, running your code, painting the screen, etc.
* Now imagine calling a function nthat gets the data from a database. From the CPU point of view, the database will take an eternity to return the data.
* If the CPU were to wait until the data came back, nothing else could be done and things would appear frozen.
* JavaScript avoids forcing the CPU to wait for "long-running" input/output operations, such as fetching data across the internet.
* A good example of JavaScript's asynchronous programming model is the browser itself when it is fetching images as a page loads. The browser does not load one image at a time. Instead, it kicks off the requests for the images in parallel (at the same time).

   ```JavaScript
      // Function
      console.log('Code before the asynchronous function call');
      setTimeout( function() { 
         console.log('setTimeout code')
         }, 1000);
      console.log('Code after the asynchronous function call');

      // Arrow Function
      console.log('Code before the asynchronous function call');
      setTimeout( () => { console.log('setTimeout code') }, 1000);
      console.log('Code after the asynchronous function call');
   ```

<h3 id="callback-asynchronous">Uing Callbacks to Work with Asynchronous Code</h3>

[Go Back to Summary](#summary)

* JavaScript provides two ways to run a function **after** an asynchronous operation completes its long running process:

   * Callbacks
   * Promises

<h1 id="classes">JS Classes</h1>

[Go Back to Summary](#summary)

* Classes (as well their predecessor, **constructor functions**) are used to create objects.
* Think of classes as the blue prints used to create objects of certain "type".

<h2 id="defining-classes">Defining Classes</h2>

[Go Back to Summary](#summary)

* Here's a minimal class definiton that's good for nothing but creating empty objects.

   ```JavaScript
      class Vehicle {
         // Code here
      }
   ```

<h2 id="instantiating">Instantiating a Class</h2>

[Go Back to Summary](#summary)

* OOP vocab:
   * **instance**: An object created by a class
   * **instantiate**: We instantiate a class to create an object.
   * **instantiation**: The process of creating an object.

* In JS, we create objects using the `new` keyword when invoking (instantiating) the class.

   ```JavaScript
      let v1 = new Vehicle();
   ```

<h2 id="constructor">The Constructor Method</h2>

[Go Back to Summary](#summary)

* When a class is bein instantiated, the special `constructor` method in the class will automatically be called.
* **The purpose** of the `constructor` method is to initialize the data properties of the new object being created (represented by `this`).

   ```JavaScript
      class Vehicle {
         constructor(vin, make) {
            this.vin = vin;
            this.make = make;
            // return is not needed - the new object is returned by default
         }
      }
      
      let plane = new Vehicle('X123Y', 'Boeing');
   ```

* If you don't have any properties to initialize, the `constructor` method is optional (a hidden default constructor is called).
* For example, classes can be used to simply expose static methods (discussed in a bit):

   ```JavaScript
      class Math {
         static abs(n) {
            return n < 0 ? n * -1 : n;
         }
      }
      
      Math.abs(-123); // returns 123
   ```

<h2 id="object-instantiation">Object Instantiation</h2>

[Go Back to Summary](#summary)

* When we invoke the class prefaced with the new keyword:
   * Behind the scenes, JS creates a shiny new object (empty) and assigns it to the this keyword.
   * The `constructor` method is called with the arguments we provided when invoking the class. Remember, the `constructor` method is where we create/initialize properties on the new object assigned to this.
   * After the `constructor` is finished executing, the class automatically returns the shiny new object.
* Although the `constructor` method is special because it's called automatically, there's nothing special about how it's defined, other methods are defined the same way...

<h2 id="defining-methods">Defining Methods in a Class</h2>

[Go Back to Summary](#summary)

* There are two types of methods that can be added to a class:
   * **Prototype** (instance) methods, and
   * **Static** (class) methods
* **Prototype methods** are the most common and are available to be called by any instance of the class.
* **Static methods** are methods that are called on the class itself and cannot be called by instances.

   ```JavaScript
      class Vehicle {
         // the constructor will always be called
         constructor(vin, make, model) {
            this.vin = vin;
            this.make = make;
            this.model = model;
            this.running = false;  // default to false
         }
         start() {
            this.running = true;
            console.log('running...');
         }
      }
   ```

* Note that unlike within objects literals, methods are not separated by comma.

<h2 id="overridding">Overriding Methods</h2>

[Go Back to Summary](#summary)

* Thanks to another OOP principle called inheritance, subclasses inherit methods from their parent classes.
* JS is different from class-based languages like Java or Python in that it's inheritance implementation is prototype-based. We won't go into prototypes during this lesson, but if you want to learn more, [check out the docs here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain).
* In JS, virtually every object inherits from the Object class and thus inherits it's methods, such as `toString`:

   ```JavaScript
      car.toString() // outputs something like '[object Object]'
   ```

* If we define a method that already exists in the object hierarchy, we "override" it.

   ```JavaScript
      // existing methods above

      toString() {
         return 'Vehicle (' + this.vin + ') is a ' + his.make + ' model ' + this.model;
      }
   ```

<h2 id="constructor-functions">Constructor Functions</h2>

[Go Back to Summary](#summary)

   ```JavaScript
      function Vehicle(vin, make, model) {
         this.vin = vin;
         this.make = make;
         this.model = model;
         this.running = false;  // default to false
      }
      Vehicle.prototype.start = function() {
         this.running = true;
         console.log('running...');
      };
      // other 'prototype' (instance) methods defined like above

      var car = new Vehicle('A1234', 'Toyota', 'Camry');
   ```
* Note that constructor functions are similar to the constructor methods in a class. Also note how instance methods are defined on the function's prototype object.
* Invoking a class and a constructor function works identically.

<h2 id="static">Static Methods</h2>

[Go Back to Summary](#summary)

* Again, static methods are methods that are callable on the class itself - not on its instances.
* Static methods are used typically to implement behavior that does not pertain to a particular instance. For example, we could design the Vehicle class so that it tracks every `vehicle` it creates. We could then write static methods that return how many vehicles have been created, search for vehicles by their make, etc.

* Here's how to define a basic static method:

   ```JavaScript
      static about() {
         alert("I'm the Vehicle class!");
      }
   ```

* The only difference is the static keyword
* As discussed, you invoke static methods on the class:

   ```JavaScript
      // invoke static methods on the class
      Vehicle.about();

      // this will not work
      car.about();
   ```

<h2 id="inheritance">Inheritance</h2>

[Go Back to Summary](#summary)

* Earlier we spoke briefly about inheritance.
* In OOP, inheritance is when a "specialized" **subclass** is derived from a parent **superclass**, and thus inherits it's properties and methods.

![](https://i.imgur.com/MvXw4nD.gif)

* We use the `extends` keyword to define a subclass:

   ```JavaScript
      class Plane extends Vehicle {
         constructor(vin, make, model, airline) {
            super(vin, make, model);
            this.airline = airline;
         }
         engageAutoPilot() {
            console.log('Look Mom, no hands!');
         }
      }
   ```

* In a derived class, the `super` keyword represents the parent superclass and must be called before the `this` keyword can be used in the constructor.
* Now we can create instances of Plane like this:

   ```JavaScript
      let spyPlane = new Plane('secret', 'Lockheed', 'SR-71', 'USA');
   ```

* Note how the additional arguments used to initialize subclasses are always provided after those intended for the superclass(es).