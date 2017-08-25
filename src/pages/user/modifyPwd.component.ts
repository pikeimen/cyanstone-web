import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {REACTIVE_FORM_DIRECTIVES,FormBuilder, FormGroup,Validators } from '@angular/forms';
import {NgIf} from '@angular/common';
import {HdComponent} from '../../layout/header/header.component';
import {FtComponent} from '../../layout/footer/footer.component';
import {successComponent} from '../../pages/user/success.component';
import {CyanstoneService} from '../../service/cyanstone.service';
import {ValidationService} from '../../service/validation.service';

@Component({
    templateUrl: './tpl/modifyPwd.html',
    directives:[HdComponent,FtComponent,successComponent,REACTIVE_FORM_DIRECTIVES],
    styleUrls:[
        '../../assets/css/user/validate.css',
        '../../assets/css/user/register.css',
        '../../assets/css/user/modifyPwd.css'
    ]
})
export class modifyPwdComponent{
    
   f : any;
   
   constructor(private formBuilder: FormBuilder,private cyanService:CyanstoneService, private _router: Router){
       this.f = this.formBuilder.group({
            'oldPassword': ['', [Validators.required]],
            'password': ['', [Validators.required, ValidationService.passwordValidator]],
            'rePassword': ['', [Validators.required, ValidationService.passwordValidator]]
        });
   }
   
   //点击了提交按钮
   touched : boolean = false;
   
    //【修改密码】请求参数
    params : any = {
        oldPassword : '',  //旧密码
        password : '',     //新密码
        rePassword : ''    //重复密码
    }
    
    //密码修改成功
    modifySuccess : boolean = false;
    
    //原密码不正确
    oldPasswordError : boolean = false;

    //输入原密码的时候
    oldPasswordChange(){
        if(this.oldPasswordError==false){
            return;
        }
        this.oldPasswordError = false;
    }

    //提交
    submit(data:any){
        this.touched = true;
        if(this.f.controls.password.value != this.f.controls.rePassword.value){
            //两次密码不一致
            return;
        }else if(this.oldPasswordError){
            //原密码不正确
            return;
        }else if (this.f.dirty && this.f.valid) {
            this.cyanService.userResetPwd(this.params,(data:any)=>{
                    this.modifySuccess = true;
                    //登出
                    this.cyanService.logout(()=>{
                        sessionStorage.removeItem("user_mobile");
                        this._router.navigate(['modifyPwdSuccess']);
                    });
                    
            },(data:any)=>{
                if(data.code==-110010){
                    //原密码不正确
                    this.oldPasswordError = true;
                }
            })
        }
    }
     
}