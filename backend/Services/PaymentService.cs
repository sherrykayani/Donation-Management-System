using System.Threading.Tasks;

namespace DonationManagementAPI.Services
{
    public class PaymentService : IPaymentService
    {
        public async Task<bool> ProcessPaymentAsync(decimal amount, string method)
        {
            // Simulate network latency (200ms)
            await Task.Delay(200);

            // Mock validation: reject negative or zero values
            if (amount <= 0) return false;

            // Optional: simulate failure for a specific amount/mock method to align with seed logs
            if (amount == 40 && method.ToLower() == "wallet")
            {
                return false;
            }

            return true;
        }
    }
}
