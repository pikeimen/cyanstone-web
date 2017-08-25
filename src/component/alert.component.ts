
import {Component, OnInit,EventEmitter} from '@angular/core';

@Component({
	selector: 'alert',
    properties:["title","message","okText","hidden"],
    templateUrl: './tpl/alert.tpl.html',
     outputs:['okCallback']
})

export class AlertComponent implements OnInit{
   hidden:boolean = true;
   okCallback:EventEmitter<{}> = new EventEmitter();
    
   clickAlertBtn(){
       this.hidden = true;
       this.okCallback.emit({});
   }
   ngOnInit(){
      
   }
   toggerAlert(hidden:any){
       if(!hidden){
            let dom = <HTMLElement>document.querySelector(".alert-main");
            let width = dom.offsetWidth;
            dom.style.marginLeft = "-"+parseInt((width/2).toString()) + "px";
       }
       
      
       return hidden;
   }
}