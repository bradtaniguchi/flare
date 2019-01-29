import { Pipe, PipeTransform } from '@angular/core';
import { Role } from 'src/app/models/role';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {
  transform(value: Role, args?: any): string {
    return value && value.type ? value.type : '';
  }
}
