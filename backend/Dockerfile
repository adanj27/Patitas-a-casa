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

ENTRYPOINT ["dotnet", "Api.dll", "--environment=Development"]
