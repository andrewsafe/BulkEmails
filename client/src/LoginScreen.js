import React, { useState } from "react";

const LoginScreen = ({ socket, onLoginResponse }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleLogin = () => {
    socket.emit("login", loginData);
    socket.on("login_response", (data) => {
      onLoginResponse(data.message); // Notify the parent component
    });
  };

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
