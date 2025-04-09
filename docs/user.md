# Documentation for auth-related routes

This API provides endpoints for user authentication, including account signup and login.

## Endpoints

### 1. User Signup

**Endpoint**: `POST /signup`

**Description**: Allows a new user to create an account by providing their name, email, and password.

**Request Body**:

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Validation:**

- `name`: (string) The name of the user.
- `email`: (string) The email of the user, must be a valid email address.
- `password`: (string) The password for the user account.

**Response:**

- Status: `200 OK`
- Body: A success message along with a generated access token.

```
{
  "message": "Account successfully created",
  "token": "jwt_token_here"
}
```

**Error Responses:**

- Status: `400 Bad Request`
- Body:

```
{
  "errors": [
    {
      "msg": "Invalid value",
      "param": "name",
      "location": "body"
    }
  ]
}
```

Status: `400 Bad Request` (if email already exists)

Body:

    {
      "message": "Email already used"
    }

### 2. User Login

**Endpoint**: POST /login

**Description**: Authenticates an existing user using their email and password.

**Request Body:**

```
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Validation:**

- `email`: (string) The email of the user, must be a valid email address.
- `password`: (string) The password for the user account.

**Response:**

- Status: `200 OK`
- Body: A success message along with a generated access token if authentication is successful.

```
{
  "message": "Successfully logged in",
  "token": "jwt_token_here"
}
```

**Error Responses:**

- Status: `400 Bad Request` (if invalid email)
- Body:

```
{
  "message": "Bad email"
}
```

- Status: `400 Bad Request` (if invalid password)
- Body:

```
    {
      "message": "Bad password"
    }
```

**Error Codes**

- `400 Bad Request`: Validation errors in the request body, or invalid credentials.
- `200 OK`: The request was successful and the user has been authenticated or created.

```

```
