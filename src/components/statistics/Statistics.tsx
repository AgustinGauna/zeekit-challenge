import './statistics.css';

interface statistics {
  statistics: {
    hints: number;
    errors: number;
    guesses: number;
  };
  setShowStats: React.Dispatch<React.SetStateAction<boolean>>;
}

const Statistics = ({ statistics, setShowStats }: statistics) => {
  return (
    <div className='statistics'>
      <div>
        <img
          onClick={() => {
            setShowStats(false);
          }}
          src='/close.png'
          alt=''
        />
      </div>
      <ul>
        <li>Hints: {statistics.hints}</li>
        <li>Errors: {statistics.errors}</li>
        <li>Guesses: {statistics.guesses}</li>
      </ul>
    </div>
  );
};

export default Statistics;
