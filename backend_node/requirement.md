GET /api/formularo: Esta ruta debe permitir a los usuarios recuperar información existente del formulario. Puede devolver una lista de registros del formulario o un registro específico según sea necesario.

POST /api/formulario: Esta ruta debe permitir a los usuarios enviar datos del formulario al servidor para su procesamiento. Debe validar los datos del formulario, almacenarlos en la base de datos y proporcionar una respuesta adecuada.

## Forms

```GET /api/forms

```

```POST /api/forms

```

Rutas para Blogs:
GET /api/blogs: Esta ruta debe permitir a los usuarios recuperar una lista de publicaciones de blog. Puede admitir consultas para filtrar publicaciones según categorías, etiquetas, fechas, etc.

GET /api/blogs/🆔 Esta ruta debe permitir a los usuarios recuperar una publicación de blog específica mediante su identificador (ID).

## Blogs

```
GET /api/blogs

```

#### Blogs Response

````json
[
    {
        "id" : "00000000-0000-0000-0000-000000000000",
        "title" : "name",
        "description" : "https://domain.com/api/image.png",
        "create_at": "01/01/01",
        "update_at" : "999999999",
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

```GET /api/blogs/:id

````

```POST /api/blogs

```

## Category

## Tags

Base de Datos:

Debes configurar una base de datos para almacenar la información del formulario y las publicaciones del blog. Puedes utilizar una base de datos SQL (como MySQL o PostgreSQL) o una base de datos NoSQL (como MongoDB) según tus necesidades.
