import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgClass,NgStyle} from '@angular/common';
import imgUrlPipe from '../cyan_news/pipe/imgUrl.pipe';
@Component({
     selector: 'carousel-bg',
     templateUrl: './tpl/carousel.tpl.html',
     directives: [NgClass,NgStyle],
     pipes:[imgUrlPipe]
     //styleUrls:['../../assets/css/global/carousel.component.css']
})
export class CarouselComponent implements OnInit{
    /**第一页特效 */
    animateOne = false;
    /**第二页特效 */
    animateTwo = false;
    /**第三页特效 */
    animateThree = false;
    /**切换轮播 */
    currentTab = 0;
    /**图片定位 */
    transformBody = "translate3d(0px, 0px, 0px);";
    
    //正在切换
    slideFlag : boolean = false;

     ngOnInit() {
         setTimeout(()=>{
             this.animateOne = true;
         },1000);
         let dom:HTMLElement = <HTMLElement>document.querySelector(".carousel-stone-body");
         /**鼠标事件 */
         
        dom.onmousewheel = (event) =>{ 
            if(this.slideFlag){ return; }
              event.preventDefault();
               let wheelDelta = event.wheelDelta;
               if(wheelDelta < 0){
                   if(this.currentTab < 2){
                       let tab = this.currentTab + 1;
                       this.toggerTab(tab);  
                       this.documentTransform(tab);     
                   }else{
                       let tab = 2;
                       this.toggerTab(tab);  
                       this.documentTransform(tab);      
                   }
                   /***正在轮播,轮播间隔时间1s****/
                   this.slideFlag = true;
                   setTimeout(()=>{
                       this.slideFlag = false;
                   },1000);
               }else if(wheelDelta > 0){
                   if(this.currentTab != 0){
                        let tab = this.currentTab - 1;
                        this.toggerTab(tab);
                        this.documentTransform(tab);    
                   }
                   /***正在轮播,轮播间隔时间1s****/
                   this.slideFlag = true;
                   setTimeout(()=>{
                       this.slideFlag = false;
                   },1000);
               }
              
           };

           document.onkeydown = (event) =>{
             let dom:HTMLElement = <HTMLElement>document.querySelector(".carousel-stone-body");
             if(!dom){
                 return;
             }
             let key = event.keyCode;
            if(key == 38){
                 if(this.currentTab != 0){
                      let tab = this.currentTab - 1;
                       this.toggerTab(tab);
                        this.documentTransform(tab);    
                   }
             }else if(key == 40){
                  if(this.currentTab != 2){
                       let tab = this.currentTab + 1;
                     this.toggerTab(tab);  
                      this.documentTransform(tab);                         
	
                   }
             }
           };
     }
     documentTransform(page:number){
        let top : number;
        top = 0;
        top = page * 100;
        let transform = "translate3d(0px, -"+top+"%,0px)";   
        let dom:HTMLElement = <HTMLElement>document.querySelector(".carousel-body");
        dom.style.transform = transform; 
        
        if(page == 1){
            let carousel_two:HTMLElement = <HTMLElement>document.querySelector(".carousel-two");
            if(carousel_two.className.indexOf("animateIn-two") == -1){
                carousel_two.className =  carousel_two.className+ " animateIn-two";
            }
        }else if(page == 2){
            let carousel_three:HTMLElement = <HTMLElement>document.querySelector(".carousel-three");
            if(carousel_three.className.indexOf("animateIn-three") == -1){
                carousel_three.className= carousel_three.className +" animateIn-three";
            }
        }
        
        let pagination:any = document.querySelectorAll(".pagination a");
        for(let i = 0;i<pagination.length;i++){
            let className = pagination[i].className;
            if(className.indexOf("active") != -1){
                pagination[i].className = "";
            }
            if(i == page){
                pagination[i].className = "active";
            }
        }
     }
    addAnimate(page:number){
        if(page == 0){
            this.animateOne = true;
        }else if(page == 1){
            this.animateTwo = true;
        }else{
            this.animateThree = true;
        }
    } 
    toggerTab(page:number){
        if(page>2){
            page = 0;
        }
        var dom2:HTMLElement = <HTMLElement>document.querySelector("#go_next");
        let dom3:HTMLElement = <HTMLElement>document.querySelector(".pagination");
        var a_arr = dom3.querySelectorAll("a");
        for(var i=0;i<a_arr.length;i++){
            if(i==page){
                a_arr[i].setAttribute("class","active");
            }else{
                a_arr[i].setAttribute("class","");
            }
        }
        if(page==2){
            dom2.style.display = "none";
        }else{
            dom2.style.display = "block";
        }
        this.currentTab = page;
        this.addAnimate(page);
        let top : number;
        top = 0;
        top = page * 100;
        this.transformBody = "translate3d(0px, -"+top+"%,0px)";             
    }
}