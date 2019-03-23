import { Config } from '../models/config';

/**
 * Utility method that validates the environment config file.
 * This file is auot-generated in the app folder, and is imported into the
 * rest of the project. This file is generated from environment variables
 * set at the root of the project.
 */
export const hasValidEnv = (config: Config): boolean => {
  const keys = [
    'apiKey',
    'authDomain',
    'databaseURL',
    'projectId',
    'storageBucket',
    'messagingSenderId'
  ];
  return !!config.firebase && keys.every(key => config.firebase[key]);
};
