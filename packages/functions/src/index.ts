import * as functions from "firebase-functions";
import sharedExample from "./lib/sharedExample";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello my friends!" + sharedExample(1, 2));
});
