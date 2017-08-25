import {Component, OnInit} from '@angular/core';
import {HdComponent} from '../../layout/header/header.component';
import {FtComponent} from '../../layout/footer/footer.component';
import {SubMenuComponent} from '../../component/subMenu.component';
import {SubMenu} from '../../model/SubMenu';
// import {BaiduMap, OfflineOptions, ControlAnchor,NavigationControlType } from 'angular2-baidu-map';

@Component({
	selector: 'contactUsComponent',
    templateUrl: './tpl/contactUs.tpl.html',
    directives:[HdComponent,FtComponent,SubMenuComponent],
  
    styleUrls:['../../assets/css/customer_service/contact.us.css']
})
export class contactUsComponent implements OnInit{
     menus : SubMenu[];
      opts: any;
    // offlineOpts: OfflineOptions;
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
        
        //  this.opts = {
        //     center: {
        //         longitude: 121.506191,
        //         latitude: 31.245554
        //     },
        //     zoom: 17,
        //     markers: [{
        //         longitude: 121.506191,
        //         latitude: 31.245554,
        //         title: 'Where',
        //         content: 'Put description here'
        //     }],
        //     geolocationCtrl: {
        //         anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_RIGHT
        //     },
        //     scaleCtrl: {
        //         anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_LEFT
        //     },
        //     overviewCtrl: {
        //         isOpen: true
        //     },
        //     navCtrl: {
        //         type: NavigationControlType.BMAP_NAVIGATION_CONTROL_LARGE
        //     }
        //  };
        //    this.offlineOpts = {
        //     retryInterval: 5000,
        //     txt: 'NO-NETWORK'
        // };
     }
    //  loadMap(map: any) {
    //     console.log('map instance here', map);
    // }

    // clickMarker(marker: any){
    //     console.log('The clicked marker is', marker);
    // }
}