import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {ResData} from '../entity/util/ResData';
import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable()
export class MenuService {
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
  constructor(private http:HttpClient){}

  getMenus():Observable<ResData>{
    return this.http.post<ResData>(environment.baseUrl+'menu/init',null,this.httpOptions);
  }

}
