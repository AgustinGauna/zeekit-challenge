interface Life {
  img: string;
}

interface LifesProps {
  lifes: Life[];
}

const Lifes = ({ lifes }: LifesProps) => {
  return (
    <div style={{ minHeight: '40px' }}>
      {lifes.map((life, index) => (
        <img key={index} src={life.img} alt='' />
      ))}
    </div>
  );
};

export default Lifes;
