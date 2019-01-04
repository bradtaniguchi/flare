import { GenericModel } from './generic-model';
import { DeckId } from './deck';
import { UserId } from './user';

export type GroupId = string;

export class Group extends GenericModel {
  uid: GroupId;
  /**
   * Name displayed for the group
   */
  name: string;

  /**
   * The description of the group
   */
  description: string;

  /**
   * If this group is private or not, if a group is private,
   * then user's within the group can add members, and the group does
   * not appear on the "searchable" groups. All groups will be created
   * as private for now.
   */
  private: boolean;

  /**
   * A map of decks "under" this group
   */
  decks?: Map<DeckId, true>;

  /**
   * A map of users this group is available too
   */
  users?: Map<UserId, true>;
}
