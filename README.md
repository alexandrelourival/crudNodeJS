# CRUD with Node.JS and MongoDB

## A CRUD where the user can:

- Register and get companies, units, assets and users.
- Update and delete companies and units.

### This back-end server have 8 methods GET, 4 methods POST, 2 methods PATCH and 2 methods DELETE.

#### They are:

- Get:
  - /health -> Consult if server is up and running.
  - /companies -> Consult all companies.
  - /companies/:id -> Consult a company with this id.
  - /users/:id -> Consult all users of this company id.
  - /units -> Consult all units.
  - /unit/:id -> Consult a unit with this id.
  - /units/:id -> Consult all units of this company id.
  - /assets/:id -> Consult all assets of this unit id.
- POST:
  - /companies -> Create a company.
  - /users/:id -> Create a user to this company id.
  - /units -> Create a unit to the company id passed in body.
  - /assets/:id -> Create a asset to this company id
- PATCH:
  - /companies/:id -> Update company of this id (Just allowed update name and description).
  - /unit/:id -> Update unit of this id (Just allowed update name).
- DELETE:
  - /companies/:id -> Delete company and all sub-objects of this id.
  - /unit/:id -> Delete unit and all sub-objects of this id.

### Info

Users can view the units separately through the endpoint GET '/unit/:id', where 'id' refers to the unit identifier. Additionally, they can view all units belonging to a specific company through the endpoint GET '/units/:id', where 'id' corresponds to the company identifier.

Users can register the units by making a POST request to the endpoint '/unit' with the following request body:

```json
{
  "idCompany": "64d014151650c5e9bce7038e",
  "name": "Unidade example"
}
```

Where 'idCompany' is the ObjectId.toHexString().

Users can register assets to a unit by making a POST request to the endpoint '/assets/:id' where the ID of the unit is passed in the params. The request body for the asset can be structured like this:

```json
{
  "image": "img.png",
  "name": "Asset name",
  "description": "IOT asset description",
  "model": "model",
  "owner": "owner",
  "status": 0,
  "health": 98
}
```

Where the health must be between 0 and 100. Additionally, the 'Status' field can have one of three possible values: 0 - Running, 1 - Alerting, or 2 - Stopped.

#### The insominia json is avaliable at [Insomnia-crudNodeJS](./assets/Insomnia-crudNodeJS.json) if you want to import.
