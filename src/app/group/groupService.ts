import {Injectable, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs/index';

@Injectable()
export class GroupService implements OnInit{
  subject:Subject<any> = new Subject<any>();
  option:string;

  ngOnInit(){
  }

  getOption():Observable<any>{
    setInterval(()=>{
      this.option = 'hello World!'+new Date().getTime();
      this.subject.next(this.option);
    },5000);
    return this.subject.asObservable();
  }
}
