namespace UnoWebApi.Domain.Models {
    public class LoginResult {

        ///<summary>
        /// User Id
        /// </summary>
        public Guid UserId { get; set; }

        ///<summary>
        /// Is the Login Successful or not.
        ///</summary>
        public bool IsLoginSuccessful { get; set; }

        ///<summary>
        /// Login Failure Reason
        ///</summary>
        public string? LoginFailureReason { get; set; }

        ///<summary>
        /// User Name
        /// </summary>
        public string? UserName { get; set; }

        /// <summary>
        ///The token that will be used to authenticate the user.
        ///</summary>
        public string? Token { get; set; }

        ///<summary>
        ///The expiration time of the token in ISO 8601 format (e.g. "2021-08-31T12:00:00Z")
        ///</summary>
        public string? Expiration { get; set; }

        ///<summary>
        ///The user role.
        ///</summary>
        public string? Role { get; set; }

        ///<summary>
        /// The user Email.
        ///</summary>
        public string? Email { get; set; }

        ///<summary>
        ///The User Phone.
        ///</summary>
        public string? PhoneNumber { get; set; }

        ///<summary>
        ///The profile picture.
        ///</summary>
        public string? Picture { get; set; }
    }
}
