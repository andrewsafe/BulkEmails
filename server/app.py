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
CORS(app, origin=["http://localhost:3000"])
socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")

# app = Flask(__name__)
# app.config['SECRET_KEY'] = 'your_secret_key'
# socketio = SocketIO(app, cors_allowed_origins="*")

load_dotenv()
sender_email = os.getenv("SENDER_EMAIL")
sender_password = os.getenv("SENDER_PASSWORD")
smtp_server = "smtp.gmail.com"
port = 465

def send_email(recipient_email, subject, body, filename):
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
            part.add_header("Content-Disposition", f"attachment; filename={os.path.basename(filename)}")
            message.attach(part)

    with smtplib.SMTP_SSL(smtp_server, port) as server:
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, recipient_email, message.as_string())

@socketio.on('login')
def handle_login(data):
    email = data['email']
    password = data['password']
    with open(".env", "w") as file:
        file.write(f"SENDER_EMAIL={email}\nSENDER_PASSWORD={password}\n")
    emit('login_response', {'message': 'Login successful'})

@socketio.on('send_emails')
def handle_send(data):
    emails_csv = data.get('emails')
    subject = data.get('subject')
    body = data.get('body')
    attachment = data.get('attachment')

    if not emails_csv or not subject or not body:
        emit('send_response', {'message': 'Missing required fields: emails, subject, or body.'})
        return

    # Decode emails_csv if it's bytes
    if isinstance(emails_csv, bytes):
        emails_csv = emails_csv.decode('utf-8')

    # Save the CSV file temporarily
    csv_filename = 'emails.csv'
    with open(csv_filename, 'w') as f:
        f.write(emails_csv)

    # Process each email in the CSV and send
    try:
        with open(csv_filename, 'r') as f:
            reader = csv.reader(f)
            for row in reader:
                recipient_email = row[0].strip()
                send_email(recipient_email, subject, body, attachment)
        emit('send_response', {'message': 'Emails sent successfully'})
    except Exception as e:
        emit('send_response', {'message': f'Error occurred: {str(e)}'})

if __name__ == '__main__':
    socketio.run(app, debug=True)
