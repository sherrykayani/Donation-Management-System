using System.Threading.Tasks;

namespace DonationManagementAPI.Services
{
    public interface IPaymentService
    {
        Task<bool> ProcessPaymentAsync(decimal amount, string method);
    }
}
