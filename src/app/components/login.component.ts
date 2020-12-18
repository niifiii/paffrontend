import { Component, OnInit } from '@angular/core';

//
import{ Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {BackendSqlService} from "../backend-sql.service"
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	errorMessage = ''

  loginForm //this._fb.group({
    //html title id = userName
    //userName: ['', Validators.required],
    //password: ['', Validators.required]
  //});

  /*
      <div [formGroup]="myGroup">
      <input formControlName="firstName">
    </div>

    In your class:

    this.myGroup = new FormGroup({
       firstName: new FormControl()
    });
  */

	constructor(private _fb: FormBuilder, private _router: Router, private _sqlSvc: BackendSqlService) { }

  ngOnInit(): void { 
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
   })

  }
  
  async onSubmit() {
    //let isAuthenticated = false;
    const userName = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;

    console.log('onSubmit(), ', 'here', userName, password, typeof userName, typeof password)

    const authenticationResponse = await this._sqlSvc.authenticate(userName, password)
    console.log('>>> onSubmit()', authenticationResponse); //undefined because
    
    if (authenticationResponse === 'Yes') {// cannot read lenght of undefined
      this._router.navigate(['main', `?${userName}=&password=${password}`]) 
    } else {
      console.log(authenticationResponse)
      this.errorMessage = authenticationResponse.error.err 
      console.log(this.errorMessage)
    }
    
  }

}
