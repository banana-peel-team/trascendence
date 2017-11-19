# API

## Auth

TODO

## Routes

### Register

* **Request**

  `POST /v1/users`

  ```json
  {
    "username": "<string>",
    "password": "<string>"
  }
  ```

* **Success**

  `STATUS 201`

  ```json
  {
    "user": {
      "id": "<integer>",
      "username": "<string>"
    }
  }
  ```

* **Error**

  `STATUS 422`

### Signin

* **Request**

  `POST /v1/users/signin`

  ```json
  {
    "username": "<string>",
    "password": "<string>"
  }
  ```
* **Success**

  `STATUS 200`

  ```json
  {
    "user": {
      "username": "<string>"
    }
  }
  ```

* **Error**

  `STATUS 422`

### Create game

* **Request**

  `POST /v1/games`

  ```json
  {
    "name": "<string>"
  }
  ```

* **Success**

  `STATUS 201`

  ```json
  {
    "game": {
      "_id": "<integer>",
      "name": "<string>"
    }
  }
  ```

* **Unauthorized**

  `STATUS 403`

* **Error**

  `STATUS 400`

  ```json
  {
    "errors": ["<string>"]
  }
  ```

### Current game

* **Request**

  `GET /v1/games/current`

* **Success**

  ```json
  {
    "game": {
      "_id": "<string>",
      "name": "<string>",
    }
  }
  ```

* **Unauthorized**

  `STATUS 403`

### Add player to a game

* **Request**

  `POST /v1/games/current/players`

  ```json
  {
    "player_id": "<string>"
  }
  ```

* **Success**

  `STATUS 204`

* **Unauthorized**

  `STATUS 403`

* **Error**

  `STATUS 422`

### Updating player information

* **Request**

  `PUT /v1/games/current/players/:id`

  ```json
  {
    "life": "<integer>",
    "source_player": "<string>"
  }
  ```

* **Success**

  `STATUS 204`

* **Unauthorized**

  `STATUS 403`

* **Error**

  `STATUS 422`
