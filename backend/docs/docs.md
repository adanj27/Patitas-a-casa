# Hi

## Usage

Clone the project:

```bash
git clone https://
```

First, go to **Backend/src/Api/appsettings.json** and replace **Secret** and **DefaultConnection** with your JWT secret and your connection string.

```json
{
    // ...
    "JwtSettings": {
        "Secret": "",
        "ExpiryMinutes": 60,
        "Issuer": "PatitasACasa",
        "Audience": "PatitasACasa"
    },
    "ConnectionStrings": {
        "DefaultConnection": "User ID=;Password=;Host=;Port=;Database=;"
    }
    // ...
}
```

then

```bash
docker compose up
```
