function getPosts(url) {
    const options = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    };

    try {
        return fetch(url, options)
            .then(res => res.json())
            .catch(err => console.log(err));
    } catch (err) {
        console.log(err);
    }
}

function newPost(url, form) {
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(form)
    };

    try {
        return fetch(url, options)
            .then(res => res.json())
            .catch(err => console.log(err));
    } catch (err) {
        console.log(err);
    }
}

export default {
    getPosts,
    newPost
};
