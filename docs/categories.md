# Documentation for general routes

This API provides endpoints to manage lines and stops within categories. It supports retrieving lines, stop details, and creating new stops.

## Endpoints

### 1. Get all lines in a category

**Endpoint**: `GET /:catId/lines`

**Description**: Fetches all lines belonging to a specific category by its `catId`.

**Request Parameters**:

- `catId` (path parameter): The ID of the category.

**Response**:

- Status: `200 OK`
- Body: A list of line objects in JSON format.

```json
[
  {
    "id": 1,
    "categoryId": 1,
    "name": "Line 1",
    "createdAt": "2025-04-09T12:00:00Z",
    "updatedAt": "2025-04-09T12:00:00Z"
  },
  {
    "id": 2,
    "categoryId": 1,
    "name": "Line 2",
    "createdAt": "2025-04-09T12:00:00Z",
    "updatedAt": "2025-04-09T12:00:00Z"
  }
]
```

**Error Response**:

- Status: `500 Internal Server Error`
- Body:

```json
{
  "error": "Failed to fetch lines",
  "message": "Error details"
}
```

### 2. Get a specific line by its ID in a category

**Endpoint**: `GET /:catId/lines/:lineId`

**Description**: Fetches details of a specific line, including creation date, first and last vehicle, and the list of stops in order.

**Request Parameters**:

- `catId` (path parameter): The ID of the category

- `lineId` (path parameter): The ID of the line.

**Response**:

- Status: `200 OK`

- Body: A line object with details.

```json
{
  "id": 1,
  "categoryId": 1,
  "name": "Line 1",
  "createdAt": "2025-04-09T12:00:00Z",
  "updatedAt": "2025-04-09T12:00:00Z",
  "firstVehicle": "Vehicle 1",
  "lastVehicle": "Vehicle 5"
}
```

**Error Response**:

- Status: `500 Internal Server Error`
- Body:

```
    {
        "error": "Failed to fetch lines",
        "message": "Error details"
    }
```

### 3. Get the list of stops for a specific line

**Endpoint:** `GET /:catId/lines/:lineId/stops`

**Description:** Fetches the list of stops for a specific line within a category. Returns the name, latitude, longitude, and order of appearance of each stop.

**Request Parameters:**

- `catId` (path parameter): The ID of the category.

- `lineId` (path parameter): The ID of the line.

**Response:**

- Status: `200 OK`
- Body: A list of stops associated with the line, ordered by their appearance.

```json
[
  {
    "id": 1,
    "name": "Stop 1",
    "lat": 48.8588443,
    "long": 2.2943506,
    "order": 1
  },
  {
    "id": 2,
    "name": "Stop 2",
    "lat": 48.856613,
    "long": 2.352222,
    "order": 2
  }
]
```

**Error Response:**

- Status: `500 Internal Server Error`
- Body:

```json
{
  "error": "Failed to fetch lines",
  "message": "Error details"
}
```

### 4. Create a new stop for a specific line

**Endpoint:** `POST /:catId/lines/:lineId/stops`

**Description:** Adds a new stop to the specified line in the category.

**Request Parameters:**

- `catId` (path parameter): The ID of the category.

- `lineId` (path parameter): The ID of the line.

**Request Body:**

```
{
  "name": "Stop Name",
  "order": 1,
  "lineId": 1,
  "lat": 48.8588443,
  "long": 2.2943506
}
```

**Validation:**

- `name`: (string) Name of the stop.

- `order`: (integer) The order of the stop on the line.

- `lineId`: (integer) The ID of the line to which the stop is added.

- `lat`: (float) Latitude of the stop.

- `long`: (float) Longitude of the stop.

**Response:**

- Status: `200 OK`

- Body:

```json
{
  "error": "Failed to fetch lines",
  "message": "Error details"
}
```

**Error Response:**

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

**Error Codes**

- `400 Bad Request`: Validation errors in the request body.

- `500 Internal Server Error`: An error occurred on the server while processing the request.
