import { DeckId } from './deck';
import { GenericModel } from './generic-model';
import { UserId } from './user';

export type CardId = string;

export class Card extends GenericModel {
  uid: CardId;
  /**
   * The message shown on the front of the card
   */
  front: string;
  /**
   * The message shown on the back of the card
   */
  back: string;

  /**
   * A map of deck this card belongs too
   */
  decks?: Map<DeckId, true>;

  /**
   * A map of users this card is available too.
   */
  users?: Map<UserId, true>;
}
