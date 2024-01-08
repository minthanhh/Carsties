### Update Database

-   dotnet ef database update

### Migrations

-   dotnet ef migrations add "InitialCommit" -o Data/Migrations

### Drop Database

-   dotnet ef database drop

### Flow Microservices with Dotnet

#### Create Search Service

In folder Carsties, let's create a search service with command like this [dotnet new webapi -o src/SearchService], then add in Carsties.sln with command dotnet sln add src/SearchService

#### Create classlib Contracts

dotnet new classlib -o src/Contracts add to sln: dotnet sln add src/Contracts

### Add reference for both auction and search service

dotnet add reference ../../src/Contracts

### English

It uses a transport, one of several different types. Nó sử dụng một phương tiện vận truyển->[a transport], một trong nhiều loại khác nhau.

That was one of my goals Đó là một trong những mục tiêu của tôi.

Volcalbulary:

-   [OurDeveloperComputer]: Máy tính dành cho nhà phát triển của chúng tôi.
-   [ReliantOn]: Dựa vào, phụ thuộc vào.
-   [ToOperate]: (Kỹ thuật) -> Để vận hành, để hoạt động.
-   [ParticularObject]: Một đối tượng cụ thể.
-   [ParticularClassLibrary]: Thư viện lớp cụ thể.
-   [Conventionally]: .
-   [Namespace]: .
-   [TakeALookAt]: Xem, xem xét.
-   [TakeALook]: Nhìn.
-   [DataInconsistency]: Dữ liệu không nhất quán, mâu thuẫn.
