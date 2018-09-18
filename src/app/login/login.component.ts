import {Component, Inject, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie";
import {LoginService} from "./login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../entity/login/User";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Role} from "../entity/login/Role";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  constructor(private fb:FormBuilder,private _cookieService:CookieService,
              @Inject("loginService")private loginService:LoginService,private router:Router) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      remember: [ true ]
    });
    this.autoLogin();
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }

    const formValue = this.validateForm.getRawValue();
    const user:User = new User();
    user.password = formValue.password;
    user.userName = formValue.userName;
    this.loginService.login(user).subscribe(res=>{
      if(res.code===0){
        const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 3);// 设置cookie失效时间为3天
        this._cookieService.put("securey",res.data["token"],{expires:expireDate.toUTCString()});
        window.localStorage.setItem("currentUser",JSON.stringify(res.data));
        this._cookieService.put("userId",res.data["id"],{expires:expireDate.toUTCString()});
        console.log(1);
        this.router.navigateByUrl("/home");
        console.log(2);
      }
    });



  }
  getCookie(key: string){
    return this._cookieService.get(key);
  }
  forgetMe(){
    this._cookieService.remove("securey");
  }

  autoLogin(){
    if(!isNullOrUndefined(this._cookieService.get("securey"))&&this._cookieService.get("securey")!==""){
      const user:User = new User();
      user.id = this._cookieService.get("userId");
      this.loginService.autoLogin(user).subscribe(res=>{
        if(res.code===0){
          window.localStorage.setItem("currentUser",JSON.stringify(res.data));
          this.router.navigateByUrl("home");
        }
      });
    }
  }

}
