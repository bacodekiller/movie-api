let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let movieRouter = require('./router/movierouter');

app.use(bodyParser.json({
    type: 'application/json'
}));

// //get all movies
// app.get('/movies', (req, res) => {
//     return res.json(movieStore.all());
// });

app.use('/movies', movieRouter);
app.get('/', (req, res) => {
    return res.redirect('/movies');
});

app.listen(8000, () => {
    console.log('server started at: 127.0.0.1:8000');
});