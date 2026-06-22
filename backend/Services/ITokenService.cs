using DonationManagementAPI.Models;

namespace DonationManagementAPI.Services
{
    public interface ITokenService
    {
        string GenerateToken(User user);
    }
}
