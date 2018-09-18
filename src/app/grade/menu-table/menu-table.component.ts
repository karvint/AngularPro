import {Component, Inject, OnInit} from '@angular/core';
import {PaginationVo} from '../../entity/util/PaginationVo';
import {MenuService} from '../../menu/menu.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-menu-table',
  templateUrl: './menu-table.component.html',
  styleUrls: ['./menu-table.component.css']
})
export class MenuTableComponent implements OnInit {
  paginationVo=new PaginationVo();
  constructor(@Inject('menuService')private menuService:MenuService) { }

  ngOnInit() {
    this.searchData();
  }

  searchData(flag?:boolean){
    if(!this.paginationVo._loading){
      this.paginationVo._loading = true;
      this.menuService.getMenus().subscribe(data=>{
        this.paginationVo._dataSet = [];
        if(isNullOrUndefined(data.rows)||data.rows.length===0){
          this.paginationVo.initPaginationVo(10);
          return;
        }
        this.pushData(data.rows);
        this.paginationVo._total = data.total;
        this.paginationVo._loading=false; //
      });
    }
  }

  pushData(rows){
    for(let i=0;i<rows.length;i++){
      this.paginationVo._dataSet.push({
        id:rows[i].id,
        menuName:rows[i].menuName,
        url:rows[i].url
      });
    }
  }

}
