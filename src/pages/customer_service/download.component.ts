import {Component, OnInit} from '@angular/core';
import {HdComponent} from '../../layout/header/header.component';
import {FtComponent} from '../../layout/footer/footer.component';
import {SubMenuComponent} from '../../component/subMenu.component';
import {SubMenu} from '../../model/SubMenu';
import { CyanstoneService } from '../../service/cyanstone.service';
import FilePipe from './pipe/file.pipe';
@Component({
	selector: 'download',
    templateUrl: './tpl/download.tpl.html',
    directives:[HdComponent,FtComponent,SubMenuComponent],
    pipes:[FilePipe],
    styleUrls:['../../assets/css/customer_service/download.css']
})
export class DownloadComponent implements OnInit{
     menus : SubMenu[];
     accountList : any = [];
     tradeList : any = [];
      //弹框
    alertObject:any={
          hidden:true,
          message:'下载成功'
    };
     constructor(private cyanService:CyanstoneService){}
     ngOnInit() {
        this.menus = [];
        let sub = new SubMenu("苍石服务");
        sub.href = "#/cyanService";
        this.menus.push(sub);
         sub = new SubMenu("下载中心");
        sub.href = "#/download";
        this.menus.push(sub);
        sub = new SubMenu("常见问题");
        sub.href = "#/question";
        this.menus.push(sub);
         sub = new SubMenu("联系我们");
        sub.href = "#/contactUs";
        this.menus.push(sub); 
        
        this.cyanService.downloadList('account',(data:any)=>{
            this.accountList = data.items
        });
         this.cyanService.downloadList('trade',(data:any)=>{
            this.tradeList = data.items
        });
     }
      /**下载 */
    downloadAccount(index:number){
        let obj = this.accountList[index];
        let id = obj.id;
        //在新窗口打开 下载地址
        window.open(this.cyanService.CS_doloadUrl+"?id="+id)
        /*this.cyanService.download(id,(data:any)=>{
            this.alertObject.hidden = false;
        },()=>{
            this.alertObject={
                hidden:false,
                message:'下载失败'
             };
        });*/
    }
    downloadTrade(index:number){
         let obj = this.tradeList[index];
        let id = obj.id;
        //在新窗口打开 下载地址
        window.open(this.cyanService.CS_doloadUrl+"?id="+id)
        /*this.cyanService.download(id,(data:any)=>{
              this.alertObject.hidden = false;
        },()=>{
            this.alertObject={
                hidden:false,
                message:'下载失败'
             };
        });*/
    }
}