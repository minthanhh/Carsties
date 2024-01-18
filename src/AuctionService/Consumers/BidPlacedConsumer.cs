using Contracts;
using MassTransit;

namespace AuctionService.Consumers;
public class BidPlacedConsumer(AuctionDbContext dbContext) : IConsumer<BidPlaced>
{
    public async Task Consume(ConsumeContext<BidPlaced> consumeContext)
    {
        Console.WriteLine("--> Consuming bid placed");

        var auction = await dbContext.Auctions.FindAsync(consumeContext.Message.AuctionId);

        if (auction?.CurrentHighBid == null || consumeContext.Message.BidStatus.Contains("Accepted") && consumeContext.Message.Amount > auction.CurrentHighBid)
        {
            auction!.CurrentHighBid = consumeContext.Message.Amount;
            await dbContext.SaveChangesAsync();
        }
    }
}