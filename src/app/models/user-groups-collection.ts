/**
 * Represents the sub-collection under a user.
 * This represents all the groups the user has access to, and their
 * security level.
 */
export interface UserGroupsCollection {
  // the key is the uid of the group
  [key: string]: true;
}
