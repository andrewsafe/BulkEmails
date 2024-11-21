import React, { useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://127.0.0.1:5000", {
  transports: ["websocket", "polling"],
});

function App() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [files, setFiles] = useState({ emails: null });
  const [emailData, setEmailData] = useState({
    subject: "",
    body: "",
  });
  const [response, setResponse] = useState("");

  const handleLogin = () => {
    socket.emit("login", loginData);
    socket.on("login_response", (data) => {
      setResponse(data.message);
    });
  };

  const handleSend = () => {
    if (!files.emails) {
      alert("Please upload a CSV file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const emailFileContent = reader.result; // Read CSV content as a string

      socket.emit("send_emails", {
        emails: emailFileContent,
        subject: emailData.subject,
        body: emailData.body,
        attachment: null, // Handle attachments if needed
      });

      socket.on("send_response", (data) => {
        setResponse(data.message);
      });
    };

    reader.readAsText(files.emails); // Read the uploaded file
  };

  return (
    <div>
      <h2>Under MSRP</h2>
      <div>
        <h3>Login</h3>
        <input
          type="email"
          placeholder="Email"
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
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

      <div>
        <h3>Upload CSV and Compose Email</h3>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFiles({ emails: e.target.files[0] })}
        />
        <input
          type="text"
          placeholder="Subject"
          value={emailData.subject}
          onChange={(e) =>
            setEmailData({ ...emailData, subject: e.target.value })
          }
        />
        <textarea
          placeholder="Email Body"
          rows="5"
          value={emailData.body}
          onChange={(e) => setEmailData({ ...emailData, body: e.target.value })}
        />
        <button onClick={handleSend}>Send Emails</button>
      </div>

      {response && <p>{response}</p>}
    </div>
  );
}

export default App;
