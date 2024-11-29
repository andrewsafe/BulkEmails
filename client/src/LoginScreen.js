import React, { useState, useEffect } from "react";

const LoginScreen = ({ socket, onLoginResponse }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleLogin = () => {
    if (!loginData.email || !loginData.password) {
      alert("Please enter your email and password.");
      return;
    }

    socket.emit("login", loginData); // Emit login event
  };

  useEffect(() => {
    const handleLoginResponse = (data) => {
      onLoginResponse(data.message, loginData); // Pass credentials and message to App.js
    };

    socket.on("login_response", handleLoginResponse);

    return () => {
      socket.off("login_response", handleLoginResponse); // Clean up the listener
    };
  }, [socket, onLoginResponse, loginData]);

  return (
    <div>
      <h3>Login</h3>
      <input
        type="email"
        placeholder="Email"
        value={loginData.email}
        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="App Password"
        value={loginData.password}
        onChange={(e) =>
          setLoginData({ ...loginData, password: e.target.value })
        }
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginScreen;
