import smtplib
import sys

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

class SendEmail:
    def __init__(self, receiver_email, subject, template) -> None:
        # Sender's credentials and receiver's email
        self.email = 'patitas.ong.test@gmail.com'
        self.password = 'arihrdtrzihuwuzq'
        self.receiver_email = receiver_email
        self.subject = subject
        self.template = template
        self.send_email()

    def send_email(self):
        # Create a multipart message
        msg = MIMEMultipart()
        msg['From'] = self.email
        msg['To'] = self.receiver_email
        msg['Subject'] = self.subject

        # Get the template HTML content
        html_content = self.read_template()

        # Attach HTML content to the message
        msg.attach(MIMEText(html_content, 'html'))

        try:
            # Connect to Gmail's SMTP server
            server = smtplib.SMTP('smtp.gmail.com', 587)
            server.starttls()
            # Login to the sender's email account
            server.login(self.email, self.password)
            # Send the email
            server.sendmail(self.email, self.receiver_email, msg.as_string())
            print('Email sent successfully')

        except Exception as e:
            print('Error sending email:', str(e))

        finally:
            # Close the connection with the SMTP server
            server.quit()

    def read_template(self):
        # Read the contents of the HTML template file
        with open(template, 'r') as file:
            return file.read()


if __name__ == '__main__':
    if len(sys.argv) == 1:
        print('[!] You need to write an email')
        sys.exit()

    receiver_email = sys.argv[1]
    subject = sys.argv[2] if len(sys.argv) > 2 else "Default Subject"  # Use a default subject if not provided
    template = sys.argv[3] if len(sys.argv) > 3 else "./template.html"  # Use a default template if not provided
    
    # Instantiate the SendEmail class and send the email to the specified receiver
    SendEmail(sys.argv[1], sys.argv[2], sys.argv[3])