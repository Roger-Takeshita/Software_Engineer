import React, { useEffect } from 'react';
// import apiService from '../utils/apiService';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postAction';

function Posts(props) {
    // const [posts, setPosts] = useState([]);

    // useEffect(() => {
    //     const getPosts = async () => {
    //         try {
    //             const Posts = await apiService.getPosts(
    //                 'https://jsonplaceholder.typicode.com/posts'
    //             );
    //             setPosts(Posts);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };
    //     getPosts();
    // }, []);

    useEffect(() => {
        props.fetchPosts();
    }, []);

    useEffect(() => {
        props.posts.unshift(props.newPost);
    }, [props.newPost]);

    return (
        <div>
            <h1>
                {props.posts.map((post, idx) => {
                    return (
                        <div key={idx}>
                            <h6>{post.title}</h6>
                            <p
                                style={{
                                    fontSize: '12px',
                                    fontWeight: 'normal'
                                }}
                            >
                                {post.body}
                            </p>
                        </div>
                    );
                })}
            </h1>
        </div>
    );
}

Posts.prosTyes = {
    fetchPosts: PropTypes.func.isRequired, //! is a property
    posts: PropTypes.array.isRequired,
    newPost: PropTypes.object
};

//! From the data that we fetched from the API
//! We have to get the new items from the state (from redux), we are to create a function mapStateToProps to do that
const mapStateToProps = state => ({
    posts: state.posts.items,
    newPost: state.posts.item
});

export default connect(mapStateToProps, { fetchPosts })(Posts);
