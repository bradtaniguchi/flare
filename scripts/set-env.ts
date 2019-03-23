require('dotenv').config();
import * as child_process from 'child_process';
import { writeFile } from 'fs';

const getRevision = () => {
  console.log('getting hash...');
  return child_process
    .execSync('git rev-parse HEAD')
    .toString()
    .trim();
};
const revision = getRevision();
console.log('got hash');
const targetPath = `./src/app/config.ts`;
const envConfigFile = `
import { Config } from './models/config';

export const CONFIG: Config = {
  revision: "${revision}",
  date: "${new Date()}",
  firebase: {
    apiKey: '${process.env.FIREBASE_API_KEY || ''}',
    authDomain: '${process.env.FIREBASE_AUTH_DOMAIN || ''}',
    databaseURL: '${process.env.FIREBASE_DATABASE_URL || ''}',
    projectId: '${process.env.FIREBASE_PROJECT_ID || ''}',
    storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET || ''}',
    messagingSenderId: '${process.env.FIREBASE_MSG_SENDER_ID || ''}'
  }
};
`;

writeFile(targetPath, envConfigFile, function(err) {
  if (err) {
    console.log('err: ', err);
  }

  console.log(`Output generated at ${targetPath}`);
});
