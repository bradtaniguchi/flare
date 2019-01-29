import { NgModule } from '@angular/core';
import { UserPipe } from './user.pipe';

@NgModule({
  declarations: [UserPipe],
  exports: [UserPipe]
})
export class UserPipeModule {}
