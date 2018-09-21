import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgZorroAntdModule, NZ_MESSAGE_CONFIG} from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GroupComponent } from './group/group.component';
import { GradeComponent } from './grade/grade.component';
import {GroupService} from './group/groupService';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { GateComponent } from './gate/gate.component';
import { MenuComponent } from './menu/menu.component';
import { MenuService } from './menu/menu.service';
import { MenuTableComponent } from './grade/menu-table/menu-table.component';
import {HttpHandlerIntercepter} from './intercepter/HttpHandlerIntercepter';
import {CookieModule} from "ngx-cookie";
import { LoginComponent } from './login/login.component';
import {LoginService} from "./login/login.service";
import {CodemirrorModule} from "@ctrl/ngx-codemirror";
import { SQLComponent } from './sql/sql.component';
import { PythonComponent } from './python/python.component';
import { JavaComponent } from './java/java.component';
import { ScalaComponent } from './scala/scala.component';
import { SqlResultComponent } from './sql/sql-result/sql-result.component';
import {SqlService} from "./sql/sql.service";


// 路由配置表：路由定义（route definitions）的数组
const appRoutes: Routes = [
  {path: 'login' , component: LoginComponent},
  {path: 'home' , component: HomeComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'sql' , component: SQLComponent},
  {path:'python' , component:PythonComponent},
  {path:'java',component:JavaComponent},
  {path:'scala',component:ScalaComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GroupComponent,
    GateComponent,
    MenuComponent,
    LoginComponent,
    MenuTableComponent,
    SQLComponent,
    PythonComponent,
    JavaComponent,
    SqlResultComponent,
    ScalaComponent,
    GradeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CodemirrorModule,
    BrowserAnimationsModule,
    CookieModule.forRoot(),
    NgZorroAntdModule.forRoot(),
    RouterModule.forRoot(appRoutes,{ useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  providers: [
    {provide :'groupService',useClass :GroupService},
    {provide :'menuService',useClass :MenuService},
    {provide :'sqlService',useClass :SqlService},
    {provide :'loginService',useClass :LoginService},
    { provide: NZ_MESSAGE_CONFIG, useValue: {
        nzDuration: 4500,
        nzMaxStack: 20,
        nzPauseOnHover: true,
        nzAnimate: true
      }},
    {provide:HTTP_INTERCEPTORS,useClass:HttpHandlerIntercepter,multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
