import {Component, Inject, Input, OnInit} from '@angular/core';
import {MenuService} from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  homeUrl = "/home";
  menuOptions=[];
  @Input()
  isCollapsed;
  constructor(@Inject('menuService')private menuService:MenuService) { }

  ngOnInit() {
    this.menuService.getMenus().subscribe(res=>{
      this.menuOptions = res.rows;
    });
  }

}
