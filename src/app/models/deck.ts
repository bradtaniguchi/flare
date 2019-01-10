import { Card, CardId } from './card';
import { GenericModel } from './generic-model';
import { GroupId } from './group';

export type DeckId = string;

export class Deck extends GenericModel {
  uid: DeckId;
  /**
   * Name of the deck
   */
  name: string;

  /**
   * The description of the deck
   */
  description: string;

  /**
   * Card counts
   */
  cardsCount?: number;

  /**
   * The group this deck belongs too
   */
  group?: GroupId;
}
