<h1 id='summary'>Summary</h1>

* [Links](#links)
* [RegEx](#regex)
  * [Patterns - Litteral Characters](#literal)
  * [Patterns - Character Class](#class)
  * [Negated Character Class](#negated)
  * [Shorthand Character Classes](#shorthand)
  * [Negativity](#shorthandneg)
    * [Exercise 1](#exercise1)
  * [Quantifiers](#quantifiers)
    * [Quantifier {}](#quantifier1)
    * [Other Quantifiers](#otherquantifiers)
  * [Escaping Special Characters](#escaping)
* [Regular Expression in JavaScript](#regexjavascript)
  * [JavaScript Methods Using Regular Expressions](#javascriptusingregexp)
  * [Alternation](#alternation)
  * [Grouping](#grouping)
  * [Anchors and Boundaries](#anchors)
  * [Capturing - Backreferencing](#capturing)
  * [Exercises](#exercises)

<h1 id='links'>Links</h1>

[Go Back to Summary](#summary)

* [Codepen - Regex](https://codepen.io/roger-takeshita/pen/KKpbYVO?editors=1010)
* [Regex Cheat Sheet](https://www.rexegg.com/regex-quickstart.html)
* [Regex Tester - Regexer](https://regexr.com/)
* [Regex Tester - Regex101](https://regex101.com/)
* [Regex MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
  * [test()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)
  * [match()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
  * [matchAll()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll)
  * [replace()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
  * [search()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search)
  * [replace()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)

<h1 id='regex'>RegEx</h1>

<h2 id='literal'>Patterns - Litteral Characters</h2>

[Go Back to Summary](#summary)

* A **literal** is the most basic of the regex characters. They are literally they character we want to match.
* The first regex we have put in our `<input>`, `pattern="Fred"`, has a patter, `Fred` that consists entirely of literal characters.

<h2 id='class'>Patterns - Character Class</h2>

[Go Back to Summary](#summary)

* They tell the regex engine to **match only one of several characters** palced within **square brackets**.
  * Example: `gr[ae]y`, in this case only `a` or `e` -> `gray` or `grey`
* You can use a hyphen insite of the character class to specify a range of characters.
  * For example `[5-9]` will match a single digit of 5 to 9.
* You can use more than one range too.
  * `[0-9a-fA-F]`, would match any single hexadecimal digit regardless of case.
* Character classes are great for matching frequently misspelled words `li[cs]en[cs]e`.

<h2 id='negated'>Negated Character Class</h2>

[Go Back to Summary](#summary)

* Putting a `^` (caret) symbol after the opening `[`, means match any character **except** the character(s) in the brackets.
  * `p[ua]` will match the letter `p` followed by any single character except `u` or `a`

<h2 id='shorthand'>Shorthand Character Classes</h2>

[Go Back to Summary](#summary)

* `\w` will match **any alphanumeric character, including digits and the underscore character**.
* `\s` will match **any "whitespace" character, including a space, tab, newline and carriage return**.
* `.` (period) will match **any character except line breaks**.

<h2 id='shorthandneg'>Negativity</h2>

[Go Back to Summary](#summary)

* The uppercase versions of the previous shorthands match just the **opposite of the lowercase versions**:
  * `\D` will match **any character except a digit**.
  * `\W` will match **anything but an alphanumeric character (and underscore)**.
  * `\S` will match **anything except a space, tab, newline or return**.

<h3 id='exercise1'>Exercise 1</h3>

[Go Back to Summary](#summary)

* Write a regex pattern that will match:
  * The word "File", followed by a space and two uppercase letters from the alphabet, followed by a hyphen and three digits, except that the first of the three digits cannot be a zero.
  * For example, this text would be a match:
    * File XY-123

    ```Bash
        [F][i][l][e][\s][a-zA-Z][a-zA-Z]-[0-9][0-9][0-9]
    ```

<h2 id='quantifiers'>Quantifiers</h2>

[Go Back to Summary](#summary)

* In the previous exercise, we repeated the same character classes when we wanted to match more than one.

<h3 id='quantifier1'>Quantifier {}</h3>

[Go Back to Summary](#summary)

* We use curly braces to specify a specific quantity, or range of quantities, to repeat a literal character, character class, etc..
  * For example, `\d{3}` would match three digits
  * `\d{3}-\d{2}-\d{4}"` this would match a social security number

* We can also specify a range like `[A-Z]{1,5}`, which would match between 1 and 5 capital letters
  * In this case `ROGER` = OK, but `ROGERS` = NOK
* A range from a number to infinity can be created by leaving off the second number such as `{5,}`
  * In this case `ROGERSSSS` = OK, but `rogerSSSS` = NOK

<h3 id='otherquantifiers'>Other Quantifiers</h3>

[Go Back to Summary](#summary)

* `*` - the star symbol will match the preceding character class **zero** or **more times**.
* `+` - the plus symbol will match the preceding character class **one** or **more times**.
* `?` - the question mark will match the preceding character class **zero** or **one time**.

    ```Bash
        [1-9][0-9]{0,4} [A-Z].+  ---> 123 Main Street
    ```

<h2 id='escaping'>Escaping Special Characters</h2>

[Go Back to Summary](#summary)

* We've seen how certain characters such as these, `/*+?.[]{}`, have special meaning in regular expression.
* To accomplish this, you have to escape the special character by preceding it with a `\` (backslash)
  * `abcd+` would be `[a-z]{1,4}\+`
* Note that we do not have to escape special characters within a character class (square brackets). So, if you wanted to match a plus or minus sign, you could use this pattern `[+-]`
  * 2 numbers before and after .
    * `[0-9]{0,2}\.[0-9]{0,2}`
  * 2 or more numbers before and after .
    * `\d+\.\d+`
  * What?
    * `What\?`

<h1 id='regexjavascript'>Regular Expression in JavaScript</h1>

[Go Back to Summary](#summary)

* In JavaScript, regular expressions are special objects that can be created using a regular expression literal, or the `RegExp()` constructor function
* The literal syntax uses forward slashes to delimit the regex

    ```JavaScript
        cons re = /cats?/;

        // /cats?/
    ```
* The literal syntax is the best option if you know how the pattern you want to use in advance. However, using the constructor approach allows is to pass in a string variable to create a regex dynamically

    ```JavaScript
        const str = "cats?";
        const re = new RegExp(str);

        // /cats?/
    ```

<h2 id='javascriptusingregexp'>JavaScript Methods Using Regular Expressions</h2>

[Go Back to Summary](#summary)

| Method  | Description                                                                                                     |
|---------|-----------------------------------------------------------------------------------------------------------------|
| exec    | search for a match in a string. It returns an array of information.                                             |
| test    | tests for a match in a string. It returns true or false.                                                        |
| match   | executes a search for a match in a string. It returns an array of information or null on a mismatch.            |
| search  | tests for a match in a string. It returns the index of the match, or -1 if the search fails.                    |
| replace | executes a search for a match in a string, and replaces the matched substring with a replacement substring.     |
| split   | A `String` method that uses a regular expression or a fixed string to break a string into an array of substrings. |

```JavaScript
    const re = /cats?/;
    re.test('fatcat');

    // true
```

<h2 id='alternation'>Alternation</h2>

[Go Back to Summary](#summary)

* Alternation allows us to easily search for one of several characters or words.
* Let's say you want a single regex that will match any of these sentences:

    ```Bash
        I have a dog.
        I have a cat.
        I have a bird.
        I have a fish.
    ```

  * This would do the trick `/I have a (dog|cat|bird|fish)\./`
  * Example: Hexadecimal color: `#f355Ac` or `#D39` --> `/#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/`

<h2 id='grouping'>Grouping</h2>

[Go Back to Summary](#summary)

* Let's say we wanted to match a computer's IP Address. Ignoring the fact that we should limit the numbers to between 0 and 255, we could write something like this: `/\d{1,+}\.\d{1,3}\.\d{1,3}\.\d{1,3}/`
* Using group we can write like this: `/(\d{1,3}\.){3}\d{1,3}/`
  * Example: `hey!hey!hey!` ---> `/(\w{1,}!){3}/`

<h2 id='anchors'>Anchors and Boundaries</h2>

[Go Back to Summary](#summary)

* Anchors and boundaries are unique in that they don't match a character, instead they match a position.
* They alow us to write patterns that match strings that contain only characters we are interested in an only if they are isolated the way we want them to be.

* The `^` symbol is used to **match the start of the line**. This is very useful for processing a file containing multiple lines.
* The `$` symbol **matches the end of the line**.
  * For example, without boundaries, the regex `/dog/` will return true when tested against any of these strings: "dog", "dogs" and "My dog is named Spot". 
    * However, the regex `/^dog$/` will match only the string "dog" and when there is no other text in the line.
  * `cat`, with anchors (`/^cat$/`), and without (`/cat/`), against the strings "cat" and "catsup".

* The `\b` easily allows us to search for whole words only.
  * This is how we could use the string `match()` method to return the matches by passing in a regex.

    ```JavaScript
            // try with no word boundary
            const re = /cat/g;
            const matches = "The catsup was eaten by the cat".match(re);
                // ["cat", "cat"]

            // try using word boundary
            const re = /\bcat\b/g;
            const matches = "The catsup was eaten by the cat".match(re);
                // ["cat"]
    ```

  * We could use `test()` to check if has at least 1 match

    ```JavaScript
            const re = /\byumi\b/g;
            re.test("Hi yumi! How are you?");
                // true
    ```

* The `g` a the end of the regex is the **global** flag and it tells the regex to search for all matches, instead of just the rist.

<h2 id='capturing'>Capturing - Backreferencing</h2>

[Go Back to Summary](#summary)

* Parentheses `()` can also be use used to define **capture** groups.
* Capturing is when matched text is "captured" into numbered of groups.
* These groups can be reused with a processing called **backreferencing**

  * Suppose you want to change MM/dd/yyyy to yyyy-MM-dd format. It’s very easy in javascript using back-references. See following:

    ```JavaScript
            12/05/2008'.replace(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/g, '$3-$1-$2')
                // 2008-12-05
    ```

    ```JavaScript
            let str ='This is <a href=\"https://rogertakeshita.com\">Roger Takeshita</a>, A wonderful collection of resources like <a href="https://github.com/Roger-Takeshita/GitHub">GitHub Cheat Sheets</a> , <a href="https://github.com/Roger-Takeshita/Arduino">Arduino</a> and so on...  ';
            str=str.replace(/(<a href="([^"]+)">([^<]+)<\/a>)/ig,'$3');
            alert(str);

            //     /(<a href="([^"]+)">([^<]+)<\/a>)/ig

            //     $1 = (<a href="([^"]+)">([^<]+)<\/a>)
            //     $2 = ([^"]+)
            //     $3 = ([^<]+)
            //     i  = Case sensitive
            //     g  = global 
    ```

<h2 id='exercises'>Exercises</h2>

[Go Back to Summary](#summary)

1. Match an American Express Credit Card Number which always begin with 34 or 37 and totals 15 digits.

   ```JavaScript
        /3[47]\d{13}/
        /(34|37)\d{13}/
   ```

2. Match a full U.S. Phone Number: `+1-(555)-555-5555`

    ```JavaScript
        /\+1-\(\d{3}\)-\d{3}-\d{4}/
    ```

3. A date in the format:
 * YYYY-MM-DD.
 * YYYY can start with either 19 or 20 only.
 * DD can be anything from 01 to 31, regardless of the month.

    ```JavaScript
        /(19|20)\d{2}-(0[0-9]|1[0-2])-(0[0-9]|1[0-9]|2[0-9]|3[0-1])/
    ```

4. An integer between 0 and 255. This is difficult, remember to use the "alternation" (|) operator.

    ```JavaScript
        /b[0-9]\b|\b[0-9][0-9]\b|1[0-9][0-9]|2[0-4][0-9]|2[0-5][0-5])/
        /(2[0-4][0-9]|25[0-5]|[01]?[0-9]?[0-9])/
    ```

5. Given an array of words, pick out only those words that have two or
more vowels in them. For the purposes of this question, a vowel is one
of the letters a, e, i, o, u.
   * For example, given `["dog", "cat", "mouse", "sky", "eleven"]`
     * return `["mouse", "eleven"]`

    ```JavaScript
            const words = ["dog", "cat", "mouse", "sky", "eleven"];
            const re = /[aeiou][^ ]*[aeiou]/;

            const getTwoVowels = (arrayWords, re) => {
                let answer = [];
                arrayWords.map(word => {
                    if (re.test(word)) {
                        answer.push(word);
                    }
                })
                return answer;
            }
            console.log("Answer:");
            console.log(getTwoVowels(words,re));

            // [aeiou][^ ]*[aeiou]
            // [aeiou] = Match a single charecter 
            // [^ ]    = Not Match spaces
            // *       = Quantifier - matches between Zero and Unlimited the previous character
            // [aeiou] = Match a single character
    ```