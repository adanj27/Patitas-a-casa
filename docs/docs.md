# SUPER DOC

Hi MatiasSosa (you are probably the person reading this).

I'm going to try to explain the folder structure, the parts that need to be improved, decisions that i have done and the features that we should implement.

for time, i decided to make this temporal mini doc in a markdown file as opposed to using a more comprehensive tool such as Sphinx.

**IMPORTANT NOTE: a chat with engo:**

```
Manzana: "hay mas tareas?"

Engo: "algo relacionado con un tema de login pero para futuras versiones"
Engo: "y de subir mascotas"
Engo: "por un form"
```

That is, probably we have to implement this not too long from now (probably when we finish this). so we have to try to keep this clean and scalable.

## FOLDER STRUCTURE

### `docs`

I would rather write a better doc with Sphinx and this theme that you have probably seen on some website: https://github.com/readthedocs/sphinx_rtd_theme For now, I think this mini-doc is fine.

### `src`

-   `assets`: to generate the final image, i use a template of the original card: https://www.figma.com/file/lj9V3SPUqy9qKImJYnj6iY/HO-PET?node-id=960%3A6&t=pyaD0GE3H3BNCHzR-1
-   `Controllers`: I was using the ImageController.cs to return the images stored on the server but I find a better solution built into .net core: Static Files, the configuration is in Program.cs (App.UseStaticFiles(...)). However, I haven't deleted the file yet because I haven't tested enough how the "StaticFiles" behave. I recommend leaving it there for the time being.
-   `Data`: creates the database and the required tables
-   `Dtos`: one for the request and one for the response. This is because the request receives an image but the response returns the URL (specifically, in the get method).
-   `Models`: The dog.cs model to represent the table "dogs" in the database.
-   `Profiles`: this is important, I did some weird stuff here. AutoMapperProfile.cs is the automapper configuration, you can see more about the "Profiles" in the automapper docs, the first map: "DogDtoRequest a Dog". Change the name to Unix Timetamp format instead of the real filename. The second map: "Dog to DogDtoResponse" uses a custom Resolver (DogToDtoResponseResolver.cs) to create the full url and send it to the frontend. Thus, the frontend dev can simply copy the link.
-   `Properties`: I added some profiles for production.
-   `Repositories`: Access to the database is its only function, it doesn't validate anything. That work is for the Services.
-   `results`: The images + processing. The name is arbitrary and i don't know if it's the best wat to do this. But temporaly it works.
-   `Services`: DogService.cs is where the logic of the application lies. ImageService.cs is where the images are modified/generated. i'll explain later about this.
-   `.dockerignore`: self-descriptive
-   `appsettings.Development.json`: The connection string for development is here
-   `appsettings.json`: The connection for hipythetic production is here (although for now they are almost the same)
-   `backendtest.csproj` : I added a extra property:
    ```
    <TreatWarningsAsErrors>true</TreatWarningsAsErrors>
    ```
-   `docker-compose.dev.yml`: self-descriptive
-   `docker-compose.yml`: self-descriptive
-   `Dockerfile`: self-descriptive
-   `Dockerfile.dev`: self-descriptive
-   `littlefrontend.html`: read the comment in the file.
-   `Program.cs`: read the comments in the file.

### `tests`

Empty! It is important to write tests... but I think we should do them after finishing the rest of the project. I've heard that xUnit is the most used framework (in the .Net context), but I haven't tested much either. If you have a lot of experience with one of them then we'll do it with that one.

`README.md` - here should have a little description on how run the project.

`.editorconfig` - i think that implement it would be a great idea. https://editorconfig.org/

## DETAILS ...

-   In another project, I'm very close to finishing the image processing. i recommend you not to bother too much to read the ImageService.cs since it's incomplete and there is little documentation about Skiasharp. And as i have said i have it already well advanced in another project. anyway, here I explain how it will work:

1. Receive the raw image from the frontend
2. Resize until the smallest of its axes is 512 px. Why? Look at the figma file and you'll see that the image resolution is 512 x 512
3. Round the image and add white borders (look at the figma).
4. Center the image in the card.
5. Create the text with the data of the user add the styles and put it on the card.

Note: Ergo don't specify me about validation (if the image should have unique formats, or )

## GOALS

-   Write a better documentation with sphinx (at the end of the project)
-   Write the tests (at the end of the project)
-   Fix my disaster with the Dockerfiles and Docker-composes (help me a lot from chatgpt so if there are better ways to do them, please correct them.)
-   Error checking, I haven't thought too much about error checking when writing the code, so if you find something that might cause strange errors, please fix it.
-   Security flaws? actually, i don't think there are any major secrets yet. The ConnecionString is the only problem, although i think where it is now is fine.
