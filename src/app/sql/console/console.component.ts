import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {$WebSocket} from "angular2-websocket/angular2-websocket";
import {environment} from "../../../environments/environment";
import {interval} from "rxjs";

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit,AfterViewInit,OnDestroy {
  ws = new $WebSocket(environment.wsUrl);
  queryParamVo = new Object();
  data = "";
  @ViewChild("consoleBody")
  consoleBody:ElementRef;
  inte;
  constructor() { }

  ngOnInit() {
    this.queryParamVo["message"] = "sql";
    this.connect();
  }
  ngAfterViewInit(){
  }

  connect(): void {
    // send with default send mode (now default send mode is Observer)
    this.inte = setInterval(() => {
      this.ws.send("10001").subscribe(
        (msg)=>{},
        (msg)=>{
          // error
          clearInterval(this.inte);
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
  ngOnDestroy(){
    clearInterval(this.inte);
    this.ws.close();
  }
}
