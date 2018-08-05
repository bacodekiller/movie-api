class MovieStore {
    constructor() {
        this.movieData = require('./datastore.json');
    }

    all() {
        return this.movieData;
    }

    find(title) {
        return this.movieData.filter(m => m.Title === title);
    }

    add(movie) {
        this.movieData.push(movie);
    }

    has(title) {
        let movies = this.find(title);
        return movies.length > 0;
    }

    update(title, newInfo) {
        // check movie with title have exist
        let movies = this.find(title);
        if (movies.length < 1) {
            return false;
        }
        let oldMovie = movies.pop();
        let newMovie = Object.assign(oldMovie, newInfo);
        let oldMovieList = this.movieData.filter(m => m.Title !== title);
        this.movieData = [...oldMovieList, newMovie];
        return true;
    }

    remove(title) {
        this.movieData = this.movieData.filter(m => m.Title !== title);
    }

    search(title) {
        return this.movieData.filter(m => m.Title.includes(title));
    }
}

module.exports = MovieStore;