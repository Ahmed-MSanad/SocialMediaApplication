import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy{
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  private readonly _FormBuilder = inject(FormBuilder);
  registerUnsubscribe ! : Subscription;
  registerForm : FormGroup = this._FormBuilder.group({
    fullName : [null, [Validators.required , Validators.minLength(3)]],
    email : [null, [Validators.required, Validators.email]],
    password : [null, [Validators.required, Validators.pattern(/^(?=(.*\w){5,})(?=.*\W).{6,}$/)]],
    cPassword : [null, ],
    phone: [null, ],
    gender: [null, ],
    profilePicture: [null, ],
  });


  register():void{
    if(this.registerForm.valid){
      this.registerUnsubscribe = this._AuthService.register(this.registerForm.value).subscribe({
        next:(res) => {
          this._Router.navigate(['/login']);
          console.log(res);
        },
        error:(err) => {
          alert(err.message);
        }
      })
    }
    else{
      this.registerForm?.markAllAsTouched();
    }
  }


  ngOnDestroy(){
    this.registerUnsubscribe?.unsubscribe();
  }
}