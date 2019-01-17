export type UserId = string;
export interface User extends firebase.User {
  uid: UserId;

  /**
   * Permissions for organizations
   */
  orgs?: {
    [key: string]: true;
  };

  /**
   * Recent Cards
   */
  recentCards?: {
    [key: string]: true;
  };

  /**
   * Permissions for all decks
   */
  decks?: {
    [key: string]: true;
  };

  /**
   * Permissions for all groups
   */
  groups?: {
    [key: string]: true;
  };

  /**
   * The number of cards the user has access to
   */
  cardsCount?: number;

  /**
   * The number of decks the user has access to
   */
  deckCount?: number;

  /**
   * The number of groups the user has access to
   */
  groupCount?: number;
}
