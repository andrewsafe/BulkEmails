# Bulk Email Sender App 📨

Welcome to the Bulk Email Sender App! This Python script is crafted to streamline the process of sending bulk emails directly from your command line. Whether you're distributing newsletters, job applications, event invitations, or any bulk email, this app simplifies the process, allowing you to send personalized emails efficiently to a list of recipients. It supports attachments and ensures secure login credentials handling through environment variables.

```bash

    """
   _____ _                      _____       _  __
  / ____| |                    / ____|     (_)/ _|
 | (___ | |__   __ _ _ __ ___ | (___   __ _ _| |_
  \___ \| '_ \ / _` | '_ ` _ \ \___ \ / _` | |  _|
  ____) | | | | (_| | | | | | |____) | (_| | | |
 |_____/|_| |_|\__,_|_| |_| |_|_____/ \__,_|_|_|


    """

```

## Features 🚀

- **Bulk Emailing**: Send personalized emails to a list of recipients from a CSV file.
- **Email Customization**: Personalize the email subject and body via a JSON file.
- **Attachments**: Attach files to your emails, ideal for documents like resumes or reports.
- **Secure Credential Handling**: Uses environment variables to securely store email login credentials.
- **User-Friendly Interface**: Simple command-line interface for easy operation.

## Prerequisites 📋

Before getting started, ensure you have:

- Python 3.x installed on your computer.
- A `.env` file with your SMTP email credentials (`SENDER_EMAIL` and `SENDER_PASSWORD`).
- The recipient list in a CSV file named `emails.csv`.
- Any attachments you wish to send, accessible in the script's directory.

## Installation 🛠

1. **Clone or Download**: Clone this repository or download the script files to your machine.
2. **Install Dependencies**: Install the required Python packages:

   ```bash
   pip install python-dotenv
   ```

3. **Setup `.env` File**: Create a `.env` file in the script's directory with your email credentials:

   ```plaintext
   SENDER_EMAIL=your_email@example.com
   SENDER_PASSWORD=your_email_password
   ```

## Usage 📝

1. **Prepare Your CSV**: Format your `emails.csv` with one email address per line for the recipients.
2. **Customize Message**: Edit the `template_message.json` to match your email's subject and body.
3. **Set Attachment (Optional)**: Specify the filename of your attachment in the command line.

### Commands

- **Sending Emails**:

  ```bash
  python bulksender.py send -e template.csv -m template_message.json -a attachment.pdf
  ```

  This command will process and send emails according to the specified CSV file and message template, attaching the specified file.

- **Login**:

  ```bash
  python bulksender.py login your_email@example.com
  ```

  This command securely saves your SMTP credentials for email sending.

## Comand Line Interface 📟

The script provides a user-friendly command-line interface for easy operation. Here's a brief overview of the available commands:

```bash

Welcome to the Email Sender App!

Usage:
    python bulksender.py [command] <arguments>

Commands:
    send    - Execute the send function of the app.
    login   - Perform login operation.

Arguments for 'send':
    -e <path to email CSV file>
    -m <path to message JSON file>
    -a <path to attachment>

Examples:
    python bulksend.py send -e template.csv -m template_message.json -a cv.pdf
    python bulksend.py login abcd@gmail.com


```

![alt text](email.gif)

## Contributing 🤝

Contributions are welcome! Feel free to fork the project, make improvements, and submit pull requests. If you encounter issues or have suggestions, don't hesitate to open an issue on GitHub.

## Notes and Best Practices 🔒

- Ensure you have permission to email the recipients and comply with anti-spam laws.
- The script defaults to Gmail's SMTP server; if using another service, adjust the `smtp_server` and `port` accordingly.
- Be mindful of sending limits imposed by your email service provider to avoid service disruptions.

Happy Emailing! 🎉
