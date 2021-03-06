import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as flowchart from 'flowchart.js/release/flowchart.js';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.css']
})
export class FlowComponent implements OnInit {
  @ViewChild("diagram") diagram:ElementRef;
  constructor() { }

  ngOnInit() {
    const dia = flowchart.parse('st=>start: Start:>http://www.google.com[blank]\n' +
      'e=>end:>http://www.google.com\n' +
      'op1=>operation: My Operation\n' +
      'op2=>operation: Stuff|current\n' +
      'sub1=>subroutine: My Subroutine\n' +
      'cond=>condition: Yes \n' + // use cond(align-next=no) to disable vertical align of symbols below
      'or No?\n:>http://www.google.com\n' +
      'c2=>condition: Good idea|rejected\n' +
      'io=>inputoutput: catch something...|request\n' +
      '\n' +
      'st->op1(right)->cond\n' +
      'cond(yes, right)->c2\n' + // conditions can also be redirected like cond(yes, bottom) or cond(yes, right)
      'cond(no)->sub1(left)->op1\n' + // the other symbols too...
      'c2(true)->io->e\n' +
      'c2(false)->op2->e'  // allow for true and false in conditionals
    );
    dia.drawSVG(this.diagram,{
      'x': 0,
      'y': 0,
      'line-width': 3,
      'line-length': 50,
      'text-margin': 10,
      'font-size': 14,
      'font-color': 'black',
      'line-color': 'black',
      'element-color': 'black',
      'fill': 'white',
      'yes-text': 'yes',
      'no-text': 'no',
      'arrow-end': 'block',
      'scale': 1,
      // style symbol types
      'symbols': {
        'start': {
          'font-color': 'red',
          'element-color': 'green',
          'fill': 'yellow'
        },
        'end':{
          'class': 'end-element'
        }
      },
      // even flowstate support ;-)
      'flowstate' : {
        // 'past' : { 'fill' : '#CCCCCC', 'font-size' : 12},
        // 'current' : {'fill' : 'yellow', 'font-color' : 'red', 'font-weight' : 'bold'},
        // 'future' : { 'fill' : '#FFFF99'},
        'request' : { 'fill' : 'blue'}// ,
        // 'invalid': {'fill' : '#444444'},
        // 'approved' : { 'fill' : '#58C4A3', 'font-size' : 12, 'yes-text' : 'APPROVED', 'no-text' : 'n/a' },
        // 'rejected' : { 'fill' : '#C45879', 'font-size' : 12, 'yes-text' : 'n/a', 'no-text' : 'REJECTED' }
      }
    });
  }

}
