import { FETCH_POSTS, NEW_POST } from './types';

// export function fetchPosts() {
//     return function(dispatch) {
//         //! Thunk middleware allows us to call the dispatch directly (so we can make async requests);
//         //! Dispatch is kind of resolve in a promise
//         fetch('https://jsonplaceholder.typicode.com/posts')
//             .then(res => res.json())
//             .then(posts =>
//                 dispatch({
//                     type: FETCH_POSTS,
//                     payload: posts
//                 })
//             );
//     };
// }

//+ The same function as above but cleaner, using ES6 syntax
export const fetchPosts = () => dispatch => {
    //! Thunk middleware allows us to call the dispatch directly (so we can make async requests);
    //! Dispatch is kind of resolve in a promise
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(posts =>
            dispatch({
                type: FETCH_POSTS,
                payload: posts
            })
        );
};

export const createPost = postData => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
        .then(res => res.json())
        .then(post =>
            dispatch({
                type: NEW_POST,
                payload: post
            })
        );
};
