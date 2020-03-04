import React, { useState, useEffect } from 'react';
import apiService from '../utils/apiService';

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const Posts = await apiService.getPosts(
                    'https://jsonplaceholder.typicode.com/posts'
                );
                setPosts(Posts);
            } catch (err) {
                console.log(err);
            }
        };
        getPosts();
    }, []);

    return (
        <div>
            <h1>
                {posts.map((post, idx) => {
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

export default Posts;
