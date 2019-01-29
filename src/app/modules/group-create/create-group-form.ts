import { User } from 'src/app/models/user';

export class CreateGroupForm {
  name: string;
  description: string;
  // TODO: define roles
  users: User[];
}
