FROM mcr.microsoft.com/dotnet/sdk:7.0-bullseye-slim AS build

WORKDIR /source/
COPY *.sln .

COPY src/Api/*.csproj src/Api/
COPY src/Application/*.csproj src/Application/
COPY src/Domain/*.csproj src/Domain/
COPY src/Infrastructure/*.csproj src/Infrastructure/

RUN dotnet restore

COPY . .

RUN dotnet publish -c Release -o /app/

FROM mcr.microsoft.com/dotnet/aspnet:7.0-bullseye-slim
WORKDIR /app
COPY --from=build /app .

# Skiasharp
RUN apt-get update -y && apt-get install libfontconfig1 -y

EXPOSE 8000

ENV ASPNETCORE_ENVIRONMENT Development
ENV ASPNETCORE_URLS http://+:80
ENV ConnectionStrings__DefaultConnection: "Host=${DB_HOST};Port=${DB_PORT};Database=${DB_NAME};Username=${DB_USER};Password=${DB_PASSWORD}"
ENTRYPOINT ["dotnet", "Api.dll", "--environment=Development"]
