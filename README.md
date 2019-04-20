# RES Playground
react/express/sockets CSR + SSR

## setup
### frontend
runnig per default on 5200
containing a webpack middleware for a frontend react build (would be prebuild in production)
serving static files from public (handled by nginx or similir in production)
proxy other request to backend

### backend
clustered server for  more performance, per default cpu cores / 2
does reload server on file changes
api over sockets and normal url
render template with react to faster display content and not depend on loading screens
haml layouts


## goal
 - [x] use same template for frontend/backend rendering
 - [ ] use models usable in frontend/backend with different adapters for api/database access
 - [ ] create simple setup of api setup for models
 - [ ] support multiple databases
 - [ ] have working tests

## config
config is done with a env file
 - RES_ENV production|development
 - RES_THREAD cores/2
 - RES_BACKEND_HOST localhost
 - RES_BACKEND_PORT 5000
 - RES_FRONTEND_HOST localhost
 - RES_FRONTEND_PORT 5200

## play
```
yarn
yarn start
open http://localhost:5200
```
