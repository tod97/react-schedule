import './App.css';
import React from 'react';

function App() {
  const [tasks, setTasks] = React.useState([
    { cTime: 3, period: 6, deadline: 6, done: false, executed: 0 },
    { cTime: 4, period: 9, deadline: 9, done: false, executed: 0 },
  ]);
  const [cTime, setCTime] = React.useState('');
  const handleCTime = (event) => setCTime(event.target.value);
  const [period, setPeriod] = React.useState('');
  const handlePeriod = (event) => setPeriod(event.target.value);
  const [deadline, setDeadline] = React.useState('');
  const handleDeadline = (event) => setDeadline(event.target.value);

  const addTask = () => {
    if (!isNaN(cTime) && !isNaN(period) && !isNaN(deadline) && cTime.length > 0 && period.length > 0 && deadline.length > 0) {
      setTasks([...tasks, { cTime, period, deadline, done: false, executed: 0 }]);
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

  const EDF = () => {
    const intervals = loadEDF(JSON.parse(JSON.stringify(tasks)));
    plotIntervals(intervals);
  };

  const loadEDF = (tasks) => {
    const intervals = [{ tasks: JSON.parse(JSON.stringify(tasks)) }];
    const hyperPeriod = tasks.map((x) => x.period).reduce(lcm);

    Array.from(Array(hyperPeriod).keys()).forEach((index) => {
      tasks.forEach((task) => {
        if (task.deadline === index && !task.done) {
          console.log('Task not completed before deadline');
        } else {
          if (task.cTime === task.executed) {
            task.executed = 0;
            task.done = true;
          }
          if (task.deadline === index) {
            task.deadline += task.deadline;
            task.done = false;
          }
        }
      });

      let currentTaskIndex = -1;
      tasks.forEach((task, i) => {
        if (currentTaskIndex > -1) {
          currentTaskIndex = !task.done && task.deadline - index < tasks[currentTaskIndex].deadline - index ? i : currentTaskIndex;
        } else {
          currentTaskIndex = task.done ? -1 : i;
        }
      });
      if (currentTaskIndex > -1) tasks[currentTaskIndex].executed++;
      intervals.push({ tasks: JSON.parse(JSON.stringify(tasks)) });
    });

    return intervals;
  };

  const plotIntervals = (intervals) => {
    console.log(intervals);
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
        <button onClick={EDF}>Earliest Deadline First</button>
      </div>
    </>
  );
}

export default App;
