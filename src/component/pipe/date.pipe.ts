 import {Pipe} from '@angular/core';
 
 @Pipe({name: 'dateFilter'})
 export default class datePipe {
     transform(dateStr:string, args:string[]) {      
         if(!dateStr) return "";
         let dateNum = Number(dateStr);
         let date = new Date(dateNum);
         let year = date.getFullYear();
         let month = date.getMonth() + 1;
         let day = date.getDate();
         let _month = "";
         let _date = "";
         if(month < 10){
             _month = "0" + month;
         }else{
             _month = month.toString();
         }
         if(day < 10){
             _date = "0" + day;
         }else{
             _date = day.toString();
         }
         if(args){
             let num = Number(args);
             if(num == 1){
                  return year + "年" + _month + "月" + _date + "日"; 
             }
         }
         return year + "-" + _month + "-" + _date; 
     }
 }