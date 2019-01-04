import { GenericModel } from './generic-model';
import { CardId } from './card';
import { GroupId } from './group';
import { UserId } from './user';

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
   * If this deck can be shared with other users/groups
   */
  private: boolean;

  /**
   * A map of cards part of this deck
   */
  cards?: Map<CardId, true>;

  /**
   * A map of groups this deck is part of.
   */
  groups?: Map<GroupId, true>;

  /**
   * A map of users this deck is available too
   */
  users?: Map<UserId, true>;
}
