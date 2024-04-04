namespace UnoWebApi.Domain.Entities {
    public class RefreshTokens {
        /// <summary>
        /// The Id of the JWT refresh token.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Unique string identifying the refresh token.
        /// </summary>
        public string? Token { get; set; }

        /// <summary>
        /// The expiry date of the refresh token.
        /// </summary>
        public DateTime ExpiryDate { get; set; }

        /// <summary>
        /// A boolean indicating if the refresh token has been revoked.
        /// </summary>
        public bool Revoked { get; set; }

        /// <summary>
        /// The date and time the refresh token was created in the ISO 8061 format.
        /// </summary>
        public string? CreatedAt { get; set; }

        /// <summary>
        /// The date and time the refresh token was last updated in the ISO 8061 format.
        /// </summary>
        public string? UpdatedAt { get; set; }

        /// <summary>
        /// The UserId to which the refresh token belongs to.
        /// It's the Foreign Key to the User table.
        /// </summary>
        public Guid UserId { get; set; }

        /// <summary>
        /// The User to which the refresh token belongs to.
        /// Navigation Property.
        /// </summary>
        public virtual ApplicationUser? User { get; set; }
    }
}
