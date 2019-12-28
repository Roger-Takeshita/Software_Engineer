var express = require('express');
var router = express.Router();
const requestLib = require('request');

const categoryURL 	 = 'https://api.chucknorris.io/jokes/categories';
const categoryJokeURL = 'https://api.chucknorris.io/jokes/random?category='

router.get('/', function(req, res, next) {
	requestLib(categoryURL, (err, response, body) => {
		let categories = JSON.parse(body)
		res.render('index', { 
			jokeData: null, 
			categories
		});
	});
});

router.post('/', function(req, res) {
	let category = req.body.category
	let url = `${categoryJokeURL}${category}`;
	requestLib(categoryURL, (err, response, body) => {
		let categories = JSON.parse(body)
		requestLib(url, (err, response, body) => {
			let jokeData = JSON.parse(body);
			res.render('index', { 
				jokeData: jokeData.value,
				categories
			});
		});
	});
});

module.exports = router;
