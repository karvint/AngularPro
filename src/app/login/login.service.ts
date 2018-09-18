import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../entity/login/User";
import {Observable} from "rxjs";
import {ResData} from "../entity/util/ResData";
import {environment} from "../../environments/environment";

@Injectable()
export class LoginService{
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
  constructor(private http:HttpClient){}

  login(user:User):Observable<ResData>{
    return this.http.post<ResData>(environment.baseUrl+"login/user",user,this.httpOptions);
  }
  autoLogin(user:User):Observable<ResData>{
    return this.http.post<ResData>(environment.baseUrl+"securey/auto",user,this.httpOptions);
  }
}
