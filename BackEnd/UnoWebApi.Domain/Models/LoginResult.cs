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
        ///The expiration time of the token.
        ///</summary>
        public string? Expiration { get; set; }
        ///<summary>
        ///The user role.
        ///</summary>
        public string? Role { get; set; }
    }
}
