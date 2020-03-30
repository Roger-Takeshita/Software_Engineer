function getStudents(path) {
    const options = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    };
    return fetch(path, options).then((res) => res.json());
}

export default {
    getStudents
};
