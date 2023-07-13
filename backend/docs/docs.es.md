# Hola

## Usage

Clona el projecto:

```bash
git clone https://
```

Ve a **Backend/src/Api/appsettings.json** y reemplaza **Secret** y **DefaultConnection** con tu JWT key y tu connection string.

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

luego

```bash
docker compose up
```
