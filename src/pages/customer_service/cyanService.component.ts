import {Component, OnInit} from '@angular/core';
import {HdComponent} from '../../layout/header/header.component';
import {FtComponent} from '../../layout/footer/footer.component';
import {SubMenuComponent} from '../../component/subMenu.component';
import {SubMenu} from '../../model/SubMenu';

@Component({
	selector: 'cyanService',
    templateUrl: './tpl/cyanService.tpl.html',
    directives:[HdComponent,FtComponent,SubMenuComponent],
    styleUrls:['../../assets/css/customer_service/customer.service.css']
})
export class CyanServiceComponent implements OnInit{
     menus : SubMenu[];
     ngOnInit() {
        this.menus = [];
       let sub = new SubMenu("苍石服务");
        sub.href = "#/cyanService";
        this.menus.push(sub);
         /*sub = new SubMenu("下载中心");
        sub.href = "#/download";
        this.menus.push(sub);*/
        sub = new SubMenu("常见问题");
        sub.href = "#/question";
        this.menus.push(sub);
         sub = new SubMenu("联系我们");
        sub.href = "#/contactUs";
        this.menus.push(sub); 
        
     }
    
}