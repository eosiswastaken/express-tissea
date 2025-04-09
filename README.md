# express-tissea

fake public transport network for Zurich

---

### installation

clone the repo :

```
git clone https://github.com/eosiswastaken/express-tissea.git
```

install the dependencies :

```
npm install
```

create the `.env` at root, use what's in the `.env.example` to know which variables you have to add :

and execute the startup command :

```
npm run init
```

### usage

routes and their documentation defined at `docs/`

### custom commands

```
npm run faker
```

runs the faker to insert placeholder data into the database

```
npm run wipe
```

wipes the database, and re-generates the Prisma client

```
npm run init
```

wipes the database, runs the faker and launches the express server
