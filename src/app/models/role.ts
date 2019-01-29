import { RoleTypes } from '../config/roles';

export interface Role {
  type: RoleTypes;
  description: string;
}
