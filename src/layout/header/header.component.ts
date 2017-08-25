import { Component,OnInit } from '@angular/core';
import { CyanstoneService } from '../../service/cyanstone.service';
import {Router} from '@angular/router';

@Component({
  selector: 'header',
  properties:["activeItem","transparent","selectItem","headStyle"],
  templateUrl: 'tpl/header.tpl.html'
})

export class HdComponent implements OnInit {
    selectItem : any;
    user_mobile:string = "";
    constructor(private cyanService:CyanstoneService, private router: Router ){}
    ngOnInit(){
      //点击页面空白处，关闭顶部 已经打开的下拉菜单
      document.onclick = ()=>{
        let ele : HTMLElement = <HTMLElement> document.querySelector("#J_mainMenu .hover");
        if(!ele) return;
        ele.className = "channel channelItem";
        this.selectItem = -1;
      }

      //查询当前登录用户信息
      this.userInfo();

      /*let mobile = sessionStorage.getItem("user_mobile");
      if(mobile){
        this.user_mobile = mobile.substring(0,3)+"****"+mobile.substring(7,11);
      }*/
      
    }
    
    logout(){
       this.cyanService.logout(()=>{
          sessionStorage.removeItem("user_mobile");
          this.router.navigate(["login"]);
       });
    }

    //查询当前登录用户信息
    userInfo(){
       this.cyanService.userInfo((data:any)=>{
          this.user_mobile = data.mobile;
       },(data:any)=>{
          this.user_mobile = null;
       });
    }

    openItem(item:number,event:any){
       this.selectItem=item;
       if(item != -1){
       let ele  = document.querySelectorAll("#J_mainMenu .channelItem");
       let num = item -1;
       let dom = ele[num]
        dom.className = "channel channelItem hover";
       }else{
          let ele : HTMLElement = <HTMLElement> document.querySelector("#J_mainMenu .hover");
         ele.className = "channel channelItem";
       }
      if(!event){
        event = window.event;
      }
      if(window.event){
        event.cancelBubble = true;
      }
      else{
        event.stopPropagation();
      }
      
     
    }

}
