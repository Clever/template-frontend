# {{.AppName}}

{{.Description}}

Owned by {{.TeamName}}

## Development

```
cd {{.AppName}}
npm install
ark start {{.AppName}} -e clever-dev -l
```

If you're in the `{{.AppName}}` directory, and you've set your default ark env to `clever-dev`, the ark command simplifies down to:

```
ark start -l
```

You can access the locally running server at `http://localhost:5020`.

Some other useful Makefile commands include:

- `make format`
- `make lint`
- `make test`

## Directory structure

```
src
├── server
│   ├── api
│   ├── app
│   ├── auth
│   ├── config.ts
│   ├── index.ts
│   ├── lib
│   ├── middleware
│   └── pages
├── shared
|   ├── constants
│   └── models
└── ui
    ├── app
    ├── components
    ├── lib
    ├── pages
    └── store
```

Below is a summary of what each directory contains.

### Server

`src/server/api`: API endpoints

`src/server/auth`: Authentication endpoints

`src/server/pages`: Page-serving endpoints and base views

`src/server/lib`: Frontend server libs for shared logic as well as a `Clients` class for easy access to those libs and backend WAG clients

`src/server/middleware`: Middlewares

`src/server/app`: The Express app. Wires the server together.

`src/server/app/errors`: Typed errors for use throughout the server

### Client

`src/ui/pages`: UI pages

`src/ui/components`: Shared UI components

`src/ui/lib`: Shared UI logic, i.e. all shared UI code that isn't a React component

`src/ui/store`: The Redux store, where each Redux collection has its own file. Note: We've begun experimenting with alternatives to Redux, e.g. we're using the Apollo GraphQL libraries in https://github.com/Clever/family-portal.

`src/ui/app`: The top-level client-side app. Wires the client together.

`src/ui/app/errors`: Client-side error handling utilities

### Shared

`src/shared`: Code to be shared across the server and client, e.g. data models, constants
