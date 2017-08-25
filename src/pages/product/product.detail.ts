import {Component, OnInit} from '@angular/core';
import {FtComponent} from '../../layout/footer/footer.component';
import {HdComponent} from '../../layout/header/header.component';
import {Router,ActivatedRoute } from '@angular/router';
import { CyanstoneService } from '../../service/cyanstone.service';
import {ValidationService} from '../../service/validation.service';
import {PageNumComponent} from '../../component/pageNum.component';
import FilePipe from '../customer_service/pipe/file.pipe';
import datePipe from '../../component/pipe/date.pipe';
import numberPipe from '../../component/pipe/number.pipe';
import {REACTIVE_FORM_DIRECTIVES,FormBuilder, FormGroup,Validators } from '@angular/forms';
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');

@Component({
	selector: 'product-detail',
    templateUrl: './tpl/productDetail.tpl.html',
    directives:[HdComponent,FtComponent,REACTIVE_FORM_DIRECTIVES,PageNumComponent],
    pipes:[FilePipe,datePipe,numberPipe],
    styleUrls:['../../assets/css/product/product.detail.css']
})
export class ProductDetailComponent implements OnInit{
    //弹框
    alertObject:any={
          hidden:true
    };
    //请求参数
    params : any = {
        mobile : '',     //手机号
        name : ''
    }
    //校验
     f : any;
    //点击了提交按钮
    touched : boolean = false;
    //产品xiangqing
    productInfo:any = {};
    //tab切换
    currentNav:number = 1;
     //页数
    totalPage:number=1;
    //当前页
    currentPage:number=1;
    //相关公告
    currentNotice:number=1;
    //图表数据
    chartObject:any={xAxis:[],data:[]};
    //净值列表
    netValueList:any=[];
    //产品收益率
    yieldObject:any = {hs300:{},fundYield:{}};
    //公告列表
    noticeList:any = [];
    //当前公告详情
    currentNoticeInfo:any={};
    //产品详情页
    pInfo:boolean = true;
    //预约结果
    yuyueObj:any = {};
    //是否已购买
    ownFlag:string = "0";
    constructor(
        private formBuilder: FormBuilder,
        private cyanstoneService:CyanstoneService,
        private _router: ActivatedRoute,
        private router: Router ){
           this.f = this.formBuilder.group({
             'mobile': ['', [Validators.required, ValidationService.mobileValidator]],
             'name': ['', [Validators.required]]
           
            });
        }
    ngOnInit() {
     this._router.params.subscribe(params => {
            let code = params['code']; 
           this.cyanstoneService.searchProductInfo(code,(data:any)=>{
                  this.productInfo = data;
                  this.ownFlag = data.ownFlag;
                   if(data.purchaseRate){
                       this.productInfo.purchaseRate = data.purchaseRate + "%";
                   }else{
                       this.productInfo.purchaseRate = "-";
                   }
                   if(data.redemptionRate){
                       this.productInfo.redemptionRate = "封闭期满后赎回费率为"+data.redemptionRate + "%";
                   }else{
                       this.productInfo.redemptionRate = "-";
                   }
                   if(data.manageRate){
                       this.productInfo.manageRate = data.manageRate + "%";
                   }else{
                       this.productInfo.manageRate = "-";
                   }
                   if(data.trusteeRate){
                       this.productInfo.trusteeRate = data.trusteeRate + "%";
                   }else{
                       this.productInfo.trusteeRate = "-";
                   }
                    if(!data.rewardDesc){
                       this.productInfo.rewardDesc = "-";
                   }
           },(error:any)=>{
                if(error.status == 403){
                 this.alertObject={
                    tit:2,
                    message:"请先登入",
                    hidden:false
                }
            }else{
                 this.router.navigate(['404']);
            }
           });
           if(this.ownFlag == "0"){
           /**净值曲线图 */
           this.cyanstoneService.searchChart(code,'',(data:any)=>{
                let xAxis:any = [];
                let items:any = [];
                if(data){
                    xAxis = data.xAxis;
                    this.chartObject.xAxis = xAxis;
                    if(data.items && data.items[0]){
                        items = data.items[0].data;
                        this.chartObject.data = items;
                    }
                   
                }
                
            });
           }
           /***产品净值列表 */ 
           this.cyanstoneService.netValue(code,(data:any)=>{
              if(data){
                  this.netValueList = data;
              } 
           });
           /***产品收益率 */
           this.cyanstoneService.searchYield(code,(data:any)=>{
               if(data){
                  if(data.hs300){
                       this.yieldObject.hs300 = data.hs300;
                  }
                  if(data.fundYield){
                       this.yieldObject.fundYield = data.fundYield;
                  }
               }
           });
           /**产品公告列表 */
           this.cyanstoneService.noticeList(code,1,10,(data:any)=>{
              if(data){
                  if(data.totalPage != 0){
                       this.totalPage = data.totalPage;
                  }
                 
                  this.noticeList = data.items;
              } 
           });
      });
    }
    //提交预约
    submit(){
         this.touched = true;
         if (this.f.dirty && this.f.valid) {
            console.log("表单校验通过");
            let productCode = this.productInfo.productCode;
            this.cyanstoneService.isBook(productCode,(data:any)=>{
               if(data){
                   if(data.check){
                       this.alertObject = {
                           hidden:false,
                           title:'提示',
                           message:'您今天已经预约过本产品了哟。投资顾问会尽快与您取得联系。<br> 感谢您对苍石资产的支持！'
                       }
                   }else{
                       let productName = this.productInfo.productName;
                       
                       this.cyanstoneService.bookProduct(this.params.name,this.params.mobile,productCode,productName,(data:any)=>{
                            this.yuyueObj.name = this.params.name;
                            let mobile = this.params.mobile;
                            mobile = mobile.substring(0,3) + "****" + mobile.substring(7,11);
                            this.yuyueObj.mobile = mobile;
                            this.yuyueObj.tagName = this.productInfo.tagName;
                            this.yuyueObj.pName = this.productInfo.productName;
                            this.pInfo = false;
                       },(error:any)=>{
                           
                       })
                   }
               } 
            });
        }
    }
    /**切换 */
    changeNav(num:number){
        if(this.currentNav != num){
            this.currentNav = num;
            if(num == 2 && this.ownFlag == "0"){
                 setTimeout(()=>{
                this.outChart("product-chart",this.chartObject.xAxis,this.chartObject.data);
                },500)
            }
           
        }
         if(num == 4){
                this.currentNotice = 1;
         }
    }
      /**翻页 */
    selectPage(e:any){
        let current = e.current;
        /**产品公告列表 */
           this.cyanstoneService.noticeList(this.productInfo.productCode,current,10,(data:any)=>{
              this.currentPage = current;
              if(data){
                  this.noticeList = data.items;
              } 
           });
    }
    /**公告详情 */
    goToNoticeInfo(index:number){
        let ele : HTMLElement = <HTMLElement> document.querySelector("#notice-content");
        let id = this.noticeList[index].id;
        this.cyanstoneService.noticeInfo(id,(data:any)=>{
           this.currentNoticeInfo = data; 
           this.currentNotice = 2;
           ele.innerHTML = data.content;
        });
    }
    /**继续预约 */
    goToDetail(){
        this.params = {
            name:'',
            mobile:''
        }
        this.pInfo = true;
    }
     /**图表输出 */
    outChart(id:string,xAxis:any,data:any){
         var myChart = echarts.init(document.getElementById(id));
             //         // 绘制图表
            myChart.setOption({
                
                tooltip : {
                    trigger: 'axis',
                    textStyle:{
                        color:'#333333'
                    },
                    backgroundColor:"#fff",
                    axisPointer:{
                        lineStyle:{
                            color:'#ddd'
                        }
                    },
                    extraCssText:'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
                    formatter:(param:any)=>{
                        if(param){
                            let object = param[0];
                            if(!object) return "";
                            let name = object.name;
                            if(!name) name = "";
                            let value = object.value;
                            if(!value) value = "";
                            let html = "时间："+name+"</br>单位净值：<font color='#ff6600'>"+value+"</font>";
                            return html;
                        }
                    }
                },
                color:['#ff6600'],
                 grid: {
                    left: '3%',
                    right: '6%',
                    bottom: '30',
                    top:'30',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                         data : xAxis,
                        axisLine:{
                            
                            lineStyle:{
                                color:'#bad6de'
                            }
                        },
                        axisLabel:{
                            textStyle:{
                                color:'#333'
                            }
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLine:{
                            lineStyle:{
                                color:'#bad6de'
                            }
                            
                        },
                        axisLabel:{
                            textStyle:{
                                color:'#333'
                            }
                        }
                    }
                ],
                series : [
                    {
                        type:'line',
                        
                        data:data
                    }
                ]
            });
    }
     /**弹出框确认回调 */
    alertCallback(){
        let tit = this.alertObject.tit;
        if(tit == 1){
           
        }else if(tit == 2){
             this.router.navigate(['login']);
        }
    }
    /**下载 */
    downloadAccount(id:number){
        //在新窗口打开 下载地址
        window.open(this.cyanstoneService.CS_doloadUrl+"?id="+id)
    }
}