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
export class HomeComponent implements OnInit,AfterViewInit {
  code;
  cmOptions;
  @ViewChild("codeEditor")private codeEditor;
  constructor(private el:ElementRef){}
  ngOnInit(){
    this.code = Constant.codeDefault;
    this.cmOptions = {
      mode: {name:'text/x-sql'},
      indentWithTabs: true,
      lineNumbers: true,
      matchBrackets: true,
      autofocus: false,
      theme:'eclipse',
      styleSelectedText: true,
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
