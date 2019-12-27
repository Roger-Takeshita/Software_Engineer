# Summary

* [Intro to JavaScript  & Data Types](#intro-js)
* [Variables `var`, `let` and `const`](#variables)
   * [Scope](#scope)
   * [Naming Variables](#naming-variables)
   * [Implicit Conversion](#implicit-conversion)
   * [Explicit Conversion](#explicit-conversion)
* [Control Flow in JavaScript](#control-flow)
   * [Basic Types of Control Flow](#basic-types-of-control-flow)
   * [Looping Statements](#looping-statements)
      * [do...while](#do-while)
      * [break](#break)
   * [Tenary Operator](#tenary-operator)
   * [Switch Statement](#switch-statement)
* [Template Literals](#template-literals)
   * [String (expressions) Interpolation](#string-expressions-interpolation)
   * [Multi-Line Strings `\n`](#multi-line-string)
   * [Tagged Template Literals](#tagged-template-literals)
* [Arrays](#arrays)
   * [Creating Arrays](#creating-arrays)
   * [Methods of an Array](#methods-array)
      * [Accessing Element in an Array](#accessing-element-array)
      * [Length of an Array `.length`](#length-array)
      * [Adding Elements to an Array `.push()` and `.unshift()`](#adding-elements-array)
      * [Removing Elements from an Array `.pop()` and `.shift()`](#removing-elements-array)
      * [Add/Remove Elements to/from Anywhere in the Array `.splice()`](#add-remove-elements-anywhere)
      * [Iterate Over All of the Elements in an Array `forEach`](#iterate-over-all-elements)
      * [`for...of`](#for-of)
      * [Copy All or Some of an Array `.slice()`](#copy-all-some-array)
      * [Create a Single String from an Array `.join()`](#create-single-string-array)
      * [`.indexOf() / .lastIndexOf()`](#indexof-lastindexof)
      * [`.includes()`](#includes)
      * [`.reverse()`](#reverse)
      * [`.sort()`](#sort)

<h1 id="intro-js"> Intro to JavaScript  & Data Types</h1>

[Go Back to Summary](#summary)

## Intro to JavaScript

* The primary responsability of JavaScript is to provide behavoir to our web applications via client-side script that runs in the browser.

## Explore JavaScript's Data Types

* JavaScript is an untyped language. This means that we do not explicity specify the type of data a variable can hold.
* In strongly typed languages such as Java, data types are explicity specified for a variable - and  an error will occur if a different data is assigned.

>Strongly typed languages require a little more effort to code in, however, many developers agree that it's worth it because it makes code less error prone. There is a newer language callded **TypeScript** you might hear about - this language is a superset of JS and adds strong typing to JS.

* JavaScript data types:
   - Object
   - Undefined
   - Null
   - String
   - Number
   - Boolean
   - Object

### Object

* Most programming languages have two major classifications of data types:
   - Primitive/Value data types
   - Complex/Reference data types
* Variables that hold primitive data type can hold only one value at a time. This is why primitive data types are also referred to as value datatypes.
* Complex data types can be thought of as containers, capable of holding several pieces of data. Thye are also referred to as reference data type.
* In JavaScript, we only have one complex/reference data type - **Object**
* Typacally, when we discuss objects in JS, we thinking about plain ol' objects that have collection of zero or more properties (keys/values) like this:

* Object
   ```js
      {key: "value"}
   ```

However, there are several special versions of the JS Object:
* Array
   ```js
      [1, 2, 3]
   ```
* Date
   ```js
      new Date()
   ```
* RegExp
   ```js
      /.*/
   ```
* Error
   ```js
      new Error("An Error Messsage")
   ```
* Function
   ```js
      function() {

      }
   ```

<h1 id="variables">Variables var, let and const</h1>

[Go Back to Summary](#summary)

* Varibles are ubiquitous in computer programming.
Their purpose is to hold a single variable or thing.

<h2 id="scope">Scope</h2>

* The difference between `var` and `let/const` is what we call scope, basically, scope resolve around the accessibility of variables & functions at a given point in the code.
* When a variable or function is accessible, we say that it's "in scope". Conversely, when a variable of functions cannot be accessed, it's considered "out of scope".

   * `var` has function scope
   * `let/const` have more limited block scope, which in computer programming, is considered a best practice because it helps avoid the mistake of accidentally changing a variables's value.

<h2 id="naming-variables">Naming Variables</h2>

* In JS, when naming variables, the convention is to name identifiers using lowerCamelCase.
* Identifiers in JS:
   - Are case-sensentive
   - Cannot beging wih a number
   - Can contain letters, digits, underscores, and dollar signs

<h2 id="implicit-conversion">Implicit Conversion</h2>

* JS is friendly and tries to help us whenever it can. Howeer, we all know that sometimes it's better to be left alone.

* `==` 

   ```js
      13 == "13"  // Returns true
   ```

   * This is why, unless there's a reason not to do so, we use te strict equality operator (`===`) as it will not perform type conversion.


<h2 id="explicit-conversion">Explicit Type Conversion</h2>

* `toString()` and `toFixed()` methods:
   ```js
      let n = 123.456;
      let s1 = n.toString();  // "123.456"
      let s2 = n.toFixed();   // "123,46"
   ```

* `parseInt()` and `parseFloat()` methods:
   ```js
      let s = "1234.567"
      let n1 = parseInt(s);   // 1234
      let n2 = parseFloat(s); // 1234.567
   ```

<h1 id="control-flow">Control Flow in JavaScript</h1>

[Go Back to Summary](#summary)

* What is Control Flow?
   >"The execution sequence of instructions in a program determined at run time with the use of control structures"

<h2 id="basic-types-of-control-flow">Basic Types of Control Flow</h2>

* Sequence
   * Statements execute one at a time in sequence
* Branching
   * Different code paths are executed based upon a conditional expression.
* Looping
   * Code is repeatedly executed while a condition is truthy.

<h2 id="looping-statements">Looping Staments</h2>

<h3 id="do-while"><strong>do...while</strong></h3>

* You may choose to use the `do...while` statement instead `while` to force the code block to always execute at least once.

   ```js
      let num = 0;
         do {
            console.log(num + ' is even');
            num += 2;
         } while (num <= 10);
   ```

<h3 id="break"><strong>Break</strong></h3>

* Use the `break` statement within any `while` or `for` loop to immediately exit the loop:

   ```js
      let word = '';
      let words = [];
      while (word !== 'end') {
         word = prompt('Enter a word ("end" to quit)');
         if (word !== 'end') {
            words.push(word);
         } else {
            break;
         }
         alert("You've entered: " + words.join(', '));
      }
   ```

<h2 id="tenary-operator">Ternary Operator</h2>

* The ternary operator is ideal when you need to return one of two values depending upon a condition:

   ```js
      let message = score > 100 ? "You rock!" : "Keep trying!";
   ```
* The above code line of code replaces this code:

   ```js
      let message;
      if (score > 100) {
         message = "You rock!";
      } else {
         message = "Keep trying!";
      }
   ```

* It can also be used to evaluate on of two expressions, so you can actually run methods if you'd like:

   ```js
      score > 100 ? gameWinner() :  gameLoop();
   ```

<h2 id="switch-statement">Swith Statement</h2>

* The switch statement evaluates an expression, matching the expression's value to a case clause, and executes statements associated with that case, as well as statements in cases that follow the matching case.

   ```js
      var expr = 'Papayas';
      switch (expr) {
         case 'Oranges':
            console.log('Oranges are $0.59 a pound.');
            break;
         case 'Mangoes':
         case 'Papayas':
            console.log('Mangoes and papayas are $2.79 a pound.');
            // expected output: "Mangoes and papayas are $2.79 a pound."
            break;
         default:
            console.log('Sorry, we are out of ' + expr + '.');
      }
   ```

<h1 id="template-literals">Template Literals</h1>

[Go Back to Summary](#summary)

* Template literals are another way to **define** and **use** string in JS.
Now we can use the back-ticks:
   ```js
      let myString = `This is my string`;
   ```

<h2 id="features">Features</h2>

<h3 id="string-expressions-interpolation"><strong>String (expressions) Interpolation</strong></h3>

* One of the most enjoyable things we do as develpers is concatenating string after string... Not!

   ```js
      var person = {
         firstName: 'Chuck',
         lastName: 'Norris',
         age: 77,
         note: 'bad ass'
      };

      var result = person.firstName + ' ' + person.lastName + ' is ' +
         person.age + ' years old and is a ' + person.note + '.';
         
      // Chuck Norris is 77 years old and is a bad ass.
   ```

* Using template literals, we can "embed" JS expressions within the string like this:
   ```js
      var result = `${person.firstName} ${person.lastName} is ${person.age} years old and is a ${person.note}.`;
      
      // Chuck Norris is 77 years old and is a bad ass.
   ```
* Any JS expression, including functions calls, can be inserted between the `${` and `}` characters.

<h3 id="multi-line-string"><strong>Multi-Line Strings \n</strong></h3>

* In non-template literals, we could create line breaks using the new line character `\n`.
   ```js
      var twoLines = 'This is line one.\nThis is line two.';
   ```
* or 
   ```js
      var twoLines = `This is line one.
      This is line two.`;
   ```
* In fact, all white spaces is honored within template literals. This can be convenient when the time come to define HTML within string:
   ```js
      var htmlTemplate =
      `
      <div class="panel">
         <div class="title">Good Title</div>
         <div class="content">
            <p>This is really good stuff!</p>
            <p>I mean, it's simply amazing...</p>
         </div>
      </div>
      `;
   ```

<h3 id="tagged-template-literals"><strong>Tagged Template Literals</strong></h3>

* Tagging template literals is an advanced use case of template literals.
* Basically, you can preface a template literal with a function. The function would then be called to process the template literal. This provides unlimited flexibility when transforming the literal.
* However, their use is not common, thus we will not cover them here. Be sure to read the docs if you're interested in learning more:

[MDN - Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

<h1 id="arrays">Arrays</h1>

[Go Back to Summary](#summary)

<h2 id="creating-arrays">Creating Arrays</h2>

* There are two ways to create an array:
   ```js
      // using a Class/Constructor Function (less common syntax)
      let nums = new Array(2, 4, 18);

      // using Array Literal syntax (recommended best practice)
      let nums = [2, 4, 18];
   ```
* The best practice is to use the Array Literal syntax because it's more concise and the Class approach behaves differently if you pass only one argument.

<h2 id="methods-array"> Methods of an Array</h2>

<h3 id="accessing-element-array"><strong>Accessing Element in an Array</strong></h3>

* when access elements in an array using **square bracket notation**, passing in the "index" (position) of the element you whant to access:

   ```js
      let movies = ['Caddyshack', 'Interstellar', 'Scarface'];
      let firstMovie = movies[0];  // 'Caddyshack'
   ```
<h3 id="length-array"><strong>Length of an Array .length</strong></h3>

* You can find out the size of an array with `.length`:

```js
   console.log(movies.length);
   // output 3
```

<h3 id="adding-elements-array"><strong>Adding Elements to an Array .push() and .unshift()</strong></h3>

* We can add eleemnts to the **end** of an array using the `.push()` method.
   ```js
      movies.push('Trading Places', 'Antitrust');
   ```
* We can also add to the **front** of an array with `.unshift()` method.
   ```js
      movies.unshift('Star Wars');
   ```

<h3 id="removing-elements-array"><strong>Removing Elements from an Array `.pop()` and .shift()</strong></h3>

* We can remove a single element from the **end** of an array using `.pop()` method.
   ```js
      movies.pop();
   ```
* We can also remove from the **front** of an array with `.shift()` method.
   ```js
      movies.shift();
   ```

* `.pop()` and `.shift()` only remove one element at a time and don't take any arguments.

<h3 id="add-remove-elements-anywhere"><strong>Add/Remove Elements to/from Anywhere in the Array .splice()</strong></h3>

* The [Array.prototype.splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) method is capable of adding and/or removing any number of elements to/from an array with a single line of code!

* `.splice()` has a syntax of: `array.splice(start, deleteCount, newItem1, newItem2...)`

   ```js
      //movies => [ 'Caddyshack', 'Interstellar', 'Scarface', 'Trading Places' ]
      let removedMovies = movies.splice(3, 1, 'Spaceballs', 'Alien');
      //movies => [ 'Caddyshack', 'Interstellar', 'Scarface', 'Spaceballs', 'Alien' ]
      removedMovies = movies.splice(0, 3);
      //movies => [ 'Spaceballs', 'Alien' ]
      removedMovies = movies.splice(1, 0, 'The Sting');
      //removedMovies => []
      //movies => [ 'Spaceballs', 'The Sting', 'Alien' ]
   ```

* The `.splice()` method always returns an array containing the removed elements.

<h3 id="iterate-over-all-elements"><strong>Iterate Over All of the Elements in an Array forEach</strong></h3>

* Although a `for` loop can be used to iterate over an array, if you know you want to iterate over **all** of the elements in an array, the `forEach` method is a better approach:
   ```js
      movies.forEach(function(movie) {
         console.log(movie);
      });
   ```

* As you can see, the `forEach` method calls the function provided as an argument once for each element in the array.

* You can also access the index of each iteration:
   ```js
      movies.forEach( (movie, idx) => {
         console.log(idx + ') ' + movie);
      });
   ```
* Note that it's a good practice to name the parameter that accepts each element as the singular of the array, or simply the first letter of the array variable.

<h3 id="for-of"><strong>for...of</strong></h3>

* ES2015 provides the `for...of` loop for iterating over the elements of arrays and other iterables such as strings:

```js
   for(let movie of movies) {
      if (movie === 'The Last Airbender') break;
         console.log(movie);
   }
```
* Unlike forEach, the for...of loop can be exited using the break statement.

<h3 id="copy-all-some-array"><strong>Copy All or Some of an Array .slice()</strong></h3>

* We use the [Array.prototype.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) method to create a copy of all, or part, of an array.
* The `.slice()` method always returns a new array and does not mutate (change) the source array.
   ```js
      //movies => [ 'Spaceballs', 'The Sting', 'Alien' ]
      let lastTwoMovies = movies.slice(1, 3); // ['The Sting, 'Alien']
   ```
* Unlike `.splice()`, the 2nd argument in slice represents the ending index (but does not include that index).

<h3 id="create-single-string-array"><strong>Create a Single String from an Array .join()</strong></h3>

* An array method that comes in handy is `.join()` which creates a string from all of the elements in an array:
   ```js
      let movieStr = movies.join();
      //=> 'Spaceballs,The Sting,Alien'
   ```
* As you can see, by default, the movies were delimited by a comma. However, we can pass `.join()` whatever string we want to use as the delimiter:
   ```js
      movieStr = movies.join(' --- ');
      //=> 'Spaceballs --- The Sting --- Alien'
   ```

<h3 id="indexof-lastindexof"><strong>.indexOf() / lastIndexOf()</strong></h3>

* The **`.indexOf()`** method returns the index within the calling `String` object of the first occurrence of the specified value, starting the search at `fromIndex`. Returns -1 if the value is not found.
   ```js
      var paragraph = 'The quick brown fox jumps over the lazy dog. If the dog barked, was it really lazy?';

      var searchTerm = 'dog';
      var indexOfFirst = paragraph.indexOf(searchTerm);

      console.log('The index of the first "' + searchTerm + '" from the beginning is ' + indexOfFirst);
      // expected output: "The index of the first "dog" from the beginning is 40"

      console.log('The index of the 2nd "' + searchTerm + '" is ' + paragraph.indexOf(searchTerm, (indexOfFirst + 1)));
      // expected output: "The index of the 2nd "dog" is 52"
   ```

<h3 id="includes"><strong>.includes()</strong></h3>

* The **`.includes()`** method determines whether one string may be found within another string, returning `true` or `false` as appropriate.

   ```js
      var sentence = 'The quick brown fox jumps over the lazy dog.';

      var word = 'fox';

      console.log(`The word "${word}" ${sentence.includes(word)? 'is' : 'is not'} in the sentence`);
      // expected output: "The word "fox" is in the sentence"
   ```

<h3 id="reverse"><strong>.reverse()</strong></h3>

* The **`.reverse()`** method reverses an array `in place`. The first array element becomes the last, and the last array element becomes the first.
   ```js
      const array1 = ['one', 'two', 'three'];
      console.log('array1:', array1);
      // expected output: "array1:" Array ["one", "two", "three"]

      const reversed = array1.reverse();
      console.log('reversed:', reversed);
      // expected output: "reversed:" Array ["three", "two", "one"]

      /* Careful: reverse is destructive. It also changes
      the original array */
      console.log('array1:', array1);
      // expected output: "array1:" Array ["three", "two", "one"]
   ```

<h3 id="sort"><strong>.sort()</strong></h3>

* The **`.sort()`** method sorts the elements of an array `in place` and returns the sorted array. The default sort order is ascending, built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values.
* The time and space complexity of the sort cannot be guaranteed as it depends on the implementation.
   ```js
      const months = ['March', 'Jan', 'Feb', 'Dec'];
      months.sort();
      console.log(months);
      // expected output: Array ["Dec", "Feb", "Jan", "March"]

      const array1 = [1, 30, 4, 21, 100000];
      array1.sort();
      console.log(array1);
      // expected output: Array [1, 100000, 21, 30, 4]
   ```