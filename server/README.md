## **Fancy-Todo**

- **URL**

  http://localhost:3000/users/

- **Method:**

  `GET`

- **Success Response:**

  List of all Users

  - **Code:** 200 <br>
    **Content:** 
    ```javascript
    [
      {
        id: 1,
        name: "Wyrdhn"
      },
    ];
    ```

- **Error Response:**

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal server error" }`

* **URL**

  http://localhost:3000/users/:id

* **Method:**

  `GET`

* **URL Params**

  **Required:**

  `id=[integer]`

* **Success Response:**

  Detail of one user filtered by ID

  - **Code:** 200 <br />
    **Content:** 
    ```javascript
    [
      {
        id: 1,
        name: "Wyrdhn",
      },
    ];
    ```

* **Error Response:**

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal server error" }`

  OR

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User not found" }`

* **URL**

  http://localhost:3000/users/register

* **Method:**

  `POST`

* **Data Params**

  **Required:**

  `name=[string]`
  `password=[string]`
  `email=[string]`

* **Success Response:**

  Register new User

  - **Code:** 201 <br />
    **Content:** `{ msg:`\${name} created successfully`}`

* **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ error : "Email is already in use" }`

  OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal server error" }`

* **URL**

  http://localhost:3000/users/login

* **Method:**

  `POST`

* **Data Params**

  **Required:**

  `email=[string]`
  `password=[string]`

* **Success Response:**

  Login

  - **Code:** 200 <br />
    **Content:** `{ msg:`\${name} logged in successfully`}`

* **Error Response:**

  - **Code:** 404 <br />
    **Content:** `{ error : "User not found" }`

  OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal server error" }`

* **URL**

  http://localhost:3000/users/manga/:title

* **Method:**

  `GET`

* **URL Params**

  **Required:**

  `title=[string]`

* **Success Response:**

  Showing manga by name

  - **Code:** 200 <br />
    **Content:** 
    ```javascript
    [
      {
        image: "https://media.kitsu.io/manga/poster_images/5265/medium.jpg?1434260622",
        title: "Persona 3",
        rating: 78.72,
        status: "finished",
        volume: 0
      }
    ];
    ```

* **Error Response:**

  - **Code:** 404 <br />
    **Content:** `{ error : "Manga not found" }`

  OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal server error" }`

* **URL**

  http://localhost:3000/users/:id/favManga

* **Method:**

  `GET`

* **URL Params**

  **Required:**

  `id=[integer]`

* **Success Response:**

  List of favorited manga

  - **Code:** 200 <br />
    **Content:** 
    ```javascript
    [
      {
        image: "https://media.kitsu.io/manga/poster_images/5265/medium.jpg?1434260622",
        title: "Persona 3",
        rating: 78.72,
        status: "finished",
        volume: 0
      }
    ];
    ```

* **Error Response:**

  - **Code:** 401 <br />
    **Content:** `{ error : "User had not favorited any manga" }`

  OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal server error" }`

- **URL**

  http://localhost:3000/users/:id/favManga

- **Method:**

  `POST`

- **Success Response:**

  Adding manga to favorites AFTER searching for a manga (can only be done after searching)

  - **Code:** 201 <br />

    **Content:** `{ msg: "Manga added successfully"}`

- **Error Response:**

- **Code:** 401 <br />
    **Content:** `{ error : "You've already favorited this manga" }`

    OR

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal server error" }`

* **URL**

  http://localhost:3000/users/:id/favManga/:manga_id

* **Method:**

  `DELETE`

* **URL Params**

  **Required:**

  `id=[integer]`
  `manga_id=[integer]`

* **Success Response:**

  Deleting user's favorite manga by id

  - **Code:** 200 <br />
    **Content:** `{ msg: "Manga removed successfully"}`
    
* **Error Response:**

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal server error" }`

* **URL**

  http://localhost:3000/quote

* **Method:**

  `GET`

* **Success Response:**

  Get random anime quote

  - **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
      quote: "My name is Duck. Yes, like the bird. Take it up with my parents. They never loved me!",
      character: "Ahiru Arima",
      anime: "Princess Tutu"
    }```
    
* **Error Response:**

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal server error" }`

* **URL**

  http://localhost:3000/amie/:title

* **Method:**

  `GET`

* **Success Response:**

  Find anime by name

  - **Code:** 200 <br />
    
* **Error Response:**

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal server error" }`

* **URL**

  http://localhost:3000/anime/top

* **Method:**

  `GET`

* **Success Response:**

  Find top anime

  - **Code:** 200 <br />
    
* **Error Response:**

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal server error" }`

* **URL**

  http://localhost:3000/anime/genre/:genre

* **Method:**

  `GET`

* **URL Params**

  **Required:**

  `genre=[string]`

* **Success Response:**

  Find anime by genre

  - **Code:** 200 <br />
    
* **Error Response:**

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal server error" }`

* **URL**

  http://localhost:3000/anime/:year/:season

* **Method:**

  `GET`

* **URL Params**

  **Required:**

  `year=[integer]`
  `season=[string]`

* **Success Response:**

  Find anime by year and season

  - **Code:** 200 <br />
    
* **Error Response:**

  - **Code:** 500 <br />
    **Content:** `{ error : "Internal server error" }`