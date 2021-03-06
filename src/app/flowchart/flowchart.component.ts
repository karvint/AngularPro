import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as go from "gojs/release/go.js";


@Component({
  selector: 'app-flowchart',
  templateUrl: './flowchart.component.html',
  styleUrls: ['./flowchart.component.css']
})
export class FlowchartComponent implements OnInit {
  diagram:go.Diagram = new go.Diagram();
  @ViewChild('diagramDiv') diagramDiv:ElementRef;
  ngOnInit(): void {
    // For conciseness. See the "Building Parts" intro page for more
    const $ = go.GraphObject.make;
    this.diagram.div = this.diagramDiv.nativeElement;
    // the node template describes how each Node should be constructed
    this.diagram.nodeTemplate =
      $(go.Node, "Auto",  // the Shape automatically fits around the TextBlock
        $(go.Shape, "RoundedRectangle",  // use this kind of figure for the Shape
          // bind Shape.fill to Node.data.color
          new go.Binding("fill", "color")),
        $(go.TextBlock,
          { margin: 3 },  // some room around the text
          // bind TextBlock.text to Node.data.key
          new go.Binding("text", "key"))
      );

    // the Model holds only the essential information describing the diagram
    this.diagram.model = new go.GraphLinksModel(
      [ // a JavaScript Array of JavaScript objects, one per node;
        // the "color" property is added specifically for this app
        { key: "Alpha", color: "lightblue" },
        { key: "Beta", color: "orange" },
        { key: "Gamma", color: "lightgreen" },
        { key: "Delta", color: "pink" }
      ],
      [ // a JavaScript Array of JavaScript objects, one per link
        { from: "Alpha", to: "Beta" },
        { from: "Alpha", to: "Gamma" },
        { from: "Beta", to: "Beta" },
        { from: "Gamma", to: "Delta" },
        { from: "Delta", to: "Alpha" }
      ]);
    this.diagram.initialContentAlignment = go.Spot.Center;
    // enable Ctrl-Z to undo and Ctrl-Y to redo
    this.diagram.undoManager.isEnabled = true;
    // this.diagram.model.addLinkData({from:"Delta",to:"Delta"});
  }
}
