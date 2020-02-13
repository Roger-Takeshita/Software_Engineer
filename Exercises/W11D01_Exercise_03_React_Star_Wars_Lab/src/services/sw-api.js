export function getAllStarships () {
    return fetch('https://swapi.co/api/starships/?format=json')
        .then(res=> res.json());
}