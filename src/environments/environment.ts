// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  baseUrl: 'http://localhost:4200',
  firebase: {
    projectId: 'shishi-bc69b',
    appId: '1:326624084685:web:e4687e1e1911e6d4935f84',
    databaseURL: 'https://shishi-bc69b-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'shishi-bc69b.appspot.com',
    apiKey: 'AIzaSyBRmDGV9XCra8B8Ot46sgooQNeaKGfpgqs',
    authDomain: 'shishi-bc69b.firebaseapp.com',
    messagingSenderId: '326624084685',
  },
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
