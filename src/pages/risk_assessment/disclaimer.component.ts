import {Component, OnInit} from '@angular/core';
import {FtComponent} from '../../layout/footer/footer.component';
import {HdComponent} from '../../layout/header/header.component';


@Component({
	selector: 'disclaimer',
    templateUrl: './tpl/disclaimer.tpl.html',
    directives:[HdComponent,FtComponent],
    styleUrls:['../../assets/css/risk/disclaimer.css']
})
export class DisclaimerComponent implements OnInit{
    ngOnInit() {
     
    }
    
}