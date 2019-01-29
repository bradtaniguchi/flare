import { Role } from './role';
import { User } from './user';

/**
 * Represents a user with role object, used for groups-create/edit forms
 */
export interface UserAndRole {
  user: User;
  role: Role;
}
