import React, { useState } from "react";

const SendScreen = ({ socket, onSendResponse, credentials }) => {
  const [files, setFiles] = useState({ emails: null });
  const [emailData, setEmailData] = useState({
    subject: "",
    body: "",
  });

  const handleSend = () => {
    if (!files.emails) {
      alert("Please upload a CSV file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const emailFileContent = reader.result;

      socket.emit("send_emails", {
        emails: emailFileContent,
        subject: emailData.subject,
        body: emailData.body,
        sender_email: credentials.email, // Use credentials passed from App.js
        sender_password: credentials.password, // Use credentials passed from App.js
        attachment: null,
      });

      socket.on("send_response", (data) => {
        onSendResponse(data.message); // Notify the parent component
      });
    };

    reader.readAsText(files.emails);
  };

  return (
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
  );
};

export default SendScreen;
