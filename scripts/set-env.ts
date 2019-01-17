require('dotenv').config();
import { writeFile } from 'fs';

const targetPath = `./src/app/config.ts`;
const envConfigFile = `
export const CONFIG = {
  firebase: {
    apiKey: '${process.env.FIREBASE_API_KEY}',
    authDomain: '${process.env.FIREBASE_AUTH_DOMAIN}',
    databaseURL: '${process.env.FIREBASE_DATABASE_URL}',
    projectId: '${process.env.FIREBASE_PROJECT_ID}',
    storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
    messagingSenderId: '${process.env.FIREBASE_MSG_SENDER_ID}'
  }
};
`;

writeFile(targetPath, envConfigFile, function(err) {
  if (err) {
    console.log('err: ', err);
  }

  console.log(`Output generated at ${targetPath}`);
});
