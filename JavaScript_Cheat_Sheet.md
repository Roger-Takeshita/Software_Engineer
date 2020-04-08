<h1 id='summary'>Summary</h1>

* [Array.prototype](#array)
  * [Search](#searchmethods)
    * [find() - O(n)](#find)
    * [filter() - O(n)](#filter)
    * [indexOf() - O(n)](#indexof)
    * [includes() - O(n)](#includes)
  * [Loop](#loopmethods)
    * [map() - O(n)](#map)
    * [forEach() - O(n)](#foreach)
  * [Sort](#sortmethods)
    * [sort() - O(n*Log(n))](#sort)
  * [Methods](#methods)
    * [push() - O(1)](#push)
    * [unshift() - O(n)](#unshift)
    * [pop() - O(1)](#pop)
    * [shift() - O(n)](#shift)
    * [slice() - O(n)](#slice)
    * [splice() - O(n)](#splice)
    * [join()](#join)
    * [keys()](#keys)
    * [values()](#values)
    * [reverse()](#reverse)
    * [toString()](#tostring)

<h1 id='array'>Array.prototype</h1>

<h2 id='searchmethods'>Search</h2>

<h3 id='find'>find() - O(n)</h3>

[Go Back to Summary](#summary)

* [Array.prototype.find() - MDN Link]()

* The `find()` method returns the value of the first element in the provided array that satisfies the provided testing function.

    ```JavaScript
        const inventory = [
        {name: 'apples', quantity: 2},
        {name: 'bananas', quantity: 0},
        {name: 'cherries', quantity: 5}
        ];

        const result = inventory.find( ({ name }) => name === 'cherries' );

        console.log(result) // { name: 'cherries', quantity: 5 }
    ```

<h3 id='filter'>filter() - O(n)</h3>

[Go Back to Summary](#summary)

* [Array.prototype.filter() - MDN Link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

* **Creates a new array**

    ```JavaScript
        const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
        const result = words.filter((word) => word.length > 6)
        console.log(result)
            // expected output: [ 'exuberant', 'destruction', 'present' ]
    ```

<h3 id='indexof'>indexOf() - O(n)</h3>

[Go Back to Summary](#summary)

* [Array.prototype.indexOf() - MDN Link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)

* The `indexOf()` method returns the first index at which a given element can be found in the array or `-1` if it is not present

    ```JavaScript
        const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

        console.log(beasts.indexOf('bison'));
            // expected output: 1

        // start from index 2
        console.log(beasts.indexOf('bison', 2));
            // expected output: 4

        console.log(beasts.indexOf('giraffe'));
            // expected output: -1
    ```

<h3 id='includes'>includes() - O(n)</h3>

[Go Back to Summary](#summary)

* [Array.prototype.includes() - O(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

* The `includes()` method determines whether an array includes a certain value among its entries, returning **true** or **false** as appropriate.

    ```JavaScript
        let arr = ['a', 'b', 'c']

        arr.includes('c', 3)    // false
        arr.includes('c', 100)  // false
    ```

<h2 id='loopmethods'>Looop</h2>

<h3 id='map'>map() - O(n)</h3>

[Go Back to Summary](#summary)

* [Array.prototype.map() - MDN Link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

* **Creates a new array**

    ```JavaScript
        const numbers = [1,2,3,4]
        const map1 = numbers.map((number) => number*2)
        console.log(map1)
            // expected output: [ 2, 4, 6, 8 ]
    ```

<h3 id='foreach'>forEach() - O(n)</h3>

[Go Back to Summary](#summary)

* [Array.prototype.forEach() - MDN Link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

* The `forEach()` method executes a provided fucntion once for each array element

    ```JavaScript
        const array = ['a', 'b', 'c'];

        array.forEach((element) => console.log(element));

            // expected output: "a"
            // expected output: "b"
            // expected output: "c"
    ```

<h2 id='sortmethods'>Sort</h2>

<h3 id='sort'>sort() - O(n*Log(n))</h3>

[Go Back to Summary](#summary)

* [Array.prototype.sort() - MDN Link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

* The `sort()` method sorts the elements of an array in place and returns the sorted array. The default sort order is ascending, built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values

* **The sorted array. Note that the array is sorted in place, and no copy is made.**

    ```JavaScript
        const months = ['March', 'Jan', 'Feb', 'Dec'];
        months.sort();
        console.log(months);
            // expected output: Array ["Dec", "Feb", "Jan", "March"]

        const array1 = [1, 30, 4, 21, 100000];
        array1.sort();
        console.log(array1);
            // expected output: Array [1, 100000, 21, 30, 4]
    ```

    ```JavaScript
        var items = [
            { name: 'Edward', value: 21 },
            { name: 'Sharpe', value: 37 },
            { name: 'And', value: 45 },
            { name: 'The', value: -12 },
            { name: 'Magnetic', value: 13 },
            { name: 'Zeros', value: 37 }
        ];

        // sort by value
        items.sort(function(a, b) {
            return a.value - b.value;
        });
        console.log(items);

            // [
            //   { name: 'The', value: -12 },
            //   { name: 'Magnetic', value: 13 },
            //   { name: 'Edward', value: 21 },
            //   { name: 'Sharpe', value: 37 },
            //   { name: 'Zeros', value: 37 },
            //   { name: 'And', value: 45 }
            // ]

        // sort by name
        items.sort(function(a, b) {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        });
        console.log(items);

            // [
            //   { name: 'And', value: 45 },
            //   { name: 'Edward', value: 21 },
            //   { name: 'Magnetic', value: 13 },
            //   { name: 'Sharpe', value: 37 },
            //   { name: 'The', value: -12 },
            //   { name: 'Zeros', value: 37 }
            // ]
    ```

<h2 id='methods'>Methods</h2>

<h3 id='push'>push() - O(1)</h3>

[Go Back to Summary](#summary)

* [Array.prototye.push() - MDN Link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

* The `push()` method adds one or more elements **to the end** of an array and returns the new length of the array.

    ```JavaScript
        let sports = ['soccer', 'baseball']
        let total = sports.push('football', 'swimming')

        console.log(sports)  // ['soccer', 'baseball', 'football', 'swimming']
        console.log(total)   // 4
    ```

<h3 id='unshift'>unshift() - O(n)</h3>

[Go Back to Summary](#summary)

* [Array.prototype.unshift() - O(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)

* The `unshift()` method **adds one or more** elements **to the beginning of an array** and returns the new length of the array.

    ```JavaScript
        let arr = [1, 2]

        arr.unshift(0)               // result of the call is 3, which is the new array length
        // arr is [0, 1, 2]

        arr.unshift(-2, -1)          // the new array length is 5
        // arr is [-2, -1, 0, 1, 2]

        arr.unshift([-4, -3])        // the new array length is 6
        // arr is [[-4, -3], -2, -1, 0, 1, 2]

        arr.unshift([-7, -6], [-5])  // the new array length is 8
        // arr is [ [-7, -6], [-5], [-4, -3], -2, -1, 0, 1, 2 ]
    ```

<h3 id='pop'>pop() - O(1)</h3>

[Go Back to Summary](#summary)

* [Array.prototype.pop() - MDN Link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)

* The `pop()` method **removes the last element** from an array and returns that element. This method changes the length of the array.

    ```JavaScript
        let myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];

        let popped = myFish.pop();

        console.log(myFish); // ['angel', 'clown', 'mandarin' ] 
        console.log(popped); // 'sturgeon'
    ```

<h3 id='shift'>shift() - O(n)</h3>

[Go Back to Summary](#summary)

* [Array.prototype.shift() - MDN Link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)

* The `shift()` method **removes the first element** from an array and returns that removed element. This method changes the length of the array.

    ```JavaScript
        let myFish = ['angel', 'clown', 'mandarin', 'surgeon'];

        console.log('myFish before:', JSON.stringify(myFish));
        // myFish before: ['angel', 'clown', 'mandarin', 'surgeon']

        let shifted = myFish.shift(); 

        console.log('myFish after:', myFish); 
        // myFish after: ['clown', 'mandarin', 'surgeon']

        console.log('Removed this element:', shifted); 
        // Removed this element: angel
    ```

<h3 id='slice'>slice() - O(n)</h3>

[Go Back to Summary](#summary)

* [Array.prototype.slice() - MDN Link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

* The `slice()` method returns a shallow copy of a portion of the array into a new array object selected from `begin` to `end` (`end` not included) where `begin` and `end` represent the index of items in the array. **The original array will not be modified**.

    ```JavaScript
        const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

        console.log(animals.slice(2));
            // expected output: Array ["camel", "duck", "elephant"]

        console.log(animals.slice(2, 4));
            // expected output: Array ["camel", "duck"]

        console.log(animals.slice(1, 5));
            // expected output: Array ["bison", "camel", "duck", "elephant"]
    ```

<h3 id='splice'>splice() - O(n)</h3>

[Go Back to Summary](#summary)

* [Array.prototype.splice() - MDN Link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

* The `splice()` method changes the contents of an array by **removing or replacing existing elements and/or adding new elements in place**.

    ```JavaScript
        const months = ['Jan', 'March', 'April', 'June'];

        months.splice(1, 0, 'Feb'); // inserts at index 1
        console.log(months);
            // expected output: Array ["Jan", "Feb", "March", "April", "June"]

        months.splice(4, 1, 'May'); // replaces 1 element at index 4
        console.log(months);
            // expected output: Array ["Jan", "Feb", "March", "April", "May"]

        months.splice(2, 1); // removes one element at index 2
        console.log(months);
            // expected output: Array [ 'Jan', 'Feb', 'April', 'May' ]
    ```

<h3 id='join'>join()</h3>

[Go Back to Summary](#summary)


* [Array.prototype.join() - MDN Link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

* The `join()` method creates and returns a new string by concatenating all of the elements in an array (or an array-like object), **separated by commas or a specified separator string**. If the array has only one item, then that item will be returned without using the separator.

    ```JavaScript
        let a = ['Wind', 'Water', 'Fire'];
        a.join();      // 'Wind,Water,Fire'
        a.join(', ');  // 'Wind, Water, Fire'
        a.join(' + '); // 'Wind + Water + Fire'
        a.join('');    // 'WindWaterFire'
    ```

<h3 id='keys'>keys()</h3>

[Go Back to Summary](#summary)

* [Array.prototype.keys() - MDN Link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)

* The `keys()` method returns a new **Array Iterator** object that contains the **keys** for each index in the array.

    ```JavaScript
        const array1 = ['a', 'b', 'c'];
        const iterator = array1.keys();

        for (const key of iterator) {
        console.log(key);
        }

        // expected output: 0
        // expected output: 1
        // expected output: 2
    ```

    ```JavaScript
        let arr = ['a', , 'c'];

        let sparseKeys = Object.keys(arr);
        let denseKeys = [...arr.keys()];

        console.log(sparseKeys); // ['0', '2']
        console.log(denseKeys);  // [0, 1, 2]
    ```

<h3 id='values'>values()</h3>

[Go Back to Summary](#summary)

* [Array.prototype.values() - MDN Link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values)

* The `values()` method returns a **new Array Iterator** object that contains the **values** for each index in the array.

* Iteration using **for...of** loop

    ```JavaScript
        var arr = ['a', 'b', 'c', 'd', 'e'];
        var iterator = arr.values();

        for (let letter of iterator) {
            console.log(letter);
        }  //"a" "b" "c" "d"
    ```

<h3 id='reverse'>reverse()</h3>

[Go Back to Summary](#summary)

* [Array.prototype.reverse() - MDN Link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)

* The `reverse()` method **reverses an array in place**. The first array element becomes the last, and the last array element becomes the first.

    ```JavaScript
        const a = [1, 2, 3];

        console.log(a); // [1, 2, 3]

        a.reverse(); 

        console.log(a); // [3, 2, 1]
    ```

<h3 id='tostring'>toString()</h3>

[Go Back to Summary](#summary)

* [Array.prototype.reverse() - MDN Link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString)

* The `toString()` method returns a string representing the specified array and its elements.

    ```JavaScript
        const array1 = [1, 2, 'a', '1a'];

        console.log(array1.toString());
        // expected output: "1,2,a,1a"
    ```