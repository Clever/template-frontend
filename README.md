# {{.AppName}}

{{.Description}}

Owned by {{.TeamName}}

## Developing

To run the demo of the boilerplate code here, follow these steps:

Pull the repository: `git clone git@github.com:Clever/{{.AppName}}.git`

Enter the directory: `cd {{.AppName}}`

Install the requirements: `npm install`

Run the development server. `ark start -l`

Et voilà! Visit `localhost:5020` to see everything in action.

## File structure

Here's the top-level directory structure.

```
src
├── server
│   ├── api
│   ├── app
│   ├── auth
│   ├── lib
│   ├── middleware
│   └── pages
├── shared
│   └── models
└── ui
    ├── pages
    └── store
```

### Server

`src/server/api`: Houses API endpoints

`src/server/pages`: Houses page-serving endpoints and base views

`src/server/auth`: Houses authentication endpoints

-----

`src/server/lib`: Houses frontend server libs for shared logic as well as a `Clients` class for easy access to those libs and backend WAG clients

`src/server/middleware`: Houses middlewares

-----

`src/server/app`: Sets up the Express app

`src/server/app/errors`: Provides typed errors for use throughout the server

### Client

`src/ui/pages`: The actual UI

`src/ui/store`: The Redux store, where each Redux collection has its own file

### Shared

`src/shared/models`: Houses data models to be shared across the server and client

## Deploying

You will need to populate the initial `ark-config` branch with the following env vars for it to work out of the box:
- `NODE_ENV`
- `HOST`
- `PORT`

Then you can run with the standard `ark` command:

```
ark start {{.AppName}}
```
