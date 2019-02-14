import { GenericModel } from './generic-model';

/**
 * Represents a "study-session" within the app, where
 * the user goes over all the cards in a deck
 */
export interface Session extends GenericModel {
  /**
   * list of cardIds missed
   */
  missed: string[];
  /**
   * list of cardIds marked as correct
   */
  correct: string[];
  /**
   * list of cardIds marked as skipped
   */
  skipped: string[];
  /**
   * Id the deck goes to (used more for metrics at a "higher" level)
   */
  group: string;
  /**
   * Id of the deck saved
   */
  deck: string;
}
