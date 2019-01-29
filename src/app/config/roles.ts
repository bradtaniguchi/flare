import { Role } from '../models/role';

export enum RoleTypes {
  Admin = 'Admin',
  Editor = 'Editor',
  Viewer = 'Viewer'
}

export const ADMIN_ROLE = {
  type: RoleTypes.Admin,
  description:
    'Can add/remove users from group, and edit all decks within the group'
};
export const EDITOR_ROLE = {
  type: RoleTypes.Editor,
  description: 'Can edit all decks within the group'
};
export const VIEWER_ROLE = {
  type: RoleTypes.Viewer,
  description: 'Can only view all decks within the group'
};
/**
 * List of all available Role types within the application.
 * Currently can only be set at the group level.
 */
export const Roles: Role[] = [ADMIN_ROLE, EDITOR_ROLE, VIEWER_ROLE];
