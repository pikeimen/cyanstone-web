import {Component, OnInit} from '@angular/core';
import {FtComponent} from '../../layout/footer/footer.component';
import {HdComponent} from '../../layout/header/header.component';
import {Router,ActivatedRoute } from '@angular/router';
import { CyanstoneService } from '../../service/cyanstone.service';


@Component({
	selector: 'risk-result',
    templateUrl: './tpl/riskResult.tpl.html',
    directives:[HdComponent,FtComponent],
    styleUrls:['../../assets/css/risk/risk.result.css']
})
export class RiskResultComponent implements OnInit{
    riskResult:any = {
        time:'',
        levelName:'',
        level:'',
        existFund:false
    }
    constructor(
        private cyanstoneService:CyanstoneService,
        private _router: ActivatedRoute,
        private router: Router ){}
    ngOnInit() {
      this._router.params.subscribe(params => {
            let key = params['key']; 
            let key_1 = key.split("_")[0];
            let key_2 = key.split("_")[1];
            this.riskResult = this.cyanstoneService.riskResultKey("get",key_1);
            let date = new Date(Number(key_2));
            let month:any = date.getMonth() + 1;
            if(month < 10){
                month = "0" + month;
            }
            let day:any = date.getDate();
            if(day < 10){
                day = "0" + day;
            }
            let time = date.getFullYear() + "-" + month + "-" + day;
            this.riskResult.time = time;
           
      });
    }
    goToRisk(){
        this.router.navigate(['riskTest']);
    }
    goToProduct(){
        this.router.navigate(['product']);
    }
}