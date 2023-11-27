import { useState, useEffect, useMemo, useRef } from 'react';
import { Movie } from '../types/Types';

const useMovies = () => {
  const [movie, setMovie] = useState<Movie>();
  const [loading, setLoading] = useState<Boolean>(true);
  const [guess, setGuess] = useState<string>('');
  const [hint, setHint] = useState<Boolean>(false);
  const [lifes, setLifes] = useState([
    { img: '/life.png' },
    { img: '/life.png' },
    { img: '/life.png' },
  ]);
  const movieList = useRef<Movie[]>([]);
  const [statistics, setStatistics] = useState({
    errors: 0,
    hints: 0,
    guesses: 0,
  });
  const partial = useMemo(() => {
    if (!movie) return '';

    return getPartialMovieName(movie);
  }, [movie]);

  function getRandomMovie(movies: Movie[]): Movie {
    return movies[Math.floor(Math.random() * movies.length)];
  }

  function getPartialMovieName(movie: Movie): string {
    const indexes = Array.from(
      { length: movie.name.length },
      (_, index) => index
    )
      .sort(() => (Math.random() >= 0.5 ? 1 : -1))
      .slice(0, Math.floor(movie.name.length / 2));

    return movie.name.split('').reduce((name, letter, index) => {
      name = name.concat(indexes.includes(index) ? '_' : letter);

      return name;
    }, '');
  }

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    };

    fetch(
      'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1',
      options
    )
      .then((response) => response.json())
      .then((res) => {
        setMovie(getRandomMovie(res.results));
        movieList.current = res.results;
      })
      .finally(() => setLoading(false))
      .catch((err) => console.error(err));
  }, []);

  const guessMovie = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setHint(false);
    if (guess.toLocaleLowerCase() === movie?.name.toLocaleLowerCase()) {
      setStatistics((prevStats) => {
        return {
          ...prevStats,
          guesses: prevStats.guesses + 1,
        };
      });
      setGuess('');
      setMovie(getRandomMovie(movieList.current));
    } else {
      setMovie(getRandomMovie(movieList.current));
      setLifes(lifes.slice(0, -1));
      setGuess('');
      setStatistics((prevStats) => {
        return {
          ...prevStats,
          errors: prevStats.errors + 1,
        };
      });
    }
  };

  const RevealHint = () => {
    if (hint === true) return;

    setStatistics((prevStats) => {
      return {
        ...prevStats,
        hints: prevStats.hints + 1,
      };
    });
    setHint(true);
  };

  return {
    loading,
    movie,
    guessMovie,
    guess,
    setGuess,
    partial,
    hint,
    setHint,
    lifes,
    statistics,
    RevealHint,
    setLifes,
  };
};

export default useMovies;
