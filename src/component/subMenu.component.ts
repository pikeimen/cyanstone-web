import {Component, OnInit} from '@angular/core';
import {NgIf,NgFor,NgStyle} from '@angular/common';
import {SubMenu} from '../model/SubMenu';

@Component({
	selector: 'subMenu',
    properties:["activeItem","menus","liWidth"],
    templateUrl: './tpl/subMenu.html',
    directives:[NgIf,NgFor,NgStyle],
     styleUrls:['../assets/css/sub_menu/sub.menu.css']
})

export class SubMenuComponent{
   
}