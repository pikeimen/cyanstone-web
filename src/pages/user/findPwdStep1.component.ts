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
    templateUrl: './tpl/findPwdStep1.html',
    directives:[HdComponent,FtComponent,successComponent,REACTIVE_FORM_DIRECTIVES],
    styleUrls:[
        '../../assets/css/user/validate.css',
        '../../assets/css/user/register.css',
        '../../assets/css/user/modifyPwd.css',
        '../../assets/css/user/findPwd.css',
        '../../assets/css/user/success.css'
    ]
})
export class findPwdStep1Component{
   f : any;
   constructor(private formBuilder: FormBuilder,private cyanService:CyanstoneService, private _router: Router){
       this.f = this.formBuilder.group({
            'mobile': ['', [Validators.required, ValidationService.mobileValidator]],
            'imgVerCode': ['', Validators.required],
            'mobileCode': ['', Validators.required],
        });
   }
   
   //正在提交
   requestFlag : boolean = false;

   //注册成功
   registerSuccess : boolean = false;

   //点击了提交按钮
   touched : boolean = false;
   
   //倒计时
   second : number = -1;
   
   //获取验证码的 定时器
   cdt :any;
   
   //图形验证码是否正确
   imgVerFlag : boolean = true;
   
   //获取手机验证码
   getMobileCode(){
       if(!this.f.controls.imgVerCode.valid){
           this.imgVerFlag = false;
           return;
       }
       //首先校验图形验证码
       this.cyanService.checkImgCode({authCode:this.inputImgVerCode},(data:any)=>{
            this.imgVerFlag = true;
            //发送短信验证码
            this.cyanService.getMobileCode({mobile:this.params.mobile,type:4},(data:any)=>{
                    this.getIn60s = false;
                    this.params.uniqueCode = data.uniqueCode; 
                    //短信发送成功，刷新图形验证码 
                    this.random();
                    //开始倒计时
                    this.countDown();
            },(data:any)=>{
                this.getIn60s = true;
            })
       },(data:any)=>{
            this.imgVerFlag = false;
       })
   }
   
   //倒计时
   countDown(){
       //开始倒计时
       this.second = 60;
       let interval = setInterval(()=>{
           if(this.second < 0){
               clearInterval(interval);
               return;
            }
            this.second--;
       },1000)
   }
   
   //图形验证码源地址
   imgVerCodeBaseSrc : string = this.cyanService.host + "http/img/getImgCode.action";
   
   //随机图形验证码地址
   imgVerCodeSrc : string = this.imgVerCodeBaseSrc;
   
    //【找回密码：第一步】请求参数
    params : any = {
        mobile : '',     //手机号
        uniqueCode : '', //手机验证码唯一标识
        mobileCode : ''  //用户输入的手机验证码
    }
    //输入的图形验证码
    inputImgVerCode : string;
    //是否勾选协议
    agreement : boolean = true;
    //已注册
    registFlag : boolean = true;
    //60s内连续获取短信验证码
    getIn60s : boolean = false;
    //刷新图形验证码
    random(){ this.imgVerCodeSrc = this.imgVerCodeBaseSrc +"?"+ Math.random(); }
    
    //手机号发生改变时
    mobileChange(){
        if(this.f.controls.mobile.valid){
            //验证手机号是否已 注册
            this.cyanService.mobileAndIdNoCheck({params:this.params.mobile},(data:any)=>{
                    if(data.resultCode=="1"){
                        //已注册
                        this.registFlag = true;
                    }else{
                        this.registFlag = false;
                    }
            },(data:any)=>{
                
            })
        }
    }
    //输入短信验证码的时候
    mobileCodeChange(){
        if(this.getIn60s==false){
            return;
        }
        this.getIn60s = false;
    }
    //提交
    submit(data:any){
        this.touched = true;
        if(!this.registFlag){
            //未注册
            return;
        }else if(!this.params.uniqueCode){
            //未获取短信验证码
            return;
        }else if (this.f.dirty && this.f.valid) {
            this.requestFlag = true;//正在提交
            this.cyanService.callBackPwdStep1(this.params,(data:any)=>{
                this.requestFlag = false;//提交完成
                var routeLink = '/findPwdStep2/'+this.params.mobile;
                this._router.navigate([routeLink]);
            },(data:any)=>{
                this.requestFlag = false;//提交完成
            })
        }
    }
     
}