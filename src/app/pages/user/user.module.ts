import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProfileComponent } from './components/profile/profile.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [UserComponent, ProfileComponent],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule { }
