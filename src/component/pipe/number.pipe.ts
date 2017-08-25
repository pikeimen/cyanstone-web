 import {Pipe} from '@angular/core';
 
 @Pipe({name: 'numberFilter'})
 export default class numberPipe {
     transform(numberStr:string, args:string[]) {      
         if(!numberStr) return "";
         let n = 0;
         let num = Number(numberStr)
         if(args){
             n = Number(args);
         }
         if(n != 0){ 
             let _n = Math.pow(10,n);
             _n = 1/_n;
             num = num * _n;
         }
         let _num = num.toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
         return _num;
     }
 }