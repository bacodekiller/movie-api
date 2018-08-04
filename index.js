let express = require('express');
let app = express();

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
    let foundMovies =  movieStore.find(req.params.title); 

    if(foundMovies.length < 1){
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

app.listen(8000, () => {
    console.log('server started at: 127.0.0.1:8000');
});