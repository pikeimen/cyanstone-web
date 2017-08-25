 import {Pipe} from '@angular/core';
 import { CyanstoneService } from '../../../service/cyanstone.service';
 var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');

 @Pipe({name: 'productChart'})
 export default class ProductChart {
     constructor(private cyanService:CyanstoneService){}
     transform(i:string, args:string,args2:string) {    
        let id : any="chart_"+i;
        let code :any = "";
        let ownFlag:any = 0;
        if(args){
            code = args;
            ownFlag = args2;
        }
        if(ownFlag == '0'){
            this.cyanService.searchChart(code,'1',(data:any)=>{
                let xAxis:any = [];
                let items:any = [];
                if(data){
                    xAxis = data.xAxis;
                    if(data.items && data.items[0]){
                        items = data.items[0].data;
                    }
                }
                setTimeout(()=>{
                    this.outChart(id,xAxis,items);
                },500);
            });
        }else if(ownFlag == '1'){
            //  setTimeout(()=>{
            //         this.outChart(id,[],[]);
            //  },500);
        }
     }
      /**图标输出 */
    outChart(id:string,xAxis:any,data:any){
         var myChart = echarts.init(document.getElementById(id));
             //         // 绘制图表
            myChart.setOption({
                
                tooltip : {
                    trigger: 'axis',
                    backgroundColor:'#ff8813',
                    axisPointer:{
                        lineStyle:{
                            color:'#e9f4ff'
                        }
                    },
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
 }