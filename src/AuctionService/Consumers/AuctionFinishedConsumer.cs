using Contracts;
using MassTransit;
using AuctionService.Entities;

namespace AuctionService.Consumers;
public class AuctionFinishedConsumer(AuctionDbContext dbContext) : IConsumer<AuctionFinished>
{
    public async Task Consume(ConsumeContext<AuctionFinished> consumeContext)
    {
        Console.WriteLine("--> Consuming auction finished");

        var auction = await dbContext.Auctions.FindAsync(consumeContext.Message.AuctionId);

        if (consumeContext.Message.ItemSold)
        {
            auction!.Winner = consumeContext.Message.Winner;
            auction.SoldAmount = consumeContext.Message.Amount;
        }

        auction!.Status = auction.SoldAmount > auction.ReservePrice ? Status.Finished : Status.ReserveNotMet;

        await dbContext.SaveChangesAsync();
    }
}