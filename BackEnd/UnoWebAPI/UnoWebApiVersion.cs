namespace UnoWebAPI {
    public class UnoWebApiVersion {
        /// <summary>
        /// Version of the API in string format (e.g. "v1.0.0") Major.Minor.Patch
        /// </summary>
        public string? Version { get; set; }
        /// <summary>
        /// Timestamp of the API version in ISO 8601 format (e.g. "2021-08-31T12:00:00Z")
        /// </summary>
        public string? Timestamp { get; set; }
    }
}
