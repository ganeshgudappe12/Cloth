import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  signup: FormGroup;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      logemail: [''],
      logpass: [''],
    });
    this.signup = this.formBuilder.group({
      signupname: [''],
      signupemail: [''],
      signuppass: [''],
      signupcnfpass: [''],
      signupmob: [''],
      signupadd: [''],
      Gender: [''],
      signupdob: [''],
    });
  }
  login() {
    const logData = {
      logemail: this.loginform.value.logemail,
      logpass: this.loginform.value.logpass,
    };

    this.api
      .checkLogin(this.loginform.value.logemail, this.loginform.value.logpass)
      .subscribe((res: any) => {
        console.log(res, 'res');
        if (res != undefined && res != null && res != 'User is not found') {
          sessionStorage.setItem(
            'Roll',
            btoa(JSON.stringify(res[0].roll_Name))
          );

          this.toastr.success('User Is Exist', 'LogIn successfully!!');
          this.router.navigate(['alldata']);
        } else {
          this.toastr.warning('user is not found!!');
          this.router.navigate(['']);
        }
      });

    console.log(logData, 'logdata');
    if (this.loginform.valid) {
      localStorage.setItem(
        'token',
        'EAAJahM1t0h8BAP6a9h3loENDRAZAGvdVaqiEqtp6vln3E71T9enZC3D0A5iZBgCaJie5fvS7shWXgMn9kZCGNT1tQIlSt0cbWgMHZCoIOXEqkvZAoYLigZDZD'
      );
      this.loginform.value.username == 'ganeshg@yupptv.com'
        ? localStorage.setItem('userType', 'user')
        : false;
    }
    //this.toastr.success('Login successfully');
    //this.router.navigate(['alldata']);
  }
  signupData() {
    const signupdata = {
      username: this.signup.value.signupname,
      gmail: this.signup.value.signupemail,
      password: this.signup.value.signuppass,
      rollid: 3,
      //usercnfpass: this.signup.value.signupcnfpass,
      mob: this.signup.value.signupmob,
      address: this.signup.value.signupadd,
      gender: this.signup.value.Gender,
      dob: this.signup.value.signupdob,
    };
    console.log(signupdata, 'signupdata');
    this.api.signUP(signupdata).subscribe((res: any) => {
      console.log(res, 'res');
      if (res == 'Sign UP successfully') {
        this.signup.reset();
        this.toastr.success('Sign UP', 'successfully!!');
        this.router.navigate(['login']);
      } else {
        this.toastr.warning('user not added!!');
      }
    });
  }
}
