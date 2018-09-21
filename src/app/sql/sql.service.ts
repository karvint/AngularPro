import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResData} from "../entity/util/ResData";
import {environment} from "../../environments/environment";
import {SqlData} from "../entity/sql/SqlData";

@Injectable()
export class SqlService{
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
  constructor(private http:HttpClient){}

  runSql(sqlData:SqlData):Observable<ResData>{
    return this.http.post<ResData>(environment.baseUrl+"sql/run",sqlData,this.httpOptions);
  }
}
