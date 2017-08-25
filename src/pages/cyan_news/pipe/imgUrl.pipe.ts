 import {Pipe} from '@angular/core';
 import { CyanstoneService } from '../../../service/cyanstone.service';
 
 
 @Pipe({name: 'imageURL'})
 export default class imgUrlPipe {
     constructor(private cyanService:CyanstoneService){}
     transform(url:string, args:string[]) {      
       if(url){
           
           return "url("+this.cyanService.imageURL + url+")";
       }
     }
 }