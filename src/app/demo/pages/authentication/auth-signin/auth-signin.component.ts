import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user-model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth-signin',
  standalone: true,
  imports: [RouterModule,
    FormsModule],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss'],
})
export default class AuthSigninComponent {
  constructor(private _fb: FormBuilder,private userService:UserService, private tokenService:TokenService,private router : Router
    ) { }
  // loginForm!: FormGroup;
  loginData:User={
    email:'',password:'', num:null,
    name:null,
    familyName:null,
    nationality:null,
    identityDocument:null,
    identityNumber:null,token:null
  }

  ngOnInit(): void {
    // this.loginForm = this._fb.group({ 
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.minLength(6)]]
    // });
  }
  onSubmit() {
    console.log(this.loginData);
    // if (this.loginForm.valid) {
      this.userService.loginUser(this.loginData).subscribe(
        token => {
          if (token.access_token){
            console.log(token.access_token)
            this.tokenService.saveToken(token.access_token);
            this.tokenService.saveRefreshToken(token.refresh_token);
          }
          this.router.navigate(['/dashboard'])       
         },
        (error) => {
          console.error('Error sending competition data:', error);
           if(error===null){
            Swal.fire('Error',"an error occured please check your credential", 'error'); 

           }else{
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
        }
      );
    // } else {
    //   console.error('Form is invalid');
    //   Swal.fire('Error','Form is invalid', 'error'); 
    // }
  }
}
