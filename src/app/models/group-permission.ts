import { GenericModel } from './generic-model';
import { RoleTypes } from '../config/roles';

export interface GroupPermission extends GenericModel {
  groupId: string;
  type: RoleTypes;
  userId: string;
}
