import StatisticLine from "./StatisticLine";
const Statistics = ({ stats }) => {
  //Desestructuring
  const good = stats.good;
  const neutral = stats.neutral;
  const bad = stats.bad;

  const total = () => {
    return good + neutral + bad;
  };

  const average = () => {
    const points = good + bad * -1;
    let average = points / total();
    if (!isNaN(average)) {
      return points / total();
    } else {
      return 0;
    }
  };

  const positive = () => {
    return ((good * 100) / total())+" %";
  };

  if (total() > 0) {
    return (
      <>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={total()} />
            <StatisticLine text="average" value={average()} />
            <StatisticLine text="positive" value={positive()} />
          </tbody>
        </table>
      </>
    );
  }
  return <p>No feedback given</p>;
};

export default Statistics;
