import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PaginationVo} from "../../entity/util/PaginationVo";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-sql-result',
  templateUrl: './sql-result.component.html',
  styleUrls: ['./sql-result.component.css']
})
export class SqlResultComponent implements OnInit,OnChanges {

  paginationVo = new PaginationVo();
  titles = [];
  @Input()
  resultOption;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if(!isNullOrUndefined(changes.resultOption)&&!isNullOrUndefined(changes.resultOption.currentValue)){
      this.initTable(this.resultOption);
    }
  }
  ngOnInit() {
    this.paginationVo.pageSize = 5;
  }

  initTable(data:any){
    const titleArr = [];
    for (const i in data[0]){
      titleArr.push(i);
    }
    titleArr.sort();
    this.titles = titleArr;
    this.paginationVo._dataSet = data;
  }

}
