const Total = ({ parts }) => {
  const total = parts.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.exercises;
  }, 0);

  return <h3>Total of exercises {total}</h3>;
};

export default Total;
