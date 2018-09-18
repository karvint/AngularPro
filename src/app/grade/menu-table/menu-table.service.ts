import {HttpClient, HttpHeaders} from '@angular/common/http';

export class MenuTableService{
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
  constructor(private http:HttpClient){}

}
