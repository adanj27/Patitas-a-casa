FROM mcr.microsoft.com/dotnet/aspnet:7.0-bulleye-slim AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:7.0-bulleye-slim as build

WORKDIR /src
COPY backendtest.csproj .
RUN dotnet restore backendtest.csproj
COPY . .
WORKDIR /src
RUN dotnet build backendtest.csproj -c Release -o /app/build

FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

FROM base AS final

WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "backendtest.dll"]
