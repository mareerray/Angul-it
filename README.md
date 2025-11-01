# Angul-It: Multi-Stage CAPTCHA App

### Author : [Mayuree Reunsati](https://github.com/mareerray)

**Angul-It** is an Angular web application featuring multi-stage image-based CAPTCHA challenges to distinguish human users from bots.

## Features
- Multi-stage image selection challenges

- Angular form validation on each stage

- Persistent state with services/local storage

- Responsive and easy-to-use interface

- Secure routing and restricted access

- Results summary and "Restart Challenge" option

## Setup
1. Clone the repo and run 
````
npm install
````

2. Start the server with 
````
ng serve
````
3. By default, the app is served locally at:

Local: [http://localhost:4200/](http://localhost:4200/)

## Components
- HomeComponent: Launches challenge

- CaptchaComponent: Presents each image challenge

- ResultComponent: Shows performance summary

## How It Works
- Solve each image challenge to proceed

- Progress is saved across refreshes

- Direct results access is blocked until all challenges are finished

## Constraints
- Latest Angular, no external CAPTCHA libraries

- State persists between reloads

- All routing managed with Angular Router

## Links:

[Angular Docs](https://angular.io/docs)

[CLI Overview and Command Reference](https://v17.angular.io/cli)

