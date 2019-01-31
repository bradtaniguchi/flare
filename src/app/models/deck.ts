import { GenericModel } from './generic-model';
import { GroupId } from './group';

export type DeckId = string;

export interface Deck extends GenericModel {
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
   * A map of all the cards within this deck
   */
  cards?: { [key: string]: string };

  /**
   * The group this deck belongs too
   */
  group?: GroupId;
}
