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
      clean();
    }
  };

  const clean = () => {
    setTasks([]);
    setCTime('');
    setPeriod('');
    setDeadline('');
  };

  return (
    <>
      <div>
        <h1>Aggiungi nuovo task:</h1>
        <div>
          <label htmlFor="cTime">Tempo di computazione:</label>
          <input onChange={handleCTime} value={cTime} id="cTime" />
        </div>
        <div>
          <label htmlFor="period">Periodo:</label>
          <input onChange={handlePeriod} value={period} id="period" />
        </div>
        <div>
          <label htmlFor="deadline">Deadline:</label>
          <input onChange={handleDeadline} value={deadline} id="deadline" />
        </div>

        <button onClick={addTask}>Aggiungi</button>
        <button onClick={clean}>Pulisci</button>
      </div>
      <div>
        {tasks.map((x, index) => (
          <p>
            Task {index + 1}: C={x.cTime}, T={x.period}, D={x.deadline}
          </p>
        ))}
      </div>
    </>
  );
}

export default App;
