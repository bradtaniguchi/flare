import { NgModule } from '@angular/core';
import { RolePipe } from './role.pipe';

@NgModule({
  declarations: [RolePipe],
  exports: [RolePipe]
})
export class RolePipeModule {}
