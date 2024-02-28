import { useState, useEffect } from "react";

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [timer, setTimer] = useState(null);
  const [isLapButtonVisible, setIsLapButtonVisible] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - time;
      const interval = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
      setTimer(interval);
      setIsLapButtonVisible(true);
      return () => clearInterval(interval);
    } else {
      setIsLapButtonVisible(false);
    }
  }, [isRunning, time]);

  const startStopwatch = () => {
    setIsRunning(true);
  };

  const stopStopwatch = () => {
    setIsRunning(false);
    clearInterval(timer);
  };

  const resetStopwatch = () => {
    setTime(0);
    setLaps([]);
    setIsRunning(false);
    clearInterval(timer);
    setIsLapButtonVisible(false);
  };

  const lapStopwatch = () => {
    const newLap = { id: laps.length, time };
    setLaps([...laps, newLap]);
  };

  const deleteLap = (id) => {
    setLaps(laps.filter((lap) => lap.id !== id));
  };

  const formatTime = (time) => {
    const pad = (n) => (n < 10 ? "0" + n : n);
    const milliseconds = pad(Math.floor((time % 1000) / 10));
    const seconds = pad(Math.floor((time / 1000) % 60));
    const minutes = pad(Math.floor((time / (1000 * 60)) % 60));
    const hours = pad(Math.floor((time / (1000 * 60 * 60)) % 24));

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <div className="bg-black w-full h-screen ">
      <div className="container mx-auto h-screen w-full flex flex-col justify-center items-center text-white">
        <h2 className="text-5xl my-4 bg-blue-400 px-4 py-2 rounded-md font-medium shadow-blue-500/50 shadow-lg">
          {formatTime(time)}
        </h2>
        <div className="flex gap-8 items-center my-10">
          <button
            onClick={isRunning ? stopStopwatch : startStopwatch}
            className="bg-transparent border-blue-400 border-2 rounded-full w-20 h-20 hover:bg-blue-400 ease-in-out transition text-2xl duration-150 shadow-blue-500/50 shadow-lg text-blue-400 hover:text-white"
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            className="bg-transparent border-red-500 border-2 rounded-full w-20 h-20 hover:bg-red-500 ease-in-out transition text-2xl duration-150 shadow-red-500/50 shadow-lg text-red-400 hover:text-white"
            onClick={resetStopwatch}
          >
            Reset
          </button>

          {isLapButtonVisible && (
            <button
              className="bg-transparent lag-btn  border-yellow-400 border-2 rounded-full w-20 h-20 hover:bg-yellow-400 ease-in-out transition text-2xl duration-150 shadow-yellow-500/50 shadow-lg text-yellow-400 hover:text-white"
              onClick={lapStopwatch}
            >
              Lap
            </button>
          )}
        </div>

        <div className="h-60 mt-20 scrollbar  scrollbar-track-transparent  scrollbar-thumb-red-700 text-2xl py-4 overflow-auto px-4 ">
          <ul className="flex flex-col justify-center gap-4 ">
            {laps.map((lap) => (
              <li
                className="text-blue-500 flex items-center gap-4  "
                key={lap.id}
              >
                {formatTime(lap.time)}
                <button
                  className="bg-transparent text-red-700 hover:bg-red-700 hover:text-white border-red-700 shadow-md shadow-red-500 mx-4 border-2 px-3 py-1 rounded-lg"
                  onClick={() => deleteLap(lap.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
