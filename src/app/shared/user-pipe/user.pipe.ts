import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/models/user';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {
  transform(value: User, args?: any): string {
    return value && value.displayName ? value.displayName : '';
  }
}
