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

Here are the main files we care about:

```
src
+--- server
     +--- api
          +--- mainRoutes
               |--- index.ts
     +--- app
          |--- index.ts
          |--- index.test.tsx
+--- ui
     +--- pages
          +--- Home
               |--- index.tsx
               |--- index.less
               |--- index.test.tsx
     +--- store
          +--- actions
               |--- counter.ts
               |--- index.ts
          +--- reducers
               |--- counter.ts
               |--- index.ts
          +--- selectors
               |--- counter.ts
               |--- index.ts
```

`src/server/api`: Houses the endpoints that can be called in `src/server/app/index.ts`

`src/server/app`: An express app that sets the endpoints up with the respective tests

`src/ui/pages/Home`: The actual UI

`src/ui/store`: The redux store separated out by `actions`, `reducers`, and `selectors`


## Deploying

You will need to populate the initial `ark-config` branch with the following env vars for it to work out of the box:
- `NODE_ENV`
- `HOST`
- `PORT`

Then you can run with the standard `ark` command:


```
ark start {{.AppName}}
```
