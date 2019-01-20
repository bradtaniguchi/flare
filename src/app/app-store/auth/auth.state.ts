import { User } from 'src/app/models/user';

export interface AuthState {
  newRegister?: boolean;
  user?: User;
}
