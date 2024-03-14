import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user-model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth-signup',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss'],
})
export default class AuthSignupComponent {
  constructor(private _fb: FormBuilder,private userService:UserService, private tokenService:TokenService,private router : Router
    ) { }
  // registerForm!: FormGroup;
  user:User={
    email:'',password:'',
      num:0,
      name:'',
      familyName:'',
      nationality:'',
      identityDocument:'',
      identityNumber:'',token:null
  }

  ngOnInit(): void {
    // this.registerForm = this._fb.group({ 
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.minLength(6)]]
    // });
  }
  onSubmit() {
    this.user.num=Math.floor(Math.random() * (100000 - 100 + 1)) + 100;

    console.log(this.user);

    // if (this.registerForm.valid) {
      this.userService.RegisterUser(this.user).subscribe(
        token => {
          if (token.access_token){
            this.tokenService.saveToken(token.access_token);
            this.tokenService.saveRefreshToken(token.refresh_token);
          }
          this.router.navigate(['/'])       
         },
        (error) => {
          console.error('Error sending competition data:', error);
            if (Array.isArray(error.error.error)) {
              const errorMessage = error.error.error.join('<br>'); 
              Swal.fire({
                icon: 'error',
                title: 'Error',
                html: errorMessage  
              });
            } else {
              console.log('Unexpected error structure:', error.error);
              Swal.fire('Error',error.error, 'error'); 
            }
        }
      );
    // } else {
    //   console.error('Form is invalid');
    //   Swal.fire('Error','Form is invalid', 'error'); 
    // }
  }
}
