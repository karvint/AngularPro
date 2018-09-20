import {Component, Inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {isNullOrUndefined} from "util";
import {NavigationEnd, NavigationError, Router} from "@angular/router";
import {CookieService} from "ngx-cookie";
import {LoginService} from "./login/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  isCollapsed = false;
  triggerTemplate = null;
  showNav = false;
  currentUser;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;
  constructor(private route:Router,private _cookieService:CookieService,@Inject("loginService")private loginService:LoginService){}
  ngOnInit(){
    this.currentUser = window.localStorage.getItem("currentUser");
    this.route.events.subscribe((event)=>{
      if (event instanceof NavigationEnd) {
        this.checkCurrentUser();
      }else if(event instanceof NavigationError){
        this.route.navigateByUrl('login');
      }
    });

  }
  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

  /**
   * 检查当前登陆状态
   */
  checkCurrentUser(){
    const urlArr = window.location.href.split("/");
    let url = "";

    if(urlArr.length>4){
      url = urlArr[4];
    }
    // 登陆页面显示
    if(url==='login'){
      this.showNav = false;
    }else{
      this.showNav = true;
    }

    // 无登陆状态跳转登陆页
    if (url !== "login"){
      if (isNullOrUndefined(window.localStorage.getItem("currentUser"))) {
        this.route.navigateByUrl("login");
      } else {
        // this.currentUser = JSON.parse(window.localStorage.getItem("currentUser")).realName;
      }
    }
  }
}
