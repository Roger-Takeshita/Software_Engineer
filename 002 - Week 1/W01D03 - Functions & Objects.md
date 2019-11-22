<h1 id="summary">Summary</h1>

* [Functions](#functions)
   * [Defining and Calling Functions](#defining-calling-functions)
      * [What is a function?](#what-functions)
         * [Function Declaration](#function-declaration)
         * [Function Expression](#function-expression)
         * [Arrow Functions](#arrow-function)
      * [Calling Functions](#calling-functions)
   * [Parameters/Arguments](#parameters-arguments)
   * [Extra Arguments](#extra-arguments)
      * [Rest Parameters](#rest-parameters)
      * [Default Parameters](#default-parameters)
      * [Functions as Aruments](#functions-arguments)
         * [Passing an anonymous function](#functions-anonymous)
   * [Scope](#scope)
      * [What is Scope?](#what-scope)
      * [Why the Different Types of Scope?](#different-scope)
      * [Global Scope](#global-scope)
   * [Local Review & Further Study](#local-review)
      * [Immediately Invoked Function Expression (IIFE)](#iife)
   * [Nesting Functions](#nesting-functions)
* [Objects](#objects)
   * [What Are Objects?](#what-objects)
   * [Ways to Create Object](#ways-create-object)
      * [Object Literal Notation](#object-literal-notation)
      * [Adding Properties to an Existing Object](#adding-properties)
      * [Checking if an Object has a Property](#object-property)
   * [`in` Operator](#in)
   * [Deleting a Property](#deleting-property)
   * [Iterating Over an Object's Properties - for...in](#iterating-object-proerties)
   * [Property Shorthand Syntax](#shorthand-syntax)
   * [Methods](#methods)
   * [How Variables Reference an Object](#variable-reference)
* [Further Study](#further-study)

<h1 id="functions">Functions</h1>

[Go Back to Summary](#summary)

[MDN Functions Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)

<h2 id="what-functions">What is a function?</h2>

[Go Back to Summary](#summary)

* A function is a reusable block of code designed to perform a single purpose.
* It optionally takes in data as input and returns a single piece of data (including complex data such as objects, functions, etc...)
* Functions are the building blocks of programs.
* The code in a function execute in response to events happening, such as when:
   * When a user clicks something
   * A timer "ticks", etc.
* In addition to the function we write, programming languages typically include numerous built-in functions.
* Functons commoly call other functions.

## Why Functions Anyway?

* Tackle Complexity
   * There's no better way to tackle a complex problem than by breaking it into small problems.
   * Functions allow us to break up programs into more manageable blocks of code.


* Code Reuse
   * Functions provide code reuse because they can be called over and over.
   * Without functions, we might have to write the same code in multiple places of the app which violates a key principle known as **DRY - Don't Repeat Yourself**!


* Why whould be important to write a DRY code?
   * Documenting & Debugging
      * Simply naming functions appropriately, documents what the program is doing.
      * Organizing code into functions also makes it easier to find and fix code that's not working as expected, a process known as **debugging**.

<h2 id="defining-calling-functions"> Defining and Calling Functions</h2>

[Go Back to Summary](#summary)

* **[Defining Functions**
   *  There are three primary ways to define functions in JS:

<h4 id="function-declaration">1) Functions Declaration (AKA Function Definitions)</h4>

[Go Back to Summary](#summary)

   ```js
      function sayHello(name) {
         console.log("Hello " + name + "!");
      }
   ```

<h4 id="function-expression">2) Function Expression</h4>

[Go Back to Summary](#summary)

   ```js
      let sayHello = function(name) {
         console.log("Hello " + name + "!");
      };
   ```

   * Primary Difference Between Functions Declaration and Expressions
      * `Function Expressions` **CANNOT be invoked before they are defined**;
      * `Function Declarations` are **HOISTED** to the top of their scope and can therefore be invoked even if they are defined later in the source code.

   ```js
            fnDeclaration();  // thank you function declarations :)
            fnExpression();   // TypeError: fnExpression is not a function
            
            function fnDeclaration() {
               console.log("I'm coming from a function declaration");
            }
            const fnExpression = function() {
               console.log("I'm coming from a function expression");
            };
   ```

<h4 id="arrow-function">3) Arrow Functions</h4>

[Go Back to Summary](#summary)

   * The following function declaration:

   ```js
      // Function Declaration
      function add(a, b) {
         return a + b;
      }
   ```

      * Arrow Function

   ```js
      const add = (a, b) => { a + b};
   ```

   * Arrow functions offer:
      * A more concise syntax
      * Implicit return of a single expression
      * A single rule for binding the `this.` keyword

   * However, as cool as arrow functions are, they **CANNOT** be used in every scenario due to the way they bind `this.`.

<h2 id="calling-functions">Calling Functions</h2>

[Go Back to Summary](#summary)

* Regardless of which of the three approaches are used to define functions, we call them the same way:

   ```js
      add (25, 100);  // returns 125
   ```

<h2 id="parameters-arguments">Parameters/Arguments</h2>

[Go Back to Summary](#summary)

* Parameters
   * Parameters are the `slots`, the placeholder for inputs that the function should receive.

* Arguments
   * Arguments are the specific values of JS data types that we give those slots when we run a function.

   ```js
      function bottleCapper(bottle, cap) {   // bottle, cap -> Parameters
         return bottle + cap;
      }

      bottleCapper("green bottle", "white cap");   // "green bottle", "white cap" -> Arguments
   ```

* Parameters become local variables inside the function body.
* Just like naming variables and functions, it's importante to name parameters using identifiers that convey the data they will hold.

<h2 id="extra-arguments">Extra Arguments</h2>

[Go Back to Summary](#summary)

* Let's pretend you need to write a function that accepts an unkwon number of arguments.
* For example, let's say we would like to be able to call a function that accepts a developer's name and any number of their job skills:

   ```js
      let maria =  getDevObject('Maria', 'HTML', 'CSS', 'JavaScript', 'jQuery');
   ```

* and want that function to retunr a JS object shapped like this:

   ```js
      {
         devName: 'Maria',
         jobSkills: ['HTML', 'CSS', 'JavaScript', 'jQuery']
      }
   ```

* A non-arrow function can access all of its arguments using "hidden" variable inside of the function named `arguments`.
* `arguments` is an arry-like JS object that has `length` property and allows its values to be accessed via square bracket notation.
* This is how we could use the `arguments` object to code the function:

```js
   function getDevObject(name) {
      let skills = [];
      for (let i = 1; i < arguments.length; i++) {
         skills.push(arguments[i]);
      }
      return {
         devName: name,
         jobSkills: skills
      };
   }
```

<h3 id="rest-parameters">Rest Parameters</h3>

[Go Back to Summary](#summary)

* ES2015 delivered a better approach to working with extra arguments called **Rest Parameters**.
* Using rest parameters, the above function can be write as folows:

   ```js
      function getDevObject(name, ...skills) {
         return {
            devName: name,
            jobSkills: skills
         };
      }
   ```

* The `...skills` that's defined will be true array (**unlike** `arguments`) holding any extra arguments provided in addition to any other parameters defined in front of it.
* Obvisouly, **`there can be only a single rest parameter` and it mut be the last parameter in the list**.
* When write new coe, devs should use **rest parameters** instead of `arguments` because:
   * The existance of the rest parameter in the parameter list better documents the function.
   * the rest parameter is a true array and thus includes all the nifty methods that arrays have.

<h3 id="default-parameters">Default Parameters</h3>

[Go Back to Summary](#summary)

* What if your function requires certain arguments and you want to provide a default value for the parameter if an argument is not supplied when the function is invoked?

   ```js
      function setColor(bicycle, color) {
         // set color to 'purple' if not provided
         bicycle.color = color || 'purple';
      }

      let bike = new Bicycle();
      setColor(bike, 'blue');  // sets color to blue
      setColor(bike);  // sets color to purple by default
   ```

* Now, using **default parameters**, we can do this:

   ```js
      function setColor(bicycle, color = "purple") {
         bicycle.color = color;
      }
   ```

* Any expression can be provided as a default, including objects, etc.

<h3 id="functions-arguments">Functions as Aruments</h3>

[Go Back to Summary](#summary)

* In JavaScript, it's easy to pass around functions like they're data (because they are - they're objects).

<h4 id="functions-anonymous">Passing an anonymous function</h4>

[Go Back to Summary](#summary)

* Often functions or methods (functions attached to an object) will require a function be provided as an argument. For example, `forEach` method on arrays:

   ```js
      let colors = ['red', 'green', 'blue'];

      colors.forEach(function(color) {
         console.log(color);
      });
   ```

* Since the function provided to the `forEach` will never be called anywhere else in the code, where create a separate named functions and pass it in? **Anonymous functions** like shown above can really come in handy!.

<h2 id="scope">Scope</h2>

[Go Back to Summary](#summary)

<h3 id="what-scope">What is scope?</h3>

[Go Back to Summary](#summary)

* In general, the concept of **scope** in computer programming pertains to the **accessibility** of variables and functions from a point of code. In other words, as you write a line of code, what variables and functions do you have access to?
* JavaScript has three types of scope:
   * A single **global scope**
   * **Function scope**, also known as **local scope**
   * and, **block scope** which was added by ES2015's `let` and `const`

<h3 id="different-scope">Why the Different Types of Scope?</h3>

[Go Back to Summary](#summary)

* There's a concept in programming known as **The Principle of Least Access**.
* The principle is based on the idea that limiting the accessibility of variables (and functions) helps reduce bugs in the code - think of it as a form of "code security".
* A pratical benefit of having different scope, however, is being able to use the same names of variables in different functions! If there were only one scope, this wouldn't possible.
![](https://i.imgur.com/UtIoe7F.png)

* You can look out, but you can't look in!
* A key takeway is that functions have access to the set of variables and functions defined within their own scope AND in the **outer** scopes.
* Basically, when a line of code accesses a variable (or function), JS will traverse up the **scope chain** until it finds what it's looking for.
* If the JS runtime engine gets to the global scope (which is the top of the food chain in the scope hierachy) and still can't find what it's looking for, that's when your program ceases due to a **RefereceError**

<h3 id="global-scope">Gobal Scope</h3>

[Go Back to Summary](#summary)

* In our browsers, the global scope is represented by the `window` object.
* It's at the top of the scope chain and its properties are available to **every** function we write.
* It's generally bad for our programs to create variables in the global scope. Doing so risks us to overwriting data in use by JS libraries/frameworks or other routines.
* Creating lots of global variables is referred as "polluting the global scope", and we all know that it's not nice to pollute.
* If we define a variable within the global scope, it becomes a property on the `window` object.
   >Although using both `var` and `let` in the global scope results in a global variable being created, interestingly, those created using `let` do not appear as properties on the `window` object.

<h2 id="local-review">Local Review & Further Study</h2>

[Go Back to Summary](#summary)

<h3 id="iife">Immediately Invoked Function Expression (IIFE)</h3>

[Go Back to Summary](#summary)

* One way we can prevent our code from leaking into the global scope is by wrapping it with a construct known as an **Immediately Invoked Function Expression**, or "IIFE" (pronunced "iffy"). It looks like this:

   ```js
      (function() {
         'use strict';

         // your code here...
      })();
   ```
   * Block Scope
      * Both `let` and `const` define variables that can only be accessed within the **code block** they are defined in.
      * A code block is created by using curly braces.
      * The following code from  [MDN's docs about let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) demonstrates differences between `let` and `var`:

   ```js
      function varTest() {
      var x = 1;
      if (true) {
         var x = 2;  // same variable!
         console.log(x);  // 2
      }
      console.log(x);  // 2
      }

      function letTest() {
      let x = 1;
      if (true) {
         let x = 2;  // different variable
         console.log(x);  // 2
      }
      console.log(x);  // 1
      }
   ```

   ![](https://i.imgur.com/K0uJx2P.jpg)

   * Hoisting
      * We can call function decleration before they are defined thanks to hosting.
      * As shown above, a variable's **declaration** (but not its assignment), is hoisted to the top of the function when it's declared using `var`. 

      * When we write code like this:
   ```js
      function hoist() {
         console.log(x);  // outputs undefined, not a ReferenceError
         let x = 25;
         console.log(x);  // outputs 25
      }
   ```
      * Internally, the JS engine actually sees this:
   ```js
      function hoist() {
         let x;
         console.log(x);  // outputs undefined, not a ReferenceError
         x = 25;
         console.log(x);  // outputs 25
      }
   ```

<h2 id="nesting-functions">Nesting Functions</h2>

[Go Back to Summary](#summary)

* As the examples above have shown, we can define functions within functions!
* An outer function needs a "helper" function that would only be revelant only to a given function. It would be a good programming practice to "hide" that function from the rest of the program by nesting it within the function that actually needs it.

   ```js
      function openNewAccount(name, openingBalance) {
      let acctNum = generateAcctNum();

      // createAccount is a function available outside this function
      let acct = createAccount(acctNum, openingBalance);
      return acct;

      // helper function that provides a unique account number
      function generateAcctNum() {
         return Date.now();  // super amazing algorithm :)
      }
      }
   ```

* As you can see, there's a niffy `generateAccNum` function in there and it's only relevant to when a new account is opened, so it's nested within the `openNewAccount` function.

<h1 id="objects">Objects</h1>

[Go Back to Summary](#summary)

<h2 id="what-objects">What Are Objects?</h2>

[Go Back to Summary](#summary)

* Objects are the most common data structure in Object Oriented Programming (OOP).
* Very simply, **objects** are collections of zero or more **properties**.
* So what's a property? A property consists of a **`key`:`value`** pair, where the:
   * `key` is string (JS will coerce the type automatically), and the
   * `value` is any JS expression (code that evaluates to a single value or thing), including other objects (functions).
* In computer science, colletions of key/values pairs are commonly referred to as **`dictionaries`** - a good visualization of what an object is.
* In OOP, we often model the goal of our applicatio using real-world objects.
* As web developers, you'll be working with objects more than anything else. The following is just a small example of what is modeled using objects:
   * The browser window an the elements it visualizes are all represented in memory as JS objects.
   * Every part of those elements, including their styling, is accessed via JS objects.
   * Data submitted from the browser will be accessed on the server as objects.
   * Data retrieved from a database will be stored in objects.
   * Even primitive data types like strings and number are turned into an object on demand by the JS runtime when we want to call a method like `toUpperCase` (This process is called **boxing**).

<h2 id="ways-create-object">Ways to Create Objects</h2>

[Go Back to Summary](#summary)

* There are three different ways we can create objects:
   * By using **Object Literal Notatio**
   * By invoking a **Class** (also known as a Constructor Function)
   * By using the `Object.create` method
      * Using `Object.create` is not very common **SEARCH MORE ABOUT IT**

<h3 id="object-literal-notation">Creating Objects with Object Literal Notation</h3>

[Go Back to Summary](#summary)

* **Object Literal Notation**, also known as an [**Object Initializer**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)

   ```js
      const game = {};
      console.log(typeof game)   // "object"
   ```

* Object Literal Notaion consists of a set of opening and closing curly braces `{}`.
* Stylistically, defining an object with a single property or a couple of "short" properties on a single line of code like this `let point = {x:10, y:-5}`.


* Properties are separated by commas:
* Syntactically, [trailing commnas](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Trailing_commas) are permited (in arrays too):

   ```js
      const game = {
         title: 'Guess the Number!',
         biggestNum: 100,
      };
   ```

<h3 id="adding-properties">Adding Properties to an Existing Object</h3>

[Go Back to Summary](#summary)

* There are two different syntaxes available to access, and or modify an object's properties:
   * **Dot notation**
   * **Square Bracket notation**

   * Dot notation
      * Using the assignment operator, if a property doesn't exist, it is created, otherwise it's updated.

   ```js
         game.smallestNum = 0;
   ```

   * Square Bracket notation
      * The other way to access, add, update and delete properties is by using **square bracket notation**.
      * We use square bracket notation when at the time you're writing the code, you don't know which property needs to be accessed.
      * In other words, we use square brackets to access properties dynamically during runtime.

   ```js
         game["title"]
   ```
      * Note that a string literal like above is being done just to demonstrate the syntax, **More effcient code would be `game.title`**.

   * If the result of the expression between the brackets is not a string. JS will convert it to one.

   ```js
      const weirdObj = {};
      weirdObj[null] = true;
      console.log(weirdObj);  // {'null' : true}
   ```

<h2 id="object-property">Checking if an Object has a Property</h2>

[Go Back to Summary](#summary)

* If we enter a non-existing `key`, we don't receive an error when we access a property that doesn't exist. Instead, `undefined` is returned.
* However, we can't rely on a value `undefined` to check if a property exists beacuse maybe a property legitimately has a valeu of `undefined`.
* Instead we can use the `in` operator.

<h2 id="in"><strong>in</strong> Operator</h2>

[Go Back to Summary](#summary)

* Use `in` operator to check if there is a valid `key`:

   ```js
      if (keyName in object) {
         console.log(true);
      }
   ```
<h2 id="deleting-property">Deleting a Property</h2>

[Go Back to Summary](#summary)

* To completely remove a property from an object, we use the `delete` operator:

   ```js
      const geniuses = {
         Einstein: true,
         Newton: true,
         Snooki: false
      };
   
      // see ya!
      delete geniuses.Snooki;
   ```

<h2 id="iterating-object-proerties">Iterating Over an Object's Properties - <strong>for...in</strong>></h2>

[Go Back to Summary](#summary)

* We often need to iterate over an object properties.
* We can iterate over the keys of the properties using `for...in` loop:

   ```js
      for (let key in game) {
         console.log(`The value of the ${key} property is ${game[key]}`);
      }
   ```

* Note that `for...in` loops include all properties in the prototype chain (inherited properties) - not just its own properties that live on the object itself.
* There is a couple of niffy ES2017 methods that can be used to iterate over the **key** & **values** of an object's properties, using **static methods**:
   * [Object.keys(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
   * [Object.values(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Object/values)
   * [Object.entries(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)

* Each of those methods mentioned returns an array that cam be iterator over, for example:

   ```js
      Object.values(keyName).forEach(function(variable) {
         console.log(variable);
      });
   ```

<h2 id="shorthand-syntax">Property Shorthand Syntax</h2>

[Go Back to Summary](#summary)

* It's a common scenario to want to pass the values of variables as properties (having the same name as the variable) in an object:

   ```js
      // assume latitude and longitude are existing variables
      const location = {
         name: 'Disneyland',
         latitude: latitude,
         longitude: longitude
      };
   ```

* Thanks to ES2015's **Property Shorthand** syntax, we can do this:

   ```js
      // assume latitude and longitude are existing variables
      const location = {
         name: 'Disneyland',
         latitude,
         longitude
      };
   ```

<h2 id="methods">Methods</h2>

[Go Back to Summary](#summary)

* When a property holds a function, we commonly refer to it as a **method** of the object.
* Let's add a `play` method to the `game` object:
   ```js
      game.play = function() {
         this.secretNum = Math.floor(Math.random() *
         (this.biggestNum - this.smallestNum + 1)) + this.smallestNum;
      }
   ```
   * The `this` keyword represents the "context" of a function.
   * **In this case, `this` is set by JavaScript to be the object the method is called on.**
   * **IMPORTANT** Due to how `this` is set within **arrow functions**, it's best to avoid using them as methods in objects.

<h2 id="variable-reference">How Variables Reference an Object</h2>

[Go Back to Summary](#summary)

* As you know, variables are slots in memory that hold a value.
* All non-object data types are known as primitive, or value, types because they hold a single value. Picture a table in memory like this:

   ```js
      let | value
      -------------
      let x = 25  -->   x  |  25
      let msg = 'hello' -->  msg | 'hello'
   ```

* But objects are complex/reference types because they can hold multiple pieces of data...
* Objects, including Arrays, Functions, etc. are stored in a separate part of memory known as the heap. A variable for an object has as its value a "reference" (think pointer):

   ```js
      variable | value
      ---------------------
      let x = 25  -->   x  |  25
      var msg = 'hello'  -->  msg | 'hello'        HEAP
      const obj = {a: 1} -->  obj |  ref1   --->  {a: 1} <-|
      let arr = [1,2]    -->  arr |  ref2   --->  [1,2]    |
      let obj2 = obj     -->  obj2|  ref1   ----------------
   ```

* Interestingly, the elements of an array and the properties of an object hold their values in the same way!
* Now this all makes sense:

   ```js
      const arr1 = [];
      const arr2 = [];
      const arr3 = arr1;
      arr1 === arr2  // false!
      arr3 === arr1 // true!
   ```

<h1 id="further-study">Further Study</h1>

[Go Back to Summary](#summary)

* [`getter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) and [`setter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) properties allow you to treat methods like regular properties that you can access without invoking and set using the assignment operator (`=`).
* [Computed Property Name syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) allows for an expression to determine the key name inside of an object literal - just like using square bracket notation on an existing object.