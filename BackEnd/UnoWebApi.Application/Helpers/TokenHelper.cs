using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using UnoWebApi.Domain.Entities;
using System.Globalization;

namespace UnoWebApi.Application.Helpers {
    public static class TokenHelper {
        public static string GenerateJwtToken(List<Claim> claims, IConfiguration configuration) {
            SymmetricSecurityKey authSignKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWTKey:Secret"]!));
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor {
                Expires = DateTime.UtcNow.AddMinutes(50),
                SigningCredentials = new SigningCredentials(authSignKey, SecurityAlgorithms.HmacSha256),
                Subject = new ClaimsIdentity(claims)
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        /// <summary>
        /// When I user logs in a short-lived token is generated and a refresh token with longer span is generated and stored in the database.
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public static RefreshTokens GenerateRefreshToken(Guid userId) {
            return new RefreshTokens
            {
                UserId = userId,
                Token = Guid.NewGuid().ToString(),
                ExpiryDate = DateTime.UtcNow.AddDays(2),
                Revoked = false,
                CreatedAt = DateTime.UtcNow.ToString("o", CultureInfo.InvariantCulture),
                UpdatedAt = DateTime.UtcNow.ToString("o", CultureInfo.InvariantCulture)
            };
        }
    }
}
