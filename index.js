let express = require('express');
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.json({
    type: 'application/json'
}));

let MovieStore = require('./moviestore.js');
let movieStore = new MovieStore();

// get all movies
app.get('/movies', (req, res) => {
    return res.send(movieStore.all());
});

app.get('/', (req, res) => {
    return res.redirect('/movies');
});

// get a movie
app.get('/movies/:title', (req, res) => {
    console.log(req.params);
    let foundMovies = movieStore.find(req.params.title);

    if (foundMovies.length < 1) {
        res.statusCode = 404;
        return res.send({
            message: 'movie not found'
        });
    }
    return res.send({
        message: 'found movie',
        payload: foundMovies.pop()
    });
});

// create new movie
app.post('/movies', (req, res) => {
    console.log(req.body);
    // check input req input
    if (!req.body.Title || req.body.Title.trim().length < 1) {
        res.statusCode = 400;
        return res.send({
            message: 'missing or invalid title'
        });
    }
    // check movie have exist
    if(movieStore.has(req.body.Title)){
        res.statusCode = 400;
        return res.send({
            message: 'movie already existed'
        });
    }
    
    movieStore.add(req.body);
    return res.send({
        message: 'movie added successfully'
    });
});

app.listen(8000, () => {
    console.log('server started at: 127.0.0.1:8000');
});