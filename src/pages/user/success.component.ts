import {Component, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
    selector: 'success-tip',
    properties:["successText","btnText","subText","btnLink","style"],
    templateUrl: './tpl/success.html',
    styleUrls:[
        '../../assets/css/user/success.css'
    ]
})
export class successComponent{
     
     constructor(private _router: Router){
       
     }
     
     //跳转页面
     go(link : any){
         this._router.navigate([link]);
     }
     
}