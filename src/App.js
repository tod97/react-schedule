import './App.css';
import React from 'react';

function App() {
  const [tasks, setTasks] = React.useState([]);
  const [cTime, setCTime] = React.useState('');
  const handleCTime = (event) => setCTime(event.target.value);
  const [period, setPeriod] = React.useState('');
  const handlePeriod = (event) => setPeriod(event.target.value);
  const [deadline, setDeadline] = React.useState('');
  const handleDeadline = (event) => setDeadline(event.target.value);

  const addTask = () => {
    if (!isNaN(cTime) && !isNaN(period) && !isNaN(deadline) && cTime.length > 0 && period.length > 0 && deadline.length > 0) {
      setTasks([...tasks, { cTime, period, deadline }]);
      setCTime('');
      setPeriod('');
      setDeadline('');
    }
  };

  const clean = () => {
    setTasks([]);
    setCTime('');
    setPeriod('');
    setDeadline('');
  };

  const gcd = (a, b) => (a ? gcd(b % a, a) : b);
  const lcm = (a, b) => (a * b) / gcd(a, b);

  const isLLSchedulable = () =>
    tasks.map((x) => x.cTime / x.period).reduce((sum, x) => sum + x) <= tasks.length * (Math.pow(2, 1 / tasks.length) - 1);

  const isHBSchedulable = () => tasks.map((x) => x.cTime / x.period + 1).reduce((prod, x) => prod * x) <= 2;

  const loadEDF = () => {
    const hyperPeriod = tasks.map((x) => x.period).reduce(lcm);
    console.log(hyperPeriod);
    console.log(isLLSchedulable());
    console.log(isHBSchedulable());
  };

  return (
    <>
      <div>
        <h1>Add new task:</h1>
        <div>
          <label htmlFor="cTime">Computational Time:</label>
          <input onChange={handleCTime} value={cTime} id="cTime" />
        </div>
        <div>
          <label htmlFor="period">Period:</label>
          <input onChange={handlePeriod} value={period} id="period" />
        </div>
        <div>
          <label htmlFor="deadline">Deadline:</label>
          <input onChange={handleDeadline} value={deadline} id="deadline" />
        </div>

        <button onClick={addTask}>Add</button>
        <button onClick={clean}>Clean</button>
      </div>
      <div>
        {tasks.map((x, index) => (
          <p>
            Task {index + 1}: C={x.cTime}, T={x.period}, D={x.deadline}
          </p>
        ))}
      </div>
      <div>
        <button onClick={loadEDF}>Earliest Deadline First</button>
      </div>
    </>
  );
}

export default App;
