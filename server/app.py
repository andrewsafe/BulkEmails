import eventlet
eventlet.monkey_patch()

import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from flask_socketio import SocketIO, emit
import smtplib
from dotenv import load_dotenv
import json
import csv
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
# CORS(app, origin=["http://localhost:3000"])
# socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")
CORS(app, origins=["https://undermsrp.netlify.app", "https://6748e0abd233b70008d6969f--undermsrp.netlify.app/"])
socketio = SocketIO(app, cors_allowed_origins=["https://undermsrp.netlify.app", "https://6748e0abd233b70008d6969f--undermsrp.netlify.app/"])

# app = Flask(__name__)
# app.config['SECRET_KEY'] = 'your_secret_key'
# socketio = SocketIO(app, cors_allowed_origins="*")

@app.route("/")
def index():
    return "Backend is running we live bruh!", 200

load_dotenv()
sender_email = os.getenv("SENDER_EMAIL")
sender_password = os.getenv("SENDER_PASSWORD")
smtp_server = "smtp.gmail.com"
port = 465

def send_email(sender_email, sender_password, recipient_email, subject, body, filename=None):
    """Send an email using dynamic credentials."""
    try:
        message = MIMEMultipart()
        message["From"] = sender_email
        message["To"] = recipient_email
        message["Subject"] = subject
        message.attach(MIMEText(body, "plain"))

        if filename:
            with open(filename, "rb") as attachment:
                part = MIMEBase("application", "octet-stream")
                part.set_payload(attachment.read())
                encoders.encode_base64(part)
                part.add_header(
                    "Content-Disposition", 
                    f"attachment; filename={os.path.basename(filename)}"
                )
                message.attach(part)

        # Connect to SMTP server and send email
        with smtplib.SMTP_SSL(smtp_server, port) as server:
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, recipient_email, message.as_string())
    except smtplib.SMTPAuthenticationError:
        raise Exception("SMTP authentication failed. Check your credentials.")
    except Exception as e:
        raise Exception(f"Failed to send email: {e}")


@socketio.on('login')
def handle_login(data):
    """Validate user credentials."""
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        emit('login_response', {'message': 'Email and password are required.'})
        return

    # Test SMTP login
    try:
        with smtplib.SMTP_SSL(smtp_server, port) as server:
            server.login(email, password)
        # Notify frontend of successful login
        emit('login_response', {'message': 'Login successful'})
    except smtplib.SMTPAuthenticationError:
        emit('login_response', {'message': 'Login failed. Check your credentials.'})
    except Exception as e:
        emit('login_response', {'message': f'Error occurred: {str(e)}'})


@socketio.on('send_emails')
def handle_send(data):
    """Send emails using dynamic credentials."""
    emails_csv = data.get('emails')
    subject = data.get('subject')
    body = data.get('body')
    attachment = data.get('attachment')
    sender_email = data.get('sender_email')
    sender_password = data.get('sender_password')

    if not emails_csv or not subject or not body or not sender_email or not sender_password:
        emit('send_response', {'message': 'Missing required fields.'})
        return

    try:
        email_list = emails_csv.splitlines()
        for recipient_email in email_list:
            recipient_email = recipient_email.strip()
            if recipient_email:
                send_email(sender_email, sender_password, recipient_email, subject, body, attachment)
        emit('send_response', {'message': 'Emails sent successfully'})
    except Exception as e:
        emit('send_response', {'message': f'Error occurred: {str(e)}'})


if __name__ == '__main__':
    # socketio.run(app, debug=True)
    port = int(os.environ.get("PORT", 5000))
    socketio.run(app, host="0.0.0.0", port=port, debug=True)

