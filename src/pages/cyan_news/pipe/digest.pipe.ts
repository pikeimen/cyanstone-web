 import {Pipe} from '@angular/core';
 
 
 @Pipe({name: 'digestRender'})
 export default class digestPipe {
     transform(digest:string, args:string[]) {      
       if(digest){
           if(digest.length > 100){
               return digest.substring(0,100) + "...";
           }
          return digest;
       }
     }
 }