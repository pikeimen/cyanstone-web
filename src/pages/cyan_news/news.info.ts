import {Component, OnInit} from '@angular/core';
import {HdComponent} from '../../layout/header/header.component';
import {FtComponent} from '../../layout/footer/footer.component';
import { CyanstoneService } from '../../service/cyanstone.service';
import {Router,ActivatedRoute } from '@angular/router';
import FilePipe from '../customer_service/pipe/file.pipe';
import datePipe from '../../component/pipe/date.pipe';

@Component({
	selector: 'news',
    templateUrl: './tpl/news.info.html',
    directives:[HdComponent,FtComponent],
     pipes:[FilePipe,datePipe],
    styleUrls:['../../assets/css/cyan_news/news.info.css']
})
export class NewsInfoComponent implements OnInit{
    /**导航 */
     navBar:any={
         prevText:'',
         prevUrl:'',
         currentTitle:'',
         item:''
     }
     /**当前信息 */
     nowNewsInfo:any = {};
     /**上一条信息 */
     preNewsInfo:any = {};
     /**下一条信息 */
     nextNewsInfo:any = {};
       //弹框
    alertObject:any={
          hidden:true,
          message:'下载成功'
    };
    //加载zhong
    loading:boolean = true;
    
     constructor( private cyanService:CyanstoneService, private _router: ActivatedRoute, private router: Router ){}

     ngOnInit() {

         /**分享 */
        window["_bd_share_config"] = {
            "common": {
                "bdSnsKey":{},
                "bdText":"",
                "bdMini":"1",
                "bdMiniList":false,
                "bdPic":"",
                "bdStyle":"0",
                "bdSize":"16"
            },
            "share":{}
        };
        
         let fileref = document.createElement('script');
         fileref.setAttribute("id","bd_shareJs");
         fileref.setAttribute("type","text/javascript");
         fileref.setAttribute("src","http://bdimg.share.baidu.com/static/api/js/share.js?v="+ new Date().getTime() +"&cdnversion=" + ~(-new Date()/36e5) );
         document.head.appendChild(fileref);

         this._router.params.subscribe(params => {
            let key = params['key']; 
            let item = key.split("_")[0];
            this.navBar.item = item;
            let id = key.split("_")[1];
            switch (item) {
                case '0':
                    this.navBar.prevText = "苍石视点";
                    this.navBar.prevUrl = "#/news/B2";
                    break;
            
                case '1':
                    this.navBar.prevText = "媒体报道";
                    this.navBar.prevUrl = "#/news/B3";
                    break;
                case '2':
                     this.navBar.prevText = "行业动态";
                    this.navBar.prevUrl = "#/news/B4";
                    break;    
                case '3':
                     this.navBar.prevText = "法律法规";
                    this.navBar.prevUrl = "#/news/B5";
                    break;
            }
            this.cyanService.newsInfo(id,(data:any)=>{
                if(data){
                    this.nowNewsInfo = data.nowNewsInfo;
                    this.navBar.currentTitle = data.nowNewsInfo.title;
                    this.preNewsInfo = data.preNewsInfo;
                    this.nextNewsInfo = data.nextNewsInfo;
                    this.loading = false;
                }
            });
         });
      
     }
     /**上一条资讯 */
     prevNews(){
         if(this.preNewsInfo){
             let id = this.preNewsInfo.id;
             let key = this.navBar.item + "_" + id;
            this.router.navigate(['newsInfo', key]);
         }
     }
     /**下一条资讯 */
     nextNews(){
         if(this.nextNewsInfo){
             let id = this.nextNewsInfo.id;
             let key = this.navBar.item + "_" + id;
            this.router.navigate(['newsInfo', key]);
         }
     }
     /**下载 */
    downloadFile(index:number){
        let obj = this.nowNewsInfo.newsFiles[index];
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