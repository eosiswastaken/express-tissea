# Documentation for stat-related routes

This API provides endpoints to calculate the distance between two stops or the total distance of a line based on its stops.

## Endpoints

### 1. Get distance between two stops

**Endpoint**: `GET /distance/stops/:id1/:id2`

**Description**: Calculates the distance between two stops based on their latitude and longitude.

**Request Parameters**:

- `id1` (path parameter): The ID of the first stop.
- `id2` (path parameter): The ID of the second stop.

**Response**:

- Status: `200 OK`
- Body: The distance between the two stops in kilometers, rounded to three decimal places.

```json
{
  "distance": "5.236"
}
```

**Error Response:**

- Status: `500 Internal Server Error`
- Body:

```
    {
      "error": "Failed to fetch stops",
      "message": "Error details"
    }
```

### 2. Get total distance of a line

**Endpoint:** `GET /distance/lines/:id`

**Description:** Calculates the total distance of a line by summing up the distances between consecutive stops on the line.

**Request Parameters:**

- `id` (path parameter): The ID of the line.

**Response:**

- Status: `200 OK`
- Body: The total distance of the line in kilometers, rounded to three decimal places.

```
{
  "distance": "23.456"
}
```

**Error Response:**

- Status: `500 Internal Server Error`
- Body:

```
    {
      "error": "Failed to fetch stops",
      "message": "Error details"
    }
```

**Error Codes**

- `500 Internal Server Error`: An error occurred on the server while processing the request.
