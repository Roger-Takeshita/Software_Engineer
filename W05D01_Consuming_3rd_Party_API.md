<h1 id="summary">Summary</h1>

* [Consuming 3rd Party APIs](#3rd-party)
  * [What Kind of API are We Talking About?](#what-kind)
  * [Why Consume Third-Party APIs?](#why)
  * [Different Architectual Approaches](#different-architectual)
  * [GitHub API](#github-api)
  * [GitHub Acess Tokens](#tokens)
    * [Request GitHub API - Without Token](#without-token)
    * [Create a GitHub Token](#create-token)
    * [Request GitHub API - With Token](#with-token)
  * [dotenv](#dotenv)
* [Fetch Data from GitHub's API](#fetch-data)

<h1 id="3rd-party">Consuming 3rd Party APIs</h1>

[Go Back to Summary](#summary)

<h2 id="what-kind">What Kind of API Are We Talking About?</h2>

[Go Back to Summary](#summary)

* The acronym actually stands for **Aplication Programming Interface**
* Application Programming Interface originally, and still do, allow programmers to use the functionality of a library, a framework, an operation system, or any piece of software that exposes its funcionality through its defined interface.
* As internet has evolved, the term **API** has also come to represent services available by sending HTTP requests to server, for example, upate your status on Facebook - no UI required.

<h2 id="why">Why Consume Third-Party APIs?</h2>

[Go Back to Summary](#summary)

* There's lots of data being exposed via APIs across the internet that we can use to our apps (often free of charge).

<h2 id="different-architectual">Different Architectual Approaches</h2>

[Go Back to Summary](#summary)

* When accessing APIs, there are a few different architectual approaches we can take:
   * The client (browser) makes requests to the API directly using `AJAX`; Then renders the JSON client-side.
   * Client sends a request to our server; Our server accesses the API and returns the JSON back to the browser for rendering client-side.
   * Access the API from the server, perform server-side rendering of the JSON, and return the HTML page to the browser.

<h2 id="github-api"><a href="https://api.github.com/">GitHub API</a></h2>

[Go Back to Summary](#summary)

* After identifying the root endpoint, use your browser to make a `GET` request using that **endpoint**.
* GitHub has written their API so that when we do a `GET` request on the root endpoint, it returns `JSON` **representing all endpoints available**.
* Scrolling down toward the bottom will reveal a couple of endpoints that we are going to use - so take note of them:
   * **user_url**: This endpoint returns some info about a user, such as a link to their avatar.
   * **user_repositories_url**: This endpoint returns an array of repositories the user is involved with.

   ```bash
      {
         "current_user_url": "https://api.github.com/user",
         "current_user_authorizations_html_url": "https://github.com/settings/connections/applications{/client_id}",
         "authorizations_url": "https://api.github.com/authorizations",
         "code_search_url": "https://api.github.com/search/code?q={query}{&page,per_page,sort,order}",
         "commit_search_url": "https://api.github.com/search/commits?q={query}{&page,per_page,sort,order}",
         "emails_url": "https://api.github.com/user/emails",
         "emojis_url": "https://api.github.com/emojis",
         "events_url": "https://api.github.com/events",
         "feeds_url": "https://api.github.com/feeds",
         "followers_url": "https://api.github.com/user/followers",
         "following_url": "https://api.github.com/user/following{/target}",
         "gists_url": "https://api.github.com/gists{/gist_id}",
         "hub_url": "https://api.github.com/hub",
         "issue_search_url": "https://api.github.com/search/issues?q={query}{&page,per_page,sort,order}",
         "issues_url": "https://api.github.com/issues",
         "keys_url": "https://api.github.com/user/keys",
         "label_search_url": "https://api.github.com/search/labels?q={query}&repository_id={repository_id}{&page,per_page}",
         "notifications_url": "https://api.github.com/notifications",
         "organization_repositories_url": "https://api.github.com/orgs/{org}/repos{?type,page,per_page,sort}",
         "organization_url": "https://api.github.com/orgs/{org}",
         "public_gists_url": "https://api.github.com/gists/public",
         "rate_limit_url": "https://api.github.com/rate_limit",
         "repository_url": "https://api.github.com/repos/{owner}/{repo}",
         "repository_search_url": "https://api.github.com/search/repositories?q={query}{&page,per_page,sort,order}",
         "current_user_repositories_url": "https://api.github.com/user/repos{?type,page,per_page,sort}",
         "starred_url": "https://api.github.com/user/starred{/owner}{/repo}",
         "starred_gists_url": "https://api.github.com/gists/starred",
         "team_url": "https://api.github.com/teams",
         "user_url": "https://api.github.com/users/{user}",
         "user_organizations_url": "https://api.github.com/user/orgs",
         "user_repositories_url": "https://api.github.com/users/{user}/repos{?type,page,per_page,sort}",
         "user_search_url": "https://api.github.com/search/users?q={query}{&page,per_page,sort,order}"
      }
   ```

<h2 id="tokens">GitHub Acess Tokens</h2>

[Go Back to Summary](#summary)

* According to their docs, GitHub limits anonymous user's requests to only 60 per hour, tracked by IP address; and guess what, because we are all on the same wireless network, the API will see us as all having the same IP address.
* We're going to need to obtain an access token so that we can make up to 5,000 requests/hr.

<h3 id="without-token">Request GitHub API - Without Token</h3>

[Go Back to Summary](#summary)

* Let's check out the API's rate limiting by making a request in Terminal using `curl` command without token:

   ```bash
      curl -i https://api.github.com/
   ```

* It will return:

   ```bash
      HTTP/1.1 200 OK
      Server: GitHub.com
      Date: Sat, 28 Dec 2019 18:05:08 GMT
      Content-Type: application/json; charset=utf-8
      Content-Length: 2283
      Status: 200 OK
      X-RateLimit-Limit: 60                                       # Limit/hr
      X-RateLimit-Remaining: 58                                   # Remaining/hr
      X-RateLimit-Reset: 1577559554
      Cache-Control: public, max-age=60, s-maxage=60
      Vary: Accept
      ETag: "307bf49b7e1b8e6fe4ef622d609665e1"
      X-GitHub-Media-Type: github.v3; format=json
      Access-Control-Expose-Headers: ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type
      Access-Control-Allow-Origin: *
      Strict-Transport-Security: max-age=31536000; includeSubdomains; preload
      X-Frame-Options: deny
      X-Content-Type-Options: nosniff
      X-XSS-Protection: 1; mode=block
      Referrer-Policy: origin-when-cross-origin, strict-origin-when-cross-origin
      Content-Security-Policy: default-src 'none'
      X-GitHub-Request-Id: E7D1:1E2D:11181F9:27EEB1E:5E079954

      {
         "current_user_url": "https://api.github.com/user",
         "current_user_authorizations_html_url": "https://github.com/settings/connections/applications{/client_id}",
         "authorizations_url": "https://api.github.com/authorizations",
         "code_search_url": "https://api.github.com/search/code?q={query}{&page,per_page,sort,order}",
         "commit_search_url": "https://api.github.com/search/commits?q={query}{&page,per_page,sort,order}",
         "emails_url": "https://api.github.com/user/emails",
         "emojis_url": "https://api.github.com/emojis",
         "events_url": "https://api.github.com/events",
         "feeds_url": "https://api.github.com/feeds",
         "followers_url": "https://api.github.com/user/followers",
         "following_url": "https://api.github.com/user/following{/target}",
         "gists_url": "https://api.github.com/gists{/gist_id}",
         "hub_url": "https://api.github.com/hub",
         "issue_search_url": "https://api.github.com/search/issues?q={query}{&page,per_page,sort,order}",
         "issues_url": "https://api.github.com/issues",
         "keys_url": "https://api.github.com/user/keys",
         "label_search_url": "https://api.github.com/search/labels?q={query}&repository_id={repository_id}{&page,per_page}",
         "notifications_url": "https://api.github.com/notifications",
         "organization_repositories_url": "https://api.github.com/orgs/{org}/repos{?type,page,per_page,sort}",
         "organization_url": "https://api.github.com/orgs/{org}",
         "public_gists_url": "https://api.github.com/gists/public",
         "rate_limit_url": "https://api.github.com/rate_limit",
         "repository_url": "https://api.github.com/repos/{owner}/{repo}",
         "repository_search_url": "https://api.github.com/search/repositories?q={query}{&page,per_page,sort,order}",
         "current_user_repositories_url": "https://api.github.com/user/repos{?type,page,per_page,sort}",
         "starred_url": "https://api.github.com/user/starred{/owner}{/repo}",
         "starred_gists_url": "https://api.github.com/gists/starred",
         "team_url": "https://api.github.com/teams",
         "user_url": "https://api.github.com/users/{user}",
         "user_organizations_url": "https://api.github.com/user/orgs",
         "user_repositories_url": "https://api.github.com/users/{user}/repos{?type,page,per_page,sort}",
         "user_search_url": "https://api.github.com/search/users?q={query}{&page,per_page,sort,order}"
      }
   ```

<h3 id="create-token">Create a GitHub Token</h3>

[Go Back to Summary](#summary)

* **1)** Login to your GitHub account
* **2)** https://github.com/settings/tokens
  * **2.1)** Click on "Generate new token"
* **3)** Give a Name/Note to your token. In this case `GitHub API`
  * **3.1)** Select all the scopes that you want to give access to your token. In this case:

   ```bash
      Repo: 
         public_repo
      User:
         read:user
         user:email
         user:follow
   ```

  * **3.2)** `Generate token`
  
  ```bash
      # new token
      
      8f6a70506abaf499374c4b43778da18b469e1a78
   ```

<h3 id="with-token">Request GitHub API - With Token</h3>

[Go Back to Summary](#summary)

* Let's hit the API again but this time providing our token in a query string like this (on Terminal):

  * On Terminal

   ```bash
      curl -i https://api.github.com/?access_token=8f6a70506abaf499374c4b43778da18b469e1a78
   ```

  * Response from API:
  
   ```bash
      HTTP/1.1 200 OK
      Server: GitHub.com
      Date: Sat, 28 Dec 2019 18:29:13 GMT
      Content-Type: application/json; charset=utf-8
      Content-Length: 2283
      Status: 200 OK
      X-RateLimit-Limit: 5000                         # Limit/hr with token
      X-RateLimit-Remaining: 4999                     # Remaining/hr with token
      X-RateLimit-Reset: 1577561353
      Cache-Control: private, max-age=60, s-maxage=60
      Vary: Accept, Authorization, Cookie, X-GitHub-OTP
      ETag: "307bf49b7e1b8e6fe4ef622d609665e1"
      X-OAuth-Scopes: public_repo, read:user, user:email, user:follow
      X-Accepted-OAuth-Scopes:
      X-GitHub-Media-Type: github.v3; format=json
      Access-Control-Expose-Headers: ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type
      Access-Control-Allow-Origin: *
      Strict-Transport-Security: max-age=31536000; includeSubdomains; preload
      X-Frame-Options: deny
      X-Content-Type-Options: nosniff
      X-XSS-Protection: 1; mode=block
      Referrer-Policy: origin-when-cross-origin, strict-origin-when-cross-origin
      Content-Security-Policy: default-src 'none'
      X-GitHub-Request-Id: E8A1:71F3:D32F43:2330BD4:5E079EF9
      .
      .
      .
   ```

* Earlier we discovered the **user_url** endpoint that returns general info for a username along with other endpoints that drill into that user's resources.
* The **user_url** endpoint was documented as `https://api.github.com/users/{user}.`
* Note that any segment that is in curly braces, such as `{user}` shown above, is a named parameter and is where we need to provide actual values for the placeholder.

   * [https://api.github.com/users/Roger-Takeshita](https://api.github.com/users/Roger-Takeshita)

   ```bash
      {
         "login": "Roger-Takeshita",
         "id": 32579177,
         "node_id": "MDQ6VXNlcjMyNTc5MTc3",
         "avatar_url": "https://avatars3.githubusercontent.com/u/32579177?v=4",
         "gravatar_id": "",
         "url": "https://api.github.com/users/Roger-Takeshita",
         "html_url": "https://github.com/Roger-Takeshita",
         "followers_url": "https://api.github.com/users/Roger-Takeshita/followers",
         "following_url": "https://api.github.com/users/Roger-Takeshita/following{/other_user}",
         "gists_url": "https://api.github.com/users/Roger-Takeshita/gists{/gist_id}",
         "starred_url": "https://api.github.com/users/Roger-Takeshita/starred{/owner}{/repo}",
         "subscriptions_url": "https://api.github.com/users/Roger-Takeshita/subscriptions",
         "organizations_url": "https://api.github.com/users/Roger-Takeshita/orgs",
         "repos_url": "https://api.github.com/users/Roger-Takeshita/repos",
         "events_url": "https://api.github.com/users/Roger-Takeshita/events{/privacy}",
         "received_events_url": "https://api.github.com/users/Roger-Takeshita/received_events",
         "type": "User",
         "site_admin": false,
         "name": "Roger Takeshita",
         "company": null,
         "blog": "",
         "location": null,
         "email": null,
         "hireable": null,
         "bio": null,
         "public_repos": 14,
         "public_gists": 0,
         "followers": 3,
         "following": 3,
         "created_at": "2017-10-06T18:00:41Z",
         "updated_at": "2019-12-28T18:21:10Z"
      }
   ```

<h2 id="dotenv">dotenv</h2>

[Go Back to Summary](#summary)

* Remember, we do not want to expose tokens, kyes, database connection strings, or other secret in our sorce code.
* Instead, for development purposes, we store secrets in a `.env` file and load its contents into the system's enviroment variables.
* In Node apps, we use a module calles **dotenv**

   ```bash
      npm i dotenv
   ```
* Each variable in `.env` will become a property on `process.env`

<h1 id="fetch-data">Fetch Data from GitHub's API</h1>

[Go Back to Summary](#summary)

* Install Packages
  * npx express-generator -e
  * npm i
  * npm i request
  * npm i dotenv

* **1)** Create a `.env` file on the **root** and add a variable for our token:

   ```JavaScript
         GITHUB_TOKEM=8f6a70506abaf499374c4b43778da18b469e1a78
   ```
   
   * Each variable in `.env` will become a property on `process.env`
   * No spaces or quotes
   * Uppercase with underscores between words (best practice)

  * **1.1)** Require the doenv packaget at the top of the `server.js`:

   ```JavaScript
      var logger = require('morgan');
      require('dotenv').config();         //+ load secrets from .env file
   ```

  * **1.2)** Now you will be able to access the token in code like this:

   ```JavaScript
      const token = process.env.GITHIB_TOKEN;
   ```

* **2)** On `controllers/indexController.js`
  * **2.1)** Require the `request` packages
   ```JavaScript
      //! Require Packages
         const express = require('express');
         const router = express.Router();
         const requestLib = require('request');          //+ We changed the name of the variable to requestLib to avoid mistakes
   ```

  * **2.2)** Let's define a `const` to hold the root endpoint in `controllers/indexController.js`

   ```JavaScript
      const request = require('request');
      const rootURL = 'https://api.github.com/';
   ```

   * **2.3)** Function to render the GET request of index
   
   ```JavaScript
      function index (req, res) {
         res.render('index', {
            title: 'GitHub User',         //+ Initial title of the page
            userData: null                //+ Variable from the index.esj. We are passing null to avoid erros
         })
      };
   ```

   * **2.4)** Function to rener the POST request
    * Now let's use the request module to send a `GET` request to the **user_url** endpoint for the submitted username and render the entire JSON response.

   ```JavaScript
      //! Render Post Request User
         function getUser (req, res) {
            let options = {                                    //+ GitHub API options
               url: `${rootURL}users/${req.body.username}`,       //- We are passing the url with username
               headers: {                                         //- Headers Object with
                  'User-Agent': req.body.username,                   //- User-Agent: username
                  Authorization: 'token ' + token                    //- Token from our .env
               }
            };
            requestLib(options, function(err, response, body) {
               const userData = JSON.parse(body);                    //+ Convert the whole object into JSON format
               options.url = userData.repos_url;
               requestLib(options, function(err, response, body) {
                  userData.repos = JSON.parse(body)                  //+ Convert the whole object into JSON format
                  res.render('index', {
                     title: `GitHub: ${req.body.username}`,
                     userData
                  });
               });
            });
         };
   ```

   * **2.5)** Exports the modules/functions to routes

   ```JavaScript
      //! Exports modules to routes
         module.exports = {
            index,
            getUser
         }
   ```

* **3)** In `routes/index.js`

   ```JavaScript
      //! Require Packages
         const express   = require('express');
         const router    = express.Router();
         const indexCtrl = require('../controllers/indexController');

      //! Router
         router.get ('/', indexCtrl.index);
         router.post('/', indexCtrl.getUser);

      //! Exports Router to server.js
         module.exports = router;
   ```
* **4)** In `views/index.ejs`

* Add the following code bofore the closing tag </body>

   ```html
      <hr>
      <div class="row col-xs-8 col-xs-offset-2">
         <% if (userData) { %>
         <div class="panel panel-default">
            <div class="panel-heading text-center">
               <img src="<%= userData.avatar_url %>"
               class="img-circle" width="300">
               <h2><%= userData.login %></h2>
            </div>
            <div class="panel-body">
               <h3>Repos:</h3>
               <div class="list-group">
                  <% userData.repos.forEach(function(repo) { %>
                     <a href="<%= repo.html_url %>" target="_blank" class="list-group-item">
                     <%= repo.name %>
                     </a>
                  <% }); %>
               </div>
            </div>
         </div>
         <% } else { %>
         <h3 class="text-center text-info">
            Submit a GitHub username!
         </h3>
         <% } %>
      </div>
   ```