import { CardId } from './card';
import { DeckId } from './deck';
import { GroupId } from './group';
import { BareUid } from './bare-uid';

export type UserId = string;
export interface User extends firebase.User {
  uid: UserId;
  /**
   * The cards the user has access too overall
   */
  cards?: Map<CardId, BareUid>;

  /**
   * The decks the user has access to overall
   */
  decks?: Map<DeckId, BareUid>;

  /**
   * The groups the user has access to overall
   */
  groups?: Map<GroupId, BareUid>;
}
