import {Component, OnInit,Input,EventEmitter} from '@angular/core';
import {NgIf,NgFor,NgStyle,NgClass} from '@angular/common';

@Component({
	selector: 'pageNum', 
    templateUrl: './tpl/pageNum.tpl.html',
    outputs:['pageClick'],
    directives:[NgIf,NgFor,NgStyle]
})

export class PageNumComponent implements OnInit{
    totalArray:any = new Array();
   //总页数
    _totalPage:number=1;
    //当前页
    @Input() currentPage:number=1;
    
    pageClick:EventEmitter<{}> = new EventEmitter();
    
   constructor(){
       
   }
   @Input()
   set totalPage(totalPage:number){
       this._totalPage = totalPage
       this.totalArray = new Array(totalPage);
   }
   ngOnInit(){
      
   }
   selectPage(i:number){
       let select_page = i + 1;
       if(select_page != this.currentPage){
           this.currentPage = select_page;
           this.pageClick.emit({current:select_page});
       }
   }
   prevPage(){
       if(this.currentPage > 1){
           this.currentPage--;
           this.pageClick.emit({current:this.currentPage});
       }
   }
   nextPage(){
       if(this.currentPage < this._totalPage){
           this.currentPage++;
           this.pageClick.emit({current:this.currentPage});
       }
   }
  
}