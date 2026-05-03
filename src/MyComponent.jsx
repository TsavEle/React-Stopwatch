import React, {useState, useEffect, useRef} from 'react';

function MyComponent() {

  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {

    if(isRunning) {
      

      intervalIdRef.current = setInterval(() => {
          setElapsedTime(Date.now() - startTimeRef.current);
          console.log(elapsedTime);
      }, 10)
    }

    return() => {
      clearInterval(intervalIdRef.current);
    }
  }, [isRunning])

  function startStopwatch() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stopStopwatch() {
    setIsRunning(false);
  }

  function resetStopwatch() {
    setIsRunning(false);
    setElapsedTime(0);
  }

  function formatTime() {

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60) % 60);
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / (1000) % 60);
    let miliseconds = Math.floor(elapsedTime / 10 % 60);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    miliseconds = String(miliseconds).padStart(2, "0");
    

    return `${hours}:${minutes}:${seconds}:${miliseconds}`;
  }



  return(
      <div className='stopwatch-container'>
        <span>{formatTime()}</span>

        <div className='myButtons'> 
          <button onClick={startStopwatch} className='start-btn'>Start</button>
          <button onClick={stopStopwatch} className='stop-btn'>Stop</button>
          <button onClick={resetStopwatch} className='reset-btn'>Reset</button>
        </div>
      </div>
  )
}

export default MyComponent