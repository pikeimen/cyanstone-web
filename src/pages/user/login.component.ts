import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {REACTIVE_FORM_DIRECTIVES,FormBuilder, FormGroup,Validators } from '@angular/forms';
import {NgIf} from '@angular/common';
import {HdComponent} from '../../layout/header/header.component';
import {FtComponent} from '../../layout/footer/footer.component';
import {CyanstoneService} from '../../service/cyanstone.service';
import {ValidationService} from '../../service/validation.service';

@Component({
    directives:[HdComponent,FtComponent,REACTIVE_FORM_DIRECTIVES,NgIf],
    templateUrl: './tpl/login.html',
    styleUrls:[
        '../../assets/css/global/carousel.component.css',
         '../../assets/css/user/login.css',
         '../../assets/css/user/validate.css'
    ]
})
export class loginComponent{
   
    f : any;
   
    //登录失败，错误提示信息
    errorTip : string = "";
   
    //请求参数
    user : any = {
        params : "",
        password : ""
    };
   
    //今日密码剩余输入次数
    pwdLeftTimes : number;

   constructor(private formBuilder: FormBuilder,private cyanService:CyanstoneService, private _router: Router){
       this.f = this.formBuilder.group({
            'username': ['', Validators.required],
            'password': ['', Validators.required]
        });
   }
   
   //正在提交
   requestFlag : boolean = false;

   //点击了提交按钮
   touched : boolean = false;
     
    //提交
    submit(){
        this.touched = true;
        if (this.f.dirty && this.f.valid) {
            this.requestFlag = true;
            this.cyanService.login(this.user,(data:any)=>{
                sessionStorage.setItem("user_mobile",this.user.params);
                this.requestFlag = false;
                //登录成功
                this._router.navigate(['stone']);
            },(data:any)=>{
                //登录失败
                this.requestFlag = false;
                //今日密码剩余输入次数
                if(data.data){
                    this.pwdLeftTimes = data.data.pwdLeftTimes;
                    this.errorTip = "密码错误，还剩"+ this.pwdLeftTimes +"次机会。";
                }else{
                    this.pwdLeftTimes = 0;
                    this.errorTip = "如忘记密码您可申请找回密码或24小时后重试，如有疑问请联系客服400-928-2268.";
                }
                
            })
        }
        
    }
     
}