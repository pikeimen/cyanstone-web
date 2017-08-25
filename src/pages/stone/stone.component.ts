import {Component, OnInit} from '@angular/core';
import{CarouselComponent} from './carousel.component';
import {HdComponent} from '../../layout/header/header.component';
import {FtComponent} from '../../layout/footer/footer.component';

@Component({
    selector: 'stone',
    templateUrl: './tpl/stone.tpl.html',
    
     directives:[CarouselComponent,HdComponent,FtComponent]
})
export class StoneComponent{
    
}