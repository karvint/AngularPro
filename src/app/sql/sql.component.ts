import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import * as CodeMirror from "codemirror";
import {Constant} from "../constant/constant";
import 'codemirror/mode/sql/sql';
import 'codemirror/addon/lint/json-lint.js';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/sql-hint.js';
import 'codemirror/addon/display/placeholder.js';
import {SqlService} from "./sql.service";
import {SqlData} from "../entity/sql/SqlData";
@Component({
  selector: 'app-sql',
  templateUrl: './sql.component.html',
  styleUrls: ['./sql.component.css']
})
export class SQLComponent implements OnInit,AfterViewInit {
  code;
  cmOptions;
  sqlResult;
  showResult = false;
  @ViewChild("codeEditor")private codeEditor;
  constructor(private el:ElementRef,@Inject("sqlService")private sqlService:SqlService){}
  ngOnInit(){
    this.code = Constant.sqlDefault;
    this.cmOptions = {
      mode: {name:'text/x-sql'},
      indentWithTabs: true,
      lineNumbers: true,
      matchBrackets: true,
      autofocus: false,
      theme:'monokai',
      styleSelectedText: true,
      foldGutter: true,
      gutters:["CodeMirror-linenumbers", "CodeMirror-foldgutter","CodeMirror-lint-markers"],
      // CodeMirror-lint-markers是实现语法报错功能
      lint: true,
      extraKeys: {
        "'a'": this.completeAfter,
        "'b'": this.completeAfter,
        "'c'": this.completeAfter,
        "'d'": this.completeAfter,
        "'e'": this.completeAfter,
        "'f'": this.completeAfter,
        "'g'": this.completeAfter,
        "'h'": this.completeAfter,
        "'i'": this.completeAfter,
        "'j'": this.completeAfter,
        "'k'": this.completeAfter,
        "'l'": this.completeAfter,
        "'m'": this.completeAfter,
        "'n'": this.completeAfter,
        "'o'": this.completeAfter,
        "'p'": this.completeAfter,
        "'q'": this.completeAfter,
        "'r'": this.completeAfter,
        "'s'": this.completeAfter,
        "'t'": this.completeAfter,
        "'u'": this.completeAfter,
        "'v'": this.completeAfter,
        "'w'": this.completeAfter,
        "'x'": this.completeAfter,
        "'y'": this.completeAfter,
        "'z'": this.completeAfter,
        "'.'": this.completeAfter,
        "'='": this.completeIfInTag,
        "Alt": "autocomplete",
        Tab: function (cm) {
          const spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
          cm.replaceSelection(spaces);
        }
      },   // 自动提示配置
    };
  }
  ngAfterViewInit(): void {
    this.codeEditor.codeMirror.setSize(750,300);
    this.codeEditor.codeMirror.refresh();
  }
  completeAfter(cm, pred) {
    const cur = cm.getCursor();
    if(!pred || pred()){
      setTimeout(function() {
        if(!cm.state.completionActive){
          cm.showHint({
            completeSingle: false
          });
        }
      }, 100);
    }
    return CodeMirror.Pass;
  }

  completeIfInTag(cm) {
    return this.completeAfter(cm, function() {
      const tok = cm.getTokenAt(cm.getCursor());
      if (tok.type === "string" && (!/['"]/.test(tok.string.charAt(tok.string.length - 1)) || tok.string.length === 1)){
        return false;
      }
      const inner = CodeMirror.innerMode(cm.getMode(), tok.state).state;
      return inner.tagName;
    });
  }

  runSql(){
    this.showResult = false;
    const sqlData = new SqlData();
    sqlData.sql = this.code;
    this.sqlService.runSql(sqlData).subscribe(res=>{
      this.sqlResult = res.data;
      this.showResult = true;
    });
  }
}
