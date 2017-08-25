import {Component, OnInit} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {REACTIVE_FORM_DIRECTIVES,FormBuilder, FormGroup,Validators } from '@angular/forms';
import {NgIf} from '@angular/common';
import {HdComponent} from '../../layout/header/header.component';
import {FtComponent} from '../../layout/footer/footer.component';
import {successComponent} from '../../pages/user/success.component';
import {CyanstoneService} from '../../service/cyanstone.service';
import {ValidationService} from '../../service/validation.service';

@Component({
    templateUrl: './tpl/findPwdStep2.html',
    directives:[HdComponent,FtComponent,successComponent,REACTIVE_FORM_DIRECTIVES],
    styleUrls:[
        '../../assets/css/user/validate.css',
        '../../assets/css/user/register.css',
        '../../assets/css/user/modifyPwd.css',
        '../../assets/css/user/findPwd.css',
        '../../assets/css/user/success.css'
    ]
})
export class findPwdStep2Component implements OnInit{
   f : any;
   constructor(private formBuilder: FormBuilder,private cyanService:CyanstoneService, private _router: Router,private activatedRoute: ActivatedRoute){
       this.f = this.formBuilder.group({
            'password': ['', [Validators.required, ValidationService.passwordValidator]],
            'rePassword': ['', [Validators.required, ValidationService.passwordValidator]]
        });
   }

   ngOnInit() {
      this.activatedRoute.params.subscribe(params => {
            this.params.mobile = params["mobile"];
      });
    }
   
   //正在提交
   requestFlag : boolean = false;

   //点击了提交按钮
   touched : boolean = false;
   
    //【修改密码】请求参数
    params : any = {
        mobile : "",
        password : '',     //新密码
        rePassword : ''    //重复密码
    }
    
    //密码修改成功
    modifySuccess : boolean = false;
    
    //提交
    submit(data:any){
        this.touched = true;
        if(this.f.controls.password.value != this.f.controls.rePassword.value){
            //两次密码不一致
            return;
        }
        if (this.f.dirty && this.f.valid) {
            this.cyanService.callBackPwdStep2(this.params,(data:any)=>{
                    this.modifySuccess = true;
                    this._router.navigate(["/findPwdStep3"]);
            },(data:any)=>{
                
            })
        }
    }
     
}