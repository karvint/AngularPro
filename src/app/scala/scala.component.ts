import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Constant} from "../constant/constant";
import * as CodeMirror from "codemirror";
import 'codemirror/addon/lint/json-lint.js';
import 'codemirror/mode/clike/clike';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/sql-hint.js';
import 'codemirror/addon/display/placeholder.js';
@Component({
  selector: 'app-scala',
  templateUrl: './scala.component.html',
  styleUrls: ['./scala.component.css']
})
export class ScalaComponent implements OnInit,AfterViewInit {
  code;
  cmOptions;
  @ViewChild("codeEditor")private codeEditor;
  constructor(private el:ElementRef){}
  ngOnInit(){
    this.code = Constant.scalaDefault;
    this.cmOptions = {
      mode: {name:'text/x-scala'},
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
    this.codeEditor.codeMirror.setSize(1000,800);
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


}
