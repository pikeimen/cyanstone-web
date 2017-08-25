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
    templateUrl: './tpl/findPwdStep3.html',
    directives:[HdComponent,FtComponent,successComponent,REACTIVE_FORM_DIRECTIVES],
    styleUrls:[
        '../../assets/css/user/validate.css',
        '../../assets/css/user/register.css',
        '../../assets/css/user/modifyPwd.css',
        '../../assets/css/user/findPwd.css',
        '../../assets/css/user/success.css'
    ]
})
export class findPwdStep3Component{
    
   
     
}