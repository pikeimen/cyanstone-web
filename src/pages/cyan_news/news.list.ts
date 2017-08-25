import {Component, OnInit} from '@angular/core';
import {HdComponent} from '../../layout/header/header.component';
import {FtComponent} from '../../layout/footer/footer.component';
import {SubMenuComponent} from '../../component/subMenu.component';
import {SubMenu} from '../../model/SubMenu';
import { CyanstoneService } from '../../service/cyanstone.service';
import {PageNumComponent} from '../../component/pageNum.component';
import {Router,ActivatedRoute } from '@angular/router';
import imgUrlPipe from './pipe/imgUrl.pipe';
import digestPipe from './pipe/digest.pipe'
import datePipe from '../../component/pipe/date.pipe';

@Component({
	selector: 'news',
    templateUrl: './tpl/news.list.html',
    directives:[HdComponent,FtComponent,SubMenuComponent,PageNumComponent],
     pipes:[imgUrlPipe,digestPipe,datePipe],
    styleUrls:['../../assets/css/cyan_news/news.list.css']
})
export class NewsComponent implements OnInit{
     menus : SubMenu[];
     /**二级菜单 active */
     activeItem:string = '0';
      //页数
     totalPage:number=1;
     //当前页
     currentPage:number=1;
     //资讯列表
     currentList:any = [];
     //布局
     layout:number = 1;
     //一页条数
     pageSize:number = 10;
     
     
     constructor(private cyanService:CyanstoneService,
        private _router: ActivatedRoute,
        private router: Router ){}
     ngOnInit() {

         //如果已经加载了share.js，则移除（在 详情页会重新加载）
        var thisNode = document.getElementById("bd_shareJs");
        if(thisNode) {
            thisNode.parentNode.removeChild(thisNode);
            window["_bd_share_config"] = null;
            window["_bd_share_is_recently_loaded"] = null;
            window["_bd_share_main"] = null;
        }

        this.menus = [];
        let sub = new SubMenu("苍石视点");
        sub.href = "#/news/B2";
        this.menus.push(sub);
         sub = new SubMenu("媒体报道");
        sub.href = "#/news/B3";
        this.menus.push(sub);
        sub = new SubMenu("行业动态");
        sub.href = "#/news/B4";
        this.menus.push(sub);
         sub = new SubMenu("法律法规");
        sub.href = "#/news/B5";
        this.menus.push(sub); 
         this._router.params.subscribe(params => {
            let type = params['type'];
            let num = type.replace('B','');
            num = Number(num)-2;
            this.activeItem = num;
            if(type == "B5"){
                this.pageSize = 9;
                this.layout = 2;
            }else{
                   this.pageSize = 10;
                this.layout = 1;
            }
            this.cyanService.newsList(type,1,this.pageSize,(data:any)=>{
                if(data){
                     this.currentList = data.items;
                     this.totalPage = data.totalPage;
                     this.currentPage = data.currentIndex;
                }
               
            });
            
         });
      
     }
     /**翻页 */
    selectPage(e:any){
        let current = e.current;
        let num = Number(this.activeItem) + 2;
        let type = "B"+num;
        this.cyanService.newsList(type,current,this.pageSize,(data:any)=>{
                if(data){
                     this.currentList = data.items;
                     this.totalPage = data.totalPage;
                     this.currentPage = data.currentIndex;
                }
               
            });              
    }
    /**详情 */
    goToInfo(index:number){
        let obj = this.currentList[index];
        let id = obj.id;
        let key = this.activeItem + "_" + id;
        this.router.navigate(['newsInfo', key]);
    }
    
}