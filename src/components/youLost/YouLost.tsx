import './youLost.css';

interface Props {
  setLifes: React.Dispatch<
    React.SetStateAction<
      {
        img: string;
      }[]
    >
  >;
}

const YouLost = ({ setLifes }: Props) => {
  return (
    <div className='lostContainer'>
      <h1>You Lost</h1>

      <button
        onClick={() => {
          setLifes([
            { img: '/life.png' },
            { img: '/life.png' },
            { img: '/life.png' },
          ]);
        }}
      >
        Play Again
      </button>
    </div>
  );
};

export default YouLost;
