import {Component, Inject, OnInit} from '@angular/core';
import {GroupService} from '../group/groupService';
import {Subscription} from 'rxjs/index';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {
  subscript:Subscription;
  options:any = [];
  dataSet:any = [];
  constructor(@Inject('groupService') private groupService:GroupService) {
    // this.subscript = this.groupService.getOption().subscribe(res=>{
    //   this.options.push(res);
    // });
  }

  ngOnInit() {
  }


}
