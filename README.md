# FootballWednesday

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Configure your project   
add component
ng g c features/players/components/field

change tsconfig file - > "baseUrl": "./src/app", that enables to import short modules
## Add UX-Aspects
npm config set @micro-focus:registry https://svsartifactory.swinfra.net/artifactory/api/npm/saas-npm-release-local/
npm install --save @ux-aspects/ux-aspects @micro-focus/ux-aspects @micro-focus/quantum-ux-aspects
npm install --save @angular/upgrade
npm install --save rxjs-compat 
npm install --save @angular/cdk
in style.scss add those imports
@import url("~@ux-aspects/ux-aspects/styles/ux-aspects.css");
@import url("~@micro-focus/quantum-ux-aspects"); 

## DEPLOY 
set https_proxy=http://web-proxy.il.softwaregrp.net:8080
firebase login
firebase deploy
