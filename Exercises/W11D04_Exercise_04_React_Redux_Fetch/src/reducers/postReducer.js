import { FETCH_POSTS, NEW_POST } from '../actions/types';

const initialState = {
    items: [], //+ This will represent the posts that we get from the action (and the action will be a fetch request)
    item: {} //+ This will represent a single post when we get the response back from the API when we add a new post
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                items: action.payload
            };
        case NEW_POST:
            return {
                ...state,
                item: action.payload
            };
        default:
            return state;
    }
}
