const Total = ({ parts }) => {
    let total = 0;
    parts.forEach((part) => {
      total = total + part.exercises;
    });
    return <h3>Total of exercises {total}</h3>;
  };

  export default Total;