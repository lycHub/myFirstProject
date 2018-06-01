import { NgModule } from '@angular/core';
import {LoginModule} from './login/login.module';
import {UserRoutingModule} from './user-routing.module';
import {ShareModule} from '../share/share.module';
import {PersonalModule} from './personal/personal.module';
import 'rxjs/add/operator/catch';

@NgModule({
  imports: [
    ShareModule,
    LoginModule,
    PersonalModule,
    UserRoutingModule
  ],
  declarations: []
})
export class UserModule { }
