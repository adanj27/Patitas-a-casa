# Patitas a Casa API Documentation

- [Authentication](#authentication)

  - [Login](#login)
    - [Login Request](#login-request)
    - [Login Response](#login-response)
  - [Register](#register)
    - [Register Request](#register-request)
    - [Register Response](#register-response)

- [Pets](#pets)

  - [GetPetById](#getpetbyid)
    - [GetPetById Request](#getpetbyid-request)
    - [GetPetById Response](#getpetbyid-response)
  - [GetPets](#getpets)
    - [GetPets Request](#getpets-request)
    - [GetPets Response](#getpets-response)
  - [CreatePet](#createpet)
    - [CreatePet Request](#createpet-request)
    - [CreatePet Response](#createpet-response)
  - [UpdatePet](#updatepet)
    - [UpdatePet Request](#updatepet-request)
    - [UpdatePet Response](#updatepet-response)
  - [DeletePet](#deletepet)
    - [DeletePet Request](#deletepet-request)
    - [DeletePet Response](#deletepet-response)

- [Card](#card)
  - [Generate](#generatecard)
    - [GenerateCard Request](#generatecard-request)
    - [GenerateCard Response](#generatecard-response)

## Authentication

```js
/api/auth
```

### Login

---

#### Login Request

```
POST /api/auth/login
```

```json
{
  "email": "mail@mail.com",
  "password": "yourpassword"
}
```

#### Login Response

```
200 OK
```

```json
{
  "id": "00000000-0000-0000-0000-000000000000",
  "username": "username",
  "email": "mail@mail.com",
  "token": "supertoken"
}
```

### Register

---

#### Register Request

```
POST /api/auth/register;
```

```json
{
  "username": "yourusername",
  "password": "yourpassword",
  "email": "youremail"
}
```

#### Register Response

```
200 OK
```

```json
{
  "id": "00000000-0000-0000-0000-000000000000",
  "username": "username",
  "email": "mail@mail.com",
  "token": "supertoken"
}
```

## Pets

```js
/api/pets
```

### GetPetById

---

#### GetPetById Request

```
GET /api/pets/{{id}}
```

#### GetPetById Response

```json
{
  "id": "00000000-0000-0000-0000-000000000000",
  "name": "name",
  "imageUrl": "https://domain.com/api/image.png",
  "date": "01/01/01",
  "contact": "999999999",
  "zone": "zone",
  "shelter": {
    "id": "00000000-0000-0000-0000-000000000000",
    "name": "name"
  }, // NULL
  "type": "type", // dog / cat / others
  "description": "description"
}
```

### GetPets

#### GetPets Request

```
GET /api/pets/?pageNumber={{pageNumber}}?pageSize={{pageSize}}
```

#### GetPets Response

```json
[
    {
        "id" : "00000000-0000-0000-0000-000000000000",
        "name" : "name",
        "imageUrl" : "https://domain.com/api/image.png",
        "date": "01/01/01",
        "contact" : "999999999",
        "zone" : "zone",
        "shelter" : {
            "id" : "00000000-0000-0000-0000-000000000000",
            "name" : "name",
        }, // NULL
        "type" : "type", // dog / cat / others
        "description" : "description",
    },
    {
        ...
    },
    {
        ...
    },
]
```

### CreatePet

---

#### CreatePet Request

```
POST /api/pets
```

```json
{
  "name": "name",
  "imageUrl": "https://domain.com/api/image.png",
  "date": "01/01/01",
  "contact": "999999999",
  "zone": "zone",
  "shelter": {
    "id": "00000000-0000-0000-0000-000000000000",
    "name": "name"
  }, // NULL
  "type": "type", // dog / cat / others
  "description": "description"
}
```

#### CreatePet Response

```js
204 NO CONTENT
```

### UpdatePet

---

#### UpdatePet Request

```js
PUT /api/pets/{{id}}
```

```json
{
  "name": "name",
  "imageUrl": "https://domain.com/api/image.png",
  "date": "01/01/01",
  "contact": "999999999",
  "zone": "zone",
  "shelter": {
    "id": "00000000-0000-0000-0000-000000000000",
    "name": "name"
  }, // NULL
  "type": "type", // dog / cat / others
  "description": "description"
}
```

#### UpdatePet Response

```js
204 NO CONTENT
```

### DeletePet

---

#### DeletePet Request

```js
DELETE /api/pets/{{id}}
```

#### DeletePet Response

```js
204 NO CONTENT
```

## Card

```js
/api/card
```

### GenerateCard

---

**NOTE: THE CLIENT/FRONTEND MUST SEND THIS REQUEST IN MULTIPART/FORMDATA FORMAT BECAUSE YOU CANNOT SEND A JSON WITH A FILE.**

#### GenerateCard Request

```
POST /api/card/generate
```

```
name: "name",
description: "description",
zone: "zone",
size: "size",
contact: "999999999",
date: "01/01/01",
imageFile: "image" // BINARY DATA, READ THE ABOVE NOTE
```

#### GenerateCard Response

**THE GENERATED IMAGE** (this image is for reference only)

```js
200 OK
```

```
⠄⠄⠄⠄⢠⣿⣿⣿⣿⣿⢻⣿⣿⣿⣿⣿⣿⣿⣿⣯⢻⣿⣿⣿⣿⣆⠄⠄⠄
⠄⠄⣼⢀⣿⣿⣿⣿⣏⡏⠄⠹⣿⣿⣿⣿⣿⣿⣿⣿⣧⢻⣿⣿⣿⣿⡆⠄⠄
⠄⠄⡟⣼⣿⣿⣿⣿⣿⠄⠄⠄⠈⠻⣿⣿⣿⣿⣿⣿⣿⣇⢻⣿⣿⣿⣿⠄⠄
⠄⢰⠃⣿⣿⠿⣿⣿⣿⠄⠄⠄⠄⠄⠄⠙⠿⣿⣿⣿⣿⣿⠄⢿⣿⣿⣿⡄⠄
⠄⢸⢠⣿⣿⣧⡙⣿⣿⡆⠄⠄⠄⠄⠄⠄⠄⠈⠛⢿⣿⣿⡇⠸⣿⡿⣸⡇⠄
⠄⠈⡆⣿⣿⣿⣿⣦⡙⠳⠄⠄⠄⠄⠄⠄⢀⣠⣤⣀⣈⠙⠃⠄⠿⢇⣿⡇⠄
⠄⠄⡇⢿⣿⣿⣿⣿⡇⠄⠄⠄⠄⠄⣠⣶⣿⣿⣿⣿⣿⣿⣷⣆⡀⣼⣿⡇⠄
⠄⠄⢹⡘⣿⣿⣿⢿⣷⡀⠄⢀⣴⣾⣟⠉⠉⠉⠉⣽⣿⣿⣿⣿⠇⢹⣿⠃⠄
⠄⠄⠄⢷⡘⢿⣿⣎⢻⣷⠰⣿⣿⣿⣿⣦⣀⣀⣴⣿⣿⣿⠟⢫⡾⢸⡟⠄.
⠄⠄⠄⠄⠻⣦⡙⠿⣧⠙⢷⠙⠻⠿⢿⡿⠿⠿⠛⠋⠉⠄⠂⠘⠁⠞⠄⠄⠄
⠄⠄⠄⠄⠄⠈⠙⠑⣠⣤⣴⡖⠄⠿⣋⣉⣉⡁⠄⢾⣦⠄⠄⠄⠄⠄⠄⠄⠄
```
