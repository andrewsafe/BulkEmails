import React, { useState } from "react";
import { io } from "socket.io-client";
import "./App.css";
import LoginScreen from "./LoginScreen";
import SendScreen from "./SendScreen";

// const socket = io("http://127.0.0.1:5000", {
//   transports: ["websocket", "polling"],
// });
const socket = io("https://undermsrp.netlify.app/", {
  transports: ["websocket", "polling"],
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [response, setResponse] = useState("");

  const handleLoginResponse = (message) => {
    setResponse(message);
    if (message === "Login successful") {
      // Adjust this based on your backend response
      setIsLoggedIn(true); // Navigate to the SendScreen
    } else {
      alert("Login failed. Please check your credentials."); // Optional error handling
    }
  };

  return (
    <div>
      <h2>Under MSRP</h2>

      {!isLoggedIn ? (
        // Show LoginScreen if not logged in
        <LoginScreen socket={socket} onLoginResponse={handleLoginResponse} />
      ) : (
        // Show SendScreen if logged in
        <SendScreen socket={socket} onSendResponse={setResponse} />
      )}

      {response && <p>{response}</p>}
    </div>
  );
}

export default App;
