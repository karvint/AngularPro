import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import * as CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/sql/sql';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/sql-hint.js';
import 'codemirror/addon/display/placeholder.js';
import {Constant} from "../constant/constant";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(){}
  ngOnInit(){
  }

}
