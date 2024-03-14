import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FormsModule } from '@angular/forms';
// import { FormBuilder } from '@angular/forms';
// import { UserService } from 'src/app/services/user.service';
// import { TokenService } from 'src/app/services/token.service';
// import { Router } from '@angular/router';
// import { User } from 'src/app/model/user-model';
// import Swal from 'sweetalert2';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthenticationRoutingModule,FormsModule],
})
export class AuthenticationModule {

}
