import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPhoneComponent } from './login-phone/login-phone.component';
import {FormTemplateComponent} from '../public-component-user/form-template/form-template.component';
import {ShareModule} from '../../share/share.module';
import {CodeControlComponent} from '../public-component-user/code-control/code-control.component';
import { LoginPassComponent } from './login-pass/login-pass.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';

@NgModule({
  imports: [
    CommonModule,
    ShareModule
  ],
  declarations: [LoginPhoneComponent, FormTemplateComponent, CodeControlComponent, LoginPassComponent, ResetPassComponent]
})
export class LoginModule { }
