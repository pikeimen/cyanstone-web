import {Component, OnInit} from '@angular/core';
import {HdComponent} from '../../layout/header/header.component';
import {FtComponent} from '../../layout/footer/footer.component';
import {NgIf,NgFor,NgStyle,NgClass} from '@angular/common';
import { CyanstoneService } from '../../service/cyanstone.service';
import {Router} from '@angular/router';
import {PageNumComponent} from '../../component/pageNum.component';
import numberPipe from '../../component/pipe/number.pipe';
import ProductChart from './pipe/productChart.pipe';
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
@Component({
	selector: 'product',
    templateUrl: './tpl/product.tpl.html',
    directives:[HdComponent,FtComponent,NgFor,PageNumComponent],
    pipes:[ProductChart,numberPipe],
    styleUrls:['../../assets/css/product/product.list.css']
})
export class ProductComponent implements OnInit{
    //是否显示产品列表
    showProduct:boolean = false;
    //产品列表展现形式1:图表列表；2：方块列表；3：没有产品;4:加载
    productListType:string = '4';
    //弹框
    alertObject:any={
          hidden:true
    };
    //产品类型
    productTags:any=[];
    //当前选中的产品类型
    currentTag:string="0";
    //当前页产品列表
    productList:any = [];
    //所有产品列表
    products:any = [];
    //页数
    totalPage:number=1;
    //当前页
    currentPage:number=1;
    //图标列表中月份的选择
    chartList:any = {
        'chart_0':'1',
        'chart_1':'1',
        'chart_2':'1',
        'chart_3':'1',
        'chart_4':'1',
        'chart_5':'1',
        'chart_6':'1',
        'chart_7':'1',
        'chart_8':'1',
        'chart_9':'1',
        'chart_10':'1',
        'chart_11':'1'
    }
    
    constructor(private cyanService:CyanstoneService, private _router: Router){}
    ngOnInit() {
        /***用户是否有风险评估结果 */
        this.cyanService.searchRiskInfo((data:any)=>{
            if(!data){
                 this.alertObject={
                    tit:1,
                    message:"根据国家相关规定 查看产品前需先做风险评估",
                    hidden:false,
                    okText:'开始评估'
                }
            }else{
                 this.showProduct = true;        
                this.searchTag();
                this.searchProduct('',false);
            }
        },(error:any)=>{
            if(error.status == 403){
                 this.alertObject={
                    tit:2,
                    message:"请先登录",
                    hidden:false
                }
            }else{
                 this._router.navigate(['404']);
            }
        });
       
       
    }
    /**产品类型查询 */
    searchTag(){
        this.cyanService.searchTags((data:any)=>{
            if(data){
                this.productTags = data;
            }
        });
    }
    /**产品过滤 */
    filterProduct(tag:any){
        if(this.currentTag != tag){
             this.currentTag = tag;
             this.searchProduct(tag,true);
        }
       
    }
    /**净值曲线图 */
    searchChart(i:string,month:string,event:any){
        let e=(event)?event:window.event;
        if (window.event) {//浏览器兼容
            e.cancelBubble=true;
        } else {
            e.stopPropagation();
        }
        let m = this.chartList["chart_"+i];
        if(m == month) return;
        this.chartList["chart_"+i] = month;
        let code = this.products[i].productCode;
        let ownFlag = this.products[i].ownFlag;
        if(ownFlag == "1"){
            return;
        }
        let id = "chart_"+i;
        this.cyanService.searchChart(code,month,(data:any)=>{
           let xAxis:any = [];
           let items:any = [];
           if(data){
               xAxis = data.xAxis;
               if(data.items && data.items[0]){
                   items = data.items[0].data;
               }
           }
           this.outChart(id,xAxis,items);
       })
    }
    /**产品查询 */
    searchProduct(tag:any,flag:boolean){
        this.cyanService.searchProducts(tag,(data:any)=>{
            if(data){
                let totalNumber = data.totalNumber;
                let items = data.items;
                if(flag){
                      this.productListType = '2';
                      this.products = items;
                      this.productList = this.getCurrentPage(1,12,items);
                       //计算总页数
                        this.currentPage = 1;
                        let size:number = items.length;
                        let total = size/12;
                        total =  parseInt(total.toString());
                        if(size%12 != 0){
                            total++;
                        }
                        this.totalPage = total;
                      return;
                }
                if(totalNumber == 0){
                    this.productListType = '3';
                }else if(totalNumber <= 12){
                    this.productListType = '1';
                     this.products = items;
                    this.productList = items;
                }else{
                    this.productListType = '2';
                    this.products = items;
                    this.productList = this.getCurrentPage(1,12,items);
                    //计算总页数
                    let size:number = items.length;
                    let total = size/12;
                    total =  parseInt(total.toString());
                    if(size%12 != 0){
                        total++;
                    }
                    this.totalPage = total;
                   
                }
               
            }
           
        },(error:any)=>{
            
        })
    }
    /**产品翻页 */
    getCurrentPage(current:number,pageSize:number,items:any){
        let a = (current -1) * pageSize;
        let b = (current * pageSize) ;
        
        return items.slice(a,b);
    }
    /**产品详情 */
    goToDetail(i:string){
        let num = (this.currentPage - 1) * 12 + i;
        let code = this.products[num].productCode;
        this._router.navigate(['productDetail', code]);
    }
    /**翻页 */
    selectPage(e:any){
        let current = e.current;
        this.currentPage = current;
        this.productList = this.getCurrentPage(current,12,this.products);
    }
    /**图表当前的选择 */
    chartClass(i:string,month:string){
        let m = this.chartList["chart_"+i]; 
        if(m == month){
            return true;
        }
        return false;
    }
    /**图表输出 */
    outChart(id:string,xAxis:any,data:any){
         var myChart = echarts.init(document.getElementById(id));
             //         // 绘制图表
            myChart.setOption({
                
                tooltip : {
                    trigger: 'axis',
                    backgroundColor:'#ff8813',
                    formatter:(param:any)=>{
                        if(param){
                            let object = param[0];
                            if(!object) return "";
                            let name = object.name;
                             if(!name) name = "";
                            let value = object.value;
                            if(!value) value = "";
                            let html = "单位净值："+value+"元</br>时间："+name;
                            return html;
                        }
                    }
                },
                color:['#87b5e3'],
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
                        splitLine:{
                            show:true,
                            lineStyle:{
                                type:'dashed',
                                color:'#dddddd'
                            }
                        },
                        data : xAxis,
                        axisLine:{
                            
                            lineStyle:{
                                color:'#848484'
                            }
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLine:{
                            lineStyle:{
                                color:'#848484'
                            }
                            
                        },
                        splitLine:{
                            show:true,
                            lineStyle:{
                                type:'dashed',
                                color:'#dddddd'
                            }
                        }
                    }
                ],
                series : [
                    {
                        type:'line',
                        areaStyle: {normal: {
                            color:'#e9f4ff'
                        }},
                        data:data
                    }
                ]
            });
    }
    /**弹出框确认回调 */
    alertCallback(){
        let tit = this.alertObject.tit;
        if(tit == 1){
             this._router.navigate(['riskTest']);
        }else if(tit == 2){
             this._router.navigate(['login']);
        }
    }
}