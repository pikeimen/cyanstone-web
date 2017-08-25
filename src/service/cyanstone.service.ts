import { Injectable,Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {Router} from '@angular/router';
@Injectable()
export class CyanstoneService {
     
     host: any = location.origin + '/cyanstone/';

     imageURL = '/cyanstone/pic/';
     
     bgURL = "/cyan/";
     
     //客户服务-下载中心-下载url
     CS_doloadUrl = this.host + "http/download/download.action";

     constructor(@Inject(Http) private http:Http, private _router: Router) { }
     
     /*************客户服务-下载中心 ******************/
     downloadList(type:string,successCallback:any){
         let action = this.host + "http/download/queryDownloadList.action";
         this.post(action,{'fileType':type,'pageSize':50},successCallback);
     }
      /*************下载******************/
     download(id:string,successCallback:any,errorCallback:any){
         let action = this.host + "http/download/download.action";
         this.post(action,{id:id},successCallback,errorCallback);
     }
     /**************风险评估*****提交分数**************************/
     submitRiskScore(score:string,successCallback:any){
         let action = this.host + "http/risk/userRisk.action";
         this.post(action,{score:score},successCallback);
     }
     
      /** 保守型+没有产品
       key:'bsn'       
     //保守型+产品
       key:'bsp'      
     //稳健型+没有产品
        key:'wjn'     
     //稳健型+产品
        key:'wjp'     
     //平衡型+没有产品
        key:'phn'     
     //平衡型+产品
        key:'php'     
     //成长型+没有产品
        key:'czn'     
     //成长型+产品
        key:'czp'     
     //进取型+没有产品
        key:'jqn'     
     //进取型+产品
         key:'jqp'
     **/
      riskResultKey(type:string,data:any){
          if(type == "set"){
              let existFund = data.existFund;
              let level = data.level;
              if(existFund){
                  switch(level){
                      case '1':return 'bsp';
                      case '2':return 'wjp';
                      case '3':return 'php';
                      case '4':return 'czp';
                      case '5':return 'jpp';
                  }
              }else{
                   switch(level){
                      case '1':return 'bsn';
                      case '2':return 'wjn';
                      case '3':return 'phn';
                      case '4':return 'czn';
                      case '5':return 'jpn';
                  }
              }
          }else if(type == "get"){
              let obj:any = {};
              let flag = data.substring(2,3);
              let _type = data.substring(0,2);
              if(flag == "p"){
                  obj.existFund = true;
                   switch(_type){
                      case 'bs':
                      obj.level = "1";
                      obj.levelName = "保守型";
                      break;
                      case 'wj':
                       obj.level = "2";
                      obj.levelName = "稳健型";
                      break;
                      case 'ph':
                       obj.level = "3";
                      obj.levelName = "平衡型";
                      break;
                      case 'cz':
                       obj.level = "4";
                      obj.levelName = "成长型";
                      break;
                      case 'jp':
                      obj.level = "5";
                      obj.levelName = "进取型";
                      break;
                  }
              }else if(flag == "n"){
                   obj.existFund = false;
                    switch(_type){
                      case 'bs':
                      obj.level = "1";
                      obj.levelName = "保守型";
                      break;
                      case 'wj':
                       obj.level = "2";
                      obj.levelName = "稳健型";
                      break;
                      case 'ph':
                       obj.level = "3";
                      obj.levelName = "平衡型";
                      break;
                      case 'cz':
                       obj.level = "4";
                      obj.levelName = "成长型";
                      break;
                      case 'jp':
                      obj.level = "5";
                      obj.levelName = "进取型";
                      break;
                  }
              }
              
              return obj;
          }
      }
     /***	获取用户风险评估信息 */
     searchRiskInfo(successCallback:any,errorCallback:any){
        let action = this.host + "http/risk/getUserRiskInfo.action";
        this.post(action,{},successCallback,errorCallback);    
     }
     
     /**************登录**************************/
     login(params:any,successCallback:any,errorCallback:any){
         let action = this.host + "http/login/userLogin.action";
         this.post(action,params,successCallback,errorCallback);
     }
     
     /**************注册**************************/
     register(params:any,successCallback:any,errorCallback:any){
         let action = this.host + "http/user/userRegister.action";
         this.post(action,params,successCallback,errorCallback);
     }
     
     /**************校验图形验证码**************************/
     checkImgCode(params:any,successCallback:any,errorCallback:any){
         let action = this.host + "http/img/checkImgCode.action";
         this.post(action,params,successCallback,errorCallback);
     }
     
     /**************获取短信验证码**************************/
     getMobileCode(params:any,successCallback:any,errorCallback:any){
         let action = this.host + "http/sms/getMobileCode.action";
         this.post(action,params,successCallback,errorCallback);
     }
     
     /**************校验（手机号/身份证）是否注册**************************/
     mobileAndIdNoCheck(params:any,successCallback:any,errorCallback:any){
         let action = this.host + "http/user/mobileAndIdNoCheck.action";
         this.post(action,params,successCallback,errorCallback);
     }

     /****************产品列表***************************** */
    searchProducts(tagCode:string,successCallback:any,errorCallback:any){
        let action = this.host + "http/fundInfo/queryFundInfoList.action";
        this.post(action,{tagCode:tagCode},successCallback,errorCallback);    
     } 
      /****************产品类型列表***************************** */
    searchTags(successCallback:any){
        let action = this.host + "http/fundInfo/queryFundTagList.action";
        this.post(action,{},successCallback);    
     } 
     
       /****************净值曲线图***************************** */
    searchChart(productCode:string,month:string,successCallback:any){
        let action = this.host + "http/fundInfo/queryFundNetValueEChart.action";
        this.post(action,{productCode:productCode,month:month},successCallback);    
     } 
     
     /*******************产品详情****************************** */
     searchProductInfo(productCode:string,successCallback:any,errorCallback:any){
         let action = this.host + "http/fundInfo/queryFundInfoDetail.action";
         this.post(action,{productCode:productCode},successCallback,errorCallback);    
     }
     /********************是否预约********************************* */
     isBook(productCode:string,successCallback:any){
         let action = this.host + "http/book/checkUserBookToday.action";
         this.post(action,{productCode:productCode},successCallback); 
     }
     /*********************预约产品************************************** */
     bookProduct(bookName:string,bookMobile:string,productCode:string,productName:string,successCallback:any,errorCallback:any){
         let action = this.host + "http/book/userBookProduct.action";
         this.post(action,{bookName:bookName,bookMobile:bookMobile,productCode:productCode,productName:productName},successCallback); 
     }
     /********************产品净值列表******************************************** */
     netValue(productCode:string,successCallback:any){
          let action = this.host + "http/fundInfo/queryFundNetValueList.action";
          this.post(action,{productCode:productCode},successCallback);
     }
     /*********************产品收益率******************************************************** */
     searchYield(productCode:string,successCallback:any){
         let action = this.host + "http/fundYield/queryfundYield.action";
         this.post(action,{productCode:productCode},successCallback);
     }
      /*********************产品公告列表******************************************************** */
    noticeList(productCode:string,pageIndex:number,pageSize:number,successCallback:any){
            let action = this.host + "http/fundNotice/queryFundNoticeList.action";
            this.post(action,{productCode:productCode,pageIndex:pageIndex,pageSize:pageSize},successCallback);
    }
     /*********************产品公告详情******************************************************** */
    noticeInfo(id:string,successCallback:any){
          let action = this.host + "http/fundNotice/queryFundNoticeDetail.action";
         this.post(action,{id:id},successCallback);
    }
     /*********************修改密码************************************** */
     userResetPwd(params:any,successCallback:any,errorCallback:any){
         let action = this.host + "http/user/userResetPwd.action";
         this.post(action,params,successCallback,errorCallback);
     }

     /*********************找回密码：第一步************************************** */
     callBackPwdStep1(params:any,successCallback:any,errorCallback:any){
         let action = this.host + "http/user/callBackPwdStep1.action";
         this.post(action,params,successCallback,errorCallback);
     }

     /*********************找回密码：第二步************************************** */
     callBackPwdStep2(params:any,successCallback:any,errorCallback:any){
         let action = this.host + "http/user/callBackPwdStep2.action";
         this.post(action,params,successCallback,errorCallback);
     }
    /*********************注销************************************** */
    logout(successCallback:any){
        let action = this.host + "http/login/userLogout.action";
         this.post(action,{},successCallback);
    }
    /***********************资讯列表********************************************* */
    newsList(type:string,pageIndex:number,pageSize:number,successCallback:any){
         let action = this.host + "http/newsInfo/queryNewsInfoList.action";
         this.post(action,{type:'A1',slaveType:type,pageIndex:pageIndex,pageSize:pageSize},successCallback);
    }
    /***********************资讯详情********************************************* */
    newsInfo(id:string,successCallback:any){
         let action = this.host + "http/newsInfo/queryNewsInfoDetail.action";
         this.post(action,{id:id},successCallback);
  
    }
    /***********************查询当前登录用户信息********************************************* */
    userInfo(successCallback:any,errorCallback:any){
         let action = this.host + "http/login/userInfo.action";
         this.post(action,{},successCallback,errorCallback);
  
    }

  //get方法
  get(url: string,params:any, successCallback: any, errorCallback?: any) {
    this.http.get(url,params)
      .map(response => response.json())
     .subscribe(
      data => {
          if(data){
              if(data.code == 0){
                 
                successCallback(data.data);
              }else{
                  if (errorCallback && typeof errorCallback == 'function') {
                      errorCallback({code:data.code,message:data.message});
                  }
              }
          }else{
              console.info("data is null");
              if (errorCallback && typeof errorCallback == 'function') {
                errorCallback();
              }
          }
      },
      error =>{
           console.info("访问失败");
          if (errorCallback && typeof errorCallback == 'function') {
            errorCallback(error);
           }
      });
  }

  //post方法
  post(url: string, params: any, successCallback: any, errorCallback?: any) {
    this.http.post(url,params)
    //.map(response => response.json())
     .subscribe(
      data => {  
          if(data){
              if(data["code"] == 0){
                successCallback(data["data"]);
              }else{
                  if (errorCallback && typeof errorCallback == 'function') {
                      if(data["data"]){
                          errorCallback({code:data["code"],message:data["message"],data:data["data"]});
                      }else{
                          errorCallback({code:data["code"],message:data["message"]});
                      }
                  }
              }
          }else{
              console.info("data is null");
              if (errorCallback && typeof errorCallback == 'function') {
                errorCallback();
              }
          }
      },
      error =>{
           console.info("访问失败");
           if(error){
               if(error.status != 403){
                   this._router.navigate(['404']);
               }else{
                   sessionStorage.removeItem("user_mobile");
               }
           }
          if (errorCallback && typeof errorCallback == 'function') {
            errorCallback(error);
           }
      });
  }
  
}