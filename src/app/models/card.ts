import { DeckId } from './deck';
import { GenericModel } from './generic-model';

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
   * The deck this card belongs too.
   */
  deck?: DeckId;
}
