using System.Text.Json;
using MongoDB.Driver;
using MongoDB.Entities;
using SearchService.Models;
using SearchService.Services;

namespace SearchService.Data;
public class DbInitializer
{
    private static readonly JsonSerializerOptions options = new()
    {
        PropertyNameCaseInsensitive = true
    };

    public static async Task InitDb(WebApplication application)
    {
        await DB.InitAsync("SearchDb", MongoClientSettings.FromConnectionString("mongodb+srv://root:xhIUR6J4hQnMqmz0@carsties-cluster.iqlgmwk.mongodb.net/?retryWrites=true&w=majority"));


        await DB.Index<Item>()
            .Key(x => x.Make, KeyType.Text)
            .Key(x => x.Model, KeyType.Text)
            .Key(x => x.Color, KeyType.Text)
            .CreateAsync();

        // var count = await DB.CountAsync<Item>();

        using var scope = application.Services.CreateScope();

        var httpClient = scope.ServiceProvider.GetRequiredService<AuctionSvcHttpClient>();

        var items = await httpClient.GetItemsForSearchDb();

        if (items.Count > 0) await DB.SaveAsync(items);
        // {
        //     Console.WriteLine("No data - will attempt to seed");
        //     string itemDate = await File.ReadAllTextAsync("Data/auctions.json");

        //     var items = JsonSerializer.Deserialize<List<Item>>(itemDate, options);

        //     await DB.SaveAsync(items);
        // }
    }
}