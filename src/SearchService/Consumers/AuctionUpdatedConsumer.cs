using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace AuctionService.Consumers;
public class AuctionUpdatedConsumer(IMapper mapper) : IConsumer<AuctionUpdated>
{
    public async Task Consume(ConsumeContext<AuctionUpdated> context)
    {
        var item = mapper.Map<Item>(context.Message);
        var result = await DB.Update<Item>().Match(a => a.ID == context.Message.Id).ModifyOnly(x => new
        {
            x.Color,
            x.Model,
            x.Make,
            x.Year,
            x.Mileage
        }, item).ExecuteAsync();

        if (!result.IsAcknowledged) throw new MessageException(typeof(AuctionUpdated), "Problem updating mongodb");
    }
}