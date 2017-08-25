 import {Pipe} from '@angular/core';
 
 @Pipe({name: 'fileFilter'})
 export default class FilePipe {
     transform(file:string, args:string[]) {      
        let ext : any;
        if(args){
            ext = args;
        }
        let file_array = file.split(".");
        if(!file) return "";
        if(ext == "ext"){
            if(file_array.length >1){
                return "."+file_array[file_array.length-1];
            }
            return ".txt";    
        }else{
            let index = file.lastIndexOf(".");
            return file.substring(0,index);
        }
     }
 }