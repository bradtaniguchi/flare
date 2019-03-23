import { GenericModel } from './generic-model';

export type GroupId = string;

export interface Group extends GenericModel {
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
   * The number of decks this group has
   */
  deckCount?: number;

  /**
   * The number of users this group has.
   */
  userCount?: number;
}
