### Create a new react project

```Bash
    npx create-react-app starwars
```

### Run the server

```Bash
    npm run start
```

### Star Wars API

* https://swapi.co/documentation

<h1 id='starwars'>Star Wars API with React</h1>

<h2 id='services'>API/Fetch Folder - Service Folder</h2>

[Go Back to Summary](#summary)

* Create a `service/sw-api.j` service module and ensure tha all API/Fetch calls are made from this module. Use named `export` to expose AJAX functionality as needed.

```JavaScript
    export function getAllStarships () {
        return fetch('https://swapi.co/api/starships/?format=json')
            .then(res=> res.json());
    }
```

<h2 id='importapi'>Import the API Module to App.js</h2>

[Go Back to Summary](#summary)

* Import the API module

    ```JavaScript
        import { getAllStarships } from '../services/sw-api';
    ```


* Inside the `App` class, create an Async function to get the response of the API

```JavaScript
    class App extends Component {
    
    async componentDidMount() {
        const data = await getAllStarships();
        console.log(data.results);
    }

    render () {
        return (
        <div className="App">
            <header className="App-header">STAR WARS STARSHIPS</header>
        </div>
        );
    }
    }
```

<h2 id='links'>Use < Link > to create hyperlinks that route client-side </h2>

[Go Back to Summary](#summary)

* Installing  React Router

  * Since React Router is not part of the React library, it needs to be installed separately

    ```Bash
        npm i react-router-dom
    ```

* Fix vulnerability warnings 

    ```Bash
        npm audit fix
    ```

<h2 id='importingapp'>Importing into < App > </h2>

[Go Back to Summary](#summary)


* The top-level component of React Router is the `<BrowserRouter>`
* Since it is a top-level component required for other-related components to work, a best practice is to wrap `<App>` with `<BrowserRouter>` in the entry module (`index.js`)
* `<BrowserRouter>` uses the **HTML5 History API** (`pushState()`, `replaceState()` and the `popstate` event) to keep the UI in sync with the URL in the address bar.

* In `index.js`

```JavaScript
    import React from 'react';
    import ReactDOM from 'react-dom';
    import './index.css';
    import App from './App';
    import * as serviceWorker from './serviceWorker';
    import { BrowserRouter as Router } from 'react-router-dom';

    ReactDOM.render(
        <Router><App /></Router>, 
        document.getElementById('root')
    );

    serviceWorker.unregister();
```

> Note the use of as to declare an alias for `<BrowserRouter>` named `Router`. This allows the use of shorter names for longer named exports such `BrowserRouter`.


<h2 id='createcreatestartshippage'>Create StarshipPage</h2>

[Go Back to Summary](#summary)

* Create the StarshipPage componenet `./componenets/StarshipPage/StarshipPage.jsx`
* In `StarshipPage.jsx`:

    ```JavaScript
        import React from 'react';

        const StarshipPage = (props) => {
            return(
                <div>
                    <h1>Starship Page</h1>
                </div>
            );
        };

        export default StarshipPage;
    ```

<h2 id='firstroute'>First Route</h2>

[Go Back to Summary](#summary)

* With `<BrowserRouter>` now being rendered, we're free to use the `<Route>` component to define client-side routes.
* `<Route>` components are commonly used in the `<App>` component to rener "page" components
* However, we can use `<Route>` in any component which allows for complex routing scenarios.


* In `App.js` add the `Route` named import:
  * Import `Route`
  * `Switch` and `Redirect` we are going to use later

    ```JavaScript
        import { Route, Switch, Redirect } from 'react-router-dom';
        import StarshipPage from './components/StarshipPage/StarshipPage'; 
    ```

  * Now let's add a `<Route>` component within the `render` method:

    ```JavaScript
        render () {
            return (
                <div className="App">
                    <header className="App-header">STAR WARS STARSHIPS</header>
                    <Route component={StarshipPage} />
                </div>
            );
        }
    ```

* The page should now display an extra `<StarshipPage>` under the header
* If you want to attach the `<StarshipPage>` to a certain path

    ```JavaScript
        <Router path='/starship' component={StarshipPage} />
    ```


* Create a folder `pages` to keep organized all the pages of the app
  * So we'll have the following structure

    ```
        .
        └── src
            ├── pages
            │   ├── App
            │   │   ├── App.css
            │   │   ├── App.js
            │   │   └── App.test.js
            │   └── StarshipPage
            │       └── StarshipPage.jsx
            ├── services
            │   └── sw-api.js
            ├── index.css
            └── index.js
    ```

* In `index.js` we'll need to ajust the path for the `APP`

    ```JavaScript
        import App from './pages/App/App';
    ```

* Using the `render` Prop on `<Route>`
  * In our example so far, we used the `component` prop to inform the `<Route>` which component to render, there is a much more flexible and efficient approach.
  * Instead of using `component` we should use the `render` prop that accepts a function to perform "inline" rendering instead:

    ```JavaScript
        <Route exact path='/' render={(props) =>(
            <StarshipPage {...props}/>
        )}>
    ```
  * The `exact` will match exactly the specified path

* Add a **switch case** so our React App won't load others pages by mistake (because they have a path in common)

```JavaScript
    <Switch>
        //! Case path = '/' -> Load this page
            <Route exact path='/' render={()=>('INDEX')}/>
        //! Case path = '/starships' -> Load starship page
        //+ Send the props with this page (history, location, match)
            <Route exact path='/starships' render={(props) =>(
                <StarshipPage {...props}/>
            )}/>
        //! Default page if not found, redirect to home page
            <Route render={() => <Redirect to={{ pathname: '/' }} />} />
    </Switch>
```

* Passing the data to `StarshipPage`:
  * In `App.js`

    ```JavaScript
        class App extends Component {
            state = {
                data: null
            }

            async componentDidMount() {
                const data = await getAllStarships();
                this.setState({ data: data.results })
            }

            render () {
                return (
                <div className="App">
                    <header className="App-header">STAR WARS STARSHIPS</header>
                    <Switch>
                    <Route exact path='/' render={()=>('INDEX')}/>
                    <Route exact path='/starships' render={(props) =>(
                        <StarshipPage {...props} starships={this.state.data}/>
                    )}/>
                    <Route render={() => <Redirect to={{ pathname: '/' }} />} />
                    </Switch>
                </div>
                );
            }
        }
    ```

* LINKS
  * Adding a `<LINK>` to change Routes
  * React Router comes with a `<LINK>` component that we must use instead of reular `<a>` tags to allow the user to navigate to different routes by clicking.
  * Using a regular `<a>` tag will result in a full-page refresh.
    * There's also a `<NavLink>` that makes it easy to add/remove styling based upon if the link's URL matches the current URL.

* In `./src/pages/StarshipPage/StarshipPage.jsx`:
  * Add the `link` module
  
    ```JavaScript
        import { Link } from 'react-router-dom';
    ```

