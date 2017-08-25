import {Component, OnInit} from '@angular/core';
import {HdComponent} from '../../layout/header/header.component';
import {FtComponent} from '../../layout/footer/footer.component';


@Component({
	selector: 'page404',
    templateUrl: './tpl/404.tpl.html',
    directives:[HdComponent,FtComponent]
})
export class page404Component implements OnInit{
    ngOnInit() {
        
    }
    
}