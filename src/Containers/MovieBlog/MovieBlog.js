import React, { Component } from 'react';
import AddMovieForm from '../../Components/Movies/AddMovieForm/AddMovieForm.js'
import Movie from '../../Components/Movies/Movie/Movie.js';


class MovieBlog extends Component {

  state = {
        movies: [
            {id: 1, text: 'Интерстеллар'},
            {id: 2, text: 'Начало'},
            {id: 3, text: 'Остров проклятых'}
        ],
        currentMovie: {id: '', text: ''},

    };



  addMovie = (event) => {
        event.preventDefault();

        let movie = {...this.state.currentMovie};
        const now = new Date();
        movie.id = now.getTime();
        let movies = [...this.state.movies, movie];

        this.setState({
            ...this.state,
            movies: movies,
            currentMovie: {id: '', text: ''}
        });
    };

  removeMovie = (id) => {
        let movieId = this.state.movies.findIndex(movie => {
            return movie.id === id;
        });

        const movies = [...this.state.movies];
        movies.splice(movieId, 1);

        this.setState({
            ...this.state,
            movies: movies
        });
  };

  changeMovieInput = (event) => {
        let value = event.target.value;
        let currentMovie = {
            ...this.state.currentMovie,
            text: value
        };

        this.setState({
            ...this.state,
            currentMovie
        })
    };

  onChangeMovie = (event, id) => {
        const index = this.state.movies.findIndex(item => item.id === id);

        let movies = [...this.state.movies];
        movies[index].text = event.target.value;

        this.setState({movies});
    };


  isAddButtonDisabled = () => {
       return this.state.currentMovie.text === '';
    };


  render() {
    return (
            <div>
                <div>
                    <h2>Добавить фильм</h2>
                    <AddMovieForm
                        onChangeInput={this.changeMovieInput}
                        onAddMovie={this.addMovie}
                        isAddButtonDisabled={this.isAddButtonDisabled()}
                    />
                </div>
                <div>

                  {this.state.movies.map((movie) => {
                      return <Movie

                          key={movie.id}
                          movies={movie.text}
                          onChangeInput={(event) => this.onChangeMovie(event, movie.id)}
                          onDelete={() => this.removeMovie(movie.id)}
                      />
                  })}

                </div>
            </div>
        );
  }
}

export default MovieBlog;