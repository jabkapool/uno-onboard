using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using MimeKit;

namespace UnoWebApi.Application.Helpers {
    public static class EmailHelper {
        /// <summary>
        /// Check if the email is valid
        /// </summary>
        /// <param name="email">The email address to validate</param>
        /// <returns>true if email is valid. Otherwise false</returns>
        public static bool IsEmailValid(string email) {
            try {
                MailAddress mailAddress = new MailAddress(email);
                return true;
            }
            catch (FormatException) {
                return false;
            }
        }

        /// <summary>
        /// Send email with profile data to user registered in the system
        /// </summary>
        /// <param name="sendMailTo">Email address of the newly created user</param>
        /// <param name="subject">The subject of the email.</param>
        /// <param name="body">User profiles data</param>
        public static void SendEmail(string sendMailTo, string subject, string body) {

            IConfiguration configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            try {
                MimeMessage emailMessage = new MimeMessage();
                emailMessage.From.Add(MailboxAddress.Parse(configuration["Email:Login"]));
                emailMessage.To.Add(MailboxAddress.Parse(sendMailTo));
                emailMessage.Subject = subject;
                emailMessage.Body = new TextPart("plain") {
                    Text = body
                };

                MailKit.Net.Smtp.SmtpClient smtp = new MailKit.Net.Smtp.SmtpClient();
                smtp.Connect(configuration["Email:Server"], int.Parse(configuration["Email:Port"]!), true);
                smtp.Authenticate(configuration["Email:Login"], configuration["Email:Password"]);
                smtp.Send(emailMessage);
                smtp.Disconnect(true);
            }
            catch(SmtpException ex) {
                throw new SmtpException(ex.Message);
            }
        }
    }
}
