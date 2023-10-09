# BoatFront

This project is designed to allow a user to manage its boats, using a REST API.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.0.

## TODO

### Resolver
At the moment, it's possible for a user to modify URL and make incorrect requests to the API.
A resolver is in place to fetch data before accessing the route, to check validity of the request, 
this is partially working so it is not used in the routing.

### Restarting the API

When restarting the API, data are cleared in the database. However, the front still keep 
the user's id that was stored before, so we have to logout in the interface to
go back to a normal state.

### Authentication

At the moment, we store user's id in local storage to simulate an authentication.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
