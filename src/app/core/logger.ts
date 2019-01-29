import { environment } from 'src/environments/environment';

/**
 * Wrapper around the console.log, which can be used to toggle loggin on and
 * off based upon the environment
 */
export class Logger {
  constructor() {}

  /**
   * Returns console implementation
   */
  public get _impl() {
    return console;
  }
  /**
   * Logs to the console
   */
  public log(message?: any, ...optionalParams: any[]): void {
    if (environment.log) {
      // tslint:disable-next-line
      console.log(message, ...optionalParams);
    }
  }

  /**
   * Prints to the console with warn level
   */
  public warn(message?: any, ...optionalParams: any[]): void {
    // tslint:disable-next-line
    console.warn(message, ...optionalParams);
  }
  /**
   * Prints to the console with error level
   */
  public error(message?: any, ...optionalParams: any[]): void {
    // tslint:disable-next-line
    console.error(message, ...optionalParams);
  }
}

export const logger = new Logger();
