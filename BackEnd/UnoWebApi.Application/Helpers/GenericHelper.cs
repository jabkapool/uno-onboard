using System.Globalization;
using System.Text;

namespace UnoWebApi.Application.Helpers {
    public static class GenericHelper {
        /// <summary>
        /// Generates a random password with the following requirements: minimum 3 lowercase letters, 3 uppercase letters, 2 numbers, and 2 special characters.
        /// </summary>
        private static readonly Random Random = new Random();
        public static string GenerateRandomPassword() {
            const string lowerCase = "abcdefghijklmnopqrstuvwxyz";
            const string upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const string numbers = "0123456789";
            const string specialCharacters = "!@#$%^&*()";

            string randomLowerCase = new string(Enumerable.Range(0, 3).Select(_ => lowerCase[Random.Next(lowerCase.Length)]).ToArray());
            string randomUpperCase = new string(Enumerable.Range(0, 3).Select(_ => upperCase[Random.Next(upperCase.Length)]).ToArray());
            string randomNumbers = new string(Enumerable.Range(0, 2).Select(_ => numbers[Random.Next(numbers.Length)]).ToArray());
            string randomSpecialChars = new string(Enumerable.Range(0, 2).Select(_ => specialCharacters[Random.Next(specialCharacters.Length)]).ToArray());

            string password = randomLowerCase + randomUpperCase + randomNumbers + randomSpecialChars;
            // Shuffle the result to ensure randomness
            password = new string(password.ToCharArray().OrderBy(_ => (Random.Next(2) % 2) == 0).ToArray());
            return password;
        }

        /// <summary>
        /// Converts a string with accentuation eg Gonçálo to a string without accentuation eg Goncalo
        /// </summary>
        public static string RemoveDiacritics(string rawString) {
            String normalizedString = rawString.Normalize(NormalizationForm.FormD);
            StringBuilder stringBuilder = new StringBuilder();

            for(int i = 0; i < normalizedString.Length; i++) {
                Char c = normalizedString[i];
                if(CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark)
                    stringBuilder.Append(c);
            }

            return stringBuilder.ToString();
        }
    }
}
