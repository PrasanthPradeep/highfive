import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

// Connect to the backend
const socket = io("http://192.168.56.1:5000"); // replace with your computer’s local IP

const App = () => {
  const [message, setMessage] = useState("Waiting for a partner...");
  const [highFiveStatus, setHighFiveStatus] = useState(null);

  useEffect(() => {
    // Join room for high-five
    socket.emit("joinRoom");

    // Listen for partner found
    socket.on("startHighFive", () => {
      setMessage("High Five Partner Found! Press the button!");
    });

    // Listen for high-five confirmation
    socket.on("highFiveReceived", (timestamp) => {
      setHighFiveStatus("High Five Successful! 🎉");
    });

    return () => socket.disconnect();
  }, []);

  const handleHighFive = () => {
    setMessage("Waiting for your partner to high-five...");
    socket.emit("highFive", Date.now());
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20%" }}>
      <h1>Virtual High-Five App</h1>
      <p>{message}</p>
      <button onClick={handleHighFive} style={{ padding: "10px 20px", fontSize: "16px" }}>
        High Five!
      </button>
      {highFiveStatus && <p>{highFiveStatus}</p>}
    </div>
  );
};

export default App;

