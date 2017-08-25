import {Component, OnInit} from '@angular/core';
import {HdComponent} from '../../layout/header/header.component';
import {FtComponent} from '../../layout/footer/footer.component';
import {SubMenuComponent} from '../../component/subMenu.component';
import {SubMenu} from '../../model/SubMenu';

@Component({
    templateUrl: './tpl/businessService.html',
    directives:[HdComponent,FtComponent,SubMenuComponent],
    styleUrls:['../../assets/css/about_us/chairman.word.css']
})
export class businessServiceComponent implements OnInit{
     menus : SubMenu[];
   
     ngOnInit() {
         this.menus = [];
         let m1 = new SubMenu("公司简介");
         m1.href = "#/companyIntro";
         let m2 = new SubMenu("业务范围");
         m2.href = "#/businessService";
         let m3 = new SubMenu("董事长致辞");
         m3.href = "#/chairmanWord";
         let m4 = new SubMenu("管理团队");
         m4.href = "#/manageTeam";
         let m5 = new SubMenu("苍石大事记");
         m5.href = "#/CyanStoneEvent";
         this.menus.push(m1);
         this.menus.push(m2);
         this.menus.push(m3);
         this.menus.push(m4);
         this.menus.push(m5);
     }
}