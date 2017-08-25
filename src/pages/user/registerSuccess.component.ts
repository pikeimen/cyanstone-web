import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {REACTIVE_FORM_DIRECTIVES,FormBuilder, FormGroup,Validators } from '@angular/forms';
import {NgIf} from '@angular/common';
import {HdComponent} from '../../layout/header/header.component';
import {FtComponent} from '../../layout/footer/footer.component';
import {successComponent} from '../../pages/user/success.component';

@Component({
    templateUrl: './tpl/registerSuccess.html',
    directives:[HdComponent,FtComponent,successComponent],
    styleUrls:[
        '../../assets/css/user/register.css',
        '../../assets/css/user/success.css'
    ]
})
export class registerSuccessComponent{
     
}