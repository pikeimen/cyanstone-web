import {Component, OnInit} from '@angular/core';
import {FtComponent} from '../../layout/footer/footer.component';
import {NgClass} from '@angular/common';
import {RiskAnswer} from '../../model/RiskAnswer';
import {AlertComponent} from '../../component/alert.component';
import { CyanstoneService } from '../../service/cyanstone.service';
import {Router} from '@angular/router';
import { Ng2ScrollableDirective }  from '../../component/ng2-scrollable.directive';

@Component({
	selector: 'risk-test',
    templateUrl: './tpl/riskTest.tpl.html',
    directives:[FtComponent,NgClass,AlertComponent,Ng2ScrollableDirective],
    styleUrls:['../../assets/css/risk/risk.test.css']
})
export class riskTestComponent implements OnInit{
    answers :RiskAnswer;
    checkSelected:boolean;
    alertObject:any={};
    constructor(private cyanstoneService:CyanstoneService, private _router: Router){}
    ngOnInit() {
        this.answers = new RiskAnswer();
        this.checkSelected = false;
        this.alertObject={
            message:"请阅读并同意免责说明",
            hidden:true
        }
    }
    changeAnswer(select:string,screen:number){
        this.answers[select] = screen;
    }
    changeCheck(){
        this.checkSelected = !this.checkSelected;
    }
    submitAnswer(){
          let sum = 0;
        for(let key in this.answers){
            let screent = this.answers[key];
            if(screent == -1){
             Ng2ScrollableDirective.scrollTo('#question_'+key,"#riskContainer");
        
                return;
            }
            sum = sum + screent;
        }
        if(!this.checkSelected){
            this.alertObject.hidden = false;
            return;
        }
        let score = sum.toString();
        this.cyanstoneService.submitRiskScore(score,(data:any)=>{
            let acceptTime = data.acceptTime;
             let key = this.cyanstoneService.riskResultKey("set",data);
             key = key + "_" + acceptTime;
             this._router.navigate(['riskResult', key]);
        })
    }

}