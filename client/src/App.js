import React, { useState } from "react";
import { io } from "socket.io-client";
import "./App.css";
import LoginScreen from "./LoginScreen";
import SendScreen from "./SendScreen";

const socket = io("https://bulkemails-xkmq.onrender.com/", {
  transports: ["websocket", "polling"],
});
// const socket = io("http://localhost:5000", {
//   transports: ["websocket", "polling"],
// });

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [credentials, setCredentials] = useState({ email: "", password: "" }); // Store credentials
  const [response, setResponse] = useState("");

  const handleLoginResponse = (message, loginData) => {
    setResponse(message);
    if (message === "Login successful") {
      setIsLoggedIn(true); // Navigate to SendScreen
      setCredentials(loginData); // Save user credentials
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
        <SendScreen
          socket={socket}
          onSendResponse={setResponse}
          credentials={credentials} // Pass credentials to SendScreen
        />
      )}

      {response && (
        <div>
          <p>Response:</p>
          <pre style={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
            {response}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;
