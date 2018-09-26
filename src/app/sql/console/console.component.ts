import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {$WebSocket} from "angular2-websocket/angular2-websocket";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit,AfterViewInit {
  ws = new $WebSocket(environment.wsUrl);
  queryParamVo = new Object();
  data = "";
  @ViewChild("consoleBody")
  consoleBody:ElementRef;
  constructor() { }

  ngOnInit() {
    this.queryParamVo["message"] = "sql";
    this.connect();
  }
  ngAfterViewInit(){
  }

  connect(): void {
    // this.ws.send("10001").subscribe(
    //   (msg)=> {
    //   },
    //   (msg)=> {
    //   },
    //   ()=> {
    //   }
    // );
    // send with default send mode (now default send mode is Observer)
    const interval = setInterval(() => {
      this.ws.send("10001").subscribe(
        (msg)=>{},
        (msg)=>{
          console.log("error");
          clearInterval(interval);
          },
        ()=>{}
      );
    },2000);
      // set received message stream
      this.ws.onMessage(
        (msg: MessageEvent)=> {
          this.data += msg.data;
          this.consoleBody.nativeElement.scrollTop=this.consoleBody.nativeElement.scrollHeight+600;
        },
        {autoApply: false}
      );
  }

}
