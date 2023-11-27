import useMovies from './hooks/useMovies';
import { useState } from 'react';
import './App.css';
import Statistics from './components/statistics/Statistics';
import YouLost from './components/youLost/YouLost';
import Lifes from './components/lifes/Lifes';

const App = () => {
  const [showStats, setShowStats] = useState<boolean>(false);
  const {
    loading,
    guessMovie,
    setGuess,
    partial,
    movie,
    hint,
    RevealHint,
    lifes,
    statistics,
    guess,
    setLifes,
  } = useMovies();

  return (
    <div className='container'>
      <Lifes lifes={lifes} />

      {loading ? 'Loading...' : <h1>{partial}</h1>}
      <form>
        <input
          value={guess}
          onChange={(e) => {
            setGuess(e.target.value);
          }}
          type='text'
        />

        <button
          disabled={lifes.length === 0 ? true : false}
          type='submit'
          onClick={(e) => guessMovie(e)}
        >
          Guess
        </button>
      </form>
      <button
        disabled={lifes.length === 0 ? true : false}
        onClick={() => {
          RevealHint();
        }}
      >
        Hint
      </button>
      <button onClick={() => setShowStats(!showStats)}>Statistics</button>
      <p>{hint ? movie?.overview : ''}</p>
      {showStats ? (
        <Statistics statistics={statistics} setShowStats={setShowStats} />
      ) : (
        <></>
      )}
      {lifes.length === 0 ? <YouLost setLifes={setLifes} /> : <></>}
    </div>
  );
};

export default App;
