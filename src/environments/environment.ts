// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyANNoCi23YNLY5P3DbWKN2xrotTbzor8Xk",
    authDomain: "football-ngrx.firebaseapp.com",
    databaseURL: "https://football-ngrx.firebaseio.com",
    projectId: "football-ngrx",
    storageBucket: "football-ngrx.appspot.com",
    messagingSenderId: "329911594370",
    appId: "1:329911594370:web:62b2d3e464ca0531e7b39b"
  },
  test: true
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
