Under MSRP Bulk Email Sender Application

This application allows users to send bulk emails conveniently through a user-friendly web interface. It features a React-based frontend and a Flask-based backend, with real-time communication facilitated by Socket.IO. The app supports secure login via SMTP credentials and dynamic email sending.

Features

	•	User Login: Secure login with email and app password (SMTP credentials).
	•	Bulk Email Sending: Upload a CSV of recipient emails, compose a subject and body, and send.
	•	Real-Time Notifications: React Hot Toast provides success or error notifications for login and email-sending operations.
	•	ASCII Art Feedback: Fun ASCII art is displayed on successful email sending.
	•	Responsive Design: Mobile-friendly layout with modern styling.
	•	Supports Attachments: Optional email attachment feature.

Technologies Used

Frontend:

	•	React: UI framework.
	•	CSS: Styling for the application.

Backend:

	•	Flask: Python framework for backend logic.
	•	Flask-SocketIO: Real-time communication with the frontend.
	•	SMTP: For email authentication and sending.
	•	Eventlet: To support WebSocket handling.

Prerequisites

	•	Node.js: For running the React frontend.
	•	Python 3.x: For the Flask backend.
	•	SMTP Credentials: A valid email and app-specific password (e.g., Gmail app password).

Setup Instructions

Backend Setup:

	1.	Clone the repository:

git clone https://github.com/yourusername/BulkEmails.git
cd BulkEmails/server


	2.	Install dependencies:

pip install -r requirements.txt


	3.	Set up environment variables:
	•	Create a .env file in the server directory:

SENDER_EMAIL=your_email@example.com
SENDER_PASSWORD=your_app_password


	•	Or dynamically provide these through the UI.

	4.	Run the Flask backend:

python app.py

The backend will be available at http://0.0.0.0:5000.

Frontend Setup:

	1.	Navigate to the frontend directory:

cd BulkEmails/frontend


	2.	Install dependencies:

npm install


	3.	Start the React frontend:

npm start

The frontend will be available at http://localhost:3000.

Deployment

Deploy Backend on Render:

	1.	Ensure the app.py uses the dynamic PORT variable:

port = int(os.environ.get("PORT", 5000))
socketio.run(app, host="0.0.0.0", port=port)


	2.	Set the Render build command:

pip install -r requirements.txt


	3.	Set the Render start command:

gunicorn -k eventlet -w 1 -b 0.0.0.0:$PORT app:app


	4.	Deploy the app and note the backend URL.

Deploy Frontend on Netlify:

	1.	Connect the repository to Netlify.
	2.	Set the backend URL in App.js:

const socket = io("https://your-backend.onrender.com/", {
  transports: ["websocket", "polling"],
});


	3.	Deploy the app.

Usage

	1.	Navigate to the frontend (e.g., https://yourfrontend.netlify.app).
	2.	Login: Enter your email and SMTP app password.
	3.	Upload CSV: Select a CSV file of recipient emails.
	4.	Compose Email: Add a subject and body.
	5.	Send: Click the “Send Emails” button. Notifications and ASCII art will confirm success or failure.

File Structure

BulkEmails/
├── server/           # Flask backend
│   ├── app.py        # Main Flask application
│   ├── .env          # Environment variables
│   ├── requirements.txt # Python dependencies
│   └── templates/    # Email templates (optional)
├── client/         # React frontend
│   ├── src/
│   │   ├── App.js    # Main React component
│   │   ├── LoginScreen.js # Login UI
│   │   ├── SendScreen.js  # Bulk email UI
│   │   └── App.css   # Styles
│   └── package.json  # Frontend dependencies
└── README.md         # Project documentation

Sample ASCII Art Response

On successful email sending, you’ll see this response:

Emails sent successfully

   \____________________/
   __/ |_____________|  \__
 /⭕️⭕️______________⭕️⭕️\
  |___/___GTR-R34___\___|
 \🔘🔘_|__|__|__|_🔘🔘/
   |___|            |___|

Contributing

	1.	Fork the repository.
	2.	Create a new branch:

git checkout -b feature-name


	3.	Commit your changes:

git commit -m "Add feature"


	4.	Push to your fork:

git push origin feature-name


	5.	Create a Pull Request.

License

This project is licensed under the MIT License.

Let me know if you’d like further adjustments or additional details! 🚀