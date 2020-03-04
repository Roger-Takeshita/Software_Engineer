import React, { useState } from 'react';
import apiService from '../utils/apiService';

function PostForm() {
    const [form, setForm] = useState({ title: '', body: '' });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const newP = await apiService.newPost(
            'https://jsonplaceholder.typicode.com/posts',
            {
                title: form.title,
                body: form.body
            }
        );
        setForm({
            title: '',
            body: ''
        });
        console.log(newP);
    };

    return (
        <div>
            <h1>PostForm</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title: </label>
                    <br />
                    <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        value={form.title}
                    />
                </div>
                <br />
                <div>
                    <label>Body: </label>
                    <br />
                    <textarea
                        type="text"
                        name="body"
                        onChange={handleChange}
                        value={form.body}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default PostForm;
