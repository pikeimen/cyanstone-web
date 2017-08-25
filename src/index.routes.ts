import { Routes,RouterModule }  from '@angular/router';

import { StoneComponent } from './pages/stone/stone.component';
import { CyanStoneEventComponent } from './pages/about_us/cyanStoneEvent.component';
import { CyanServiceComponent } from './pages/customer_service/cyanService.component';
import { manageTeamComponent } from './pages/about_us/manageTeam.component';
import { chairmanWordComponent } from './pages/about_us/chairmanWord.component';
import { businessServiceComponent } from './pages/about_us/businessService.component';
import { companyIntroComponent } from './pages/about_us/companyIntro.component';
import { QuestionComponent } from './pages/customer_service/question.component';
import { contactUsComponent } from './pages/customer_service/contactUS.component';
import { loginComponent } from './pages/user/login.component';
import { DownloadComponent } from './pages/customer_service/download.component';
import { page404Component } from './pages/error_page/404.component';
import { riskTestComponent } from './pages/risk_assessment/riskTest.component';
import { DisclaimerComponent } from './pages/risk_assessment/disclaimer.component';
import { registerComponent } from './pages/user/register.component';
import { RiskResultComponent } from './pages/risk_assessment/riskResult.component';
import { ProductComponent } from './pages/product/product.list';
import { ProductDetailComponent } from './pages/product/product.detail';
import { modifyPwdComponent } from './pages/user/modifyPwd.component';
import { findPwdStep1Component } from './pages/user/findPwdStep1.component';
import { findPwdStep2Component } from './pages/user/findPwdStep2.component';
import { findPwdStep3Component } from './pages/user/findPwdStep3.component';
import { registerSuccessComponent } from './pages/user/registerSuccess.component';
import { modifyPwdSuccessComponent } from './pages/user/modifyPwdSuccess.component';
import { webAgreementComponent } from './pages/user/webAgreement.component';



 export const routes: Routes = [
   {
    path: '',
    redirectTo: '/stone',
    pathMatch: 'full'
  },
   {
    path: 'stone',
    component: StoneComponent
   },
   //苍石大事记
   {
    path: 'CyanStoneEvent',
    component: CyanStoneEventComponent
   },
   //苍石服务
   {
     path:'cyanService',
     component:CyanServiceComponent
   },
   //常见问题
   {
     path:'question',
     component:QuestionComponent
   },
     //联系我们
   {
     path:'contactUs',
     component:contactUsComponent
   },
      //下载中心
   {
     path:'download',
     component:DownloadComponent
   },
   //关于我们 ---> 管理团队
   {
    path: 'manageTeam',
    component: manageTeamComponent
   },
   //关于我们 ---> 董事长致辞
   {
    path: 'chairmanWord',
    component: chairmanWordComponent
   },
   //关于我们 ---> 业务范围
   {
    path: 'businessService',
    component: businessServiceComponent
   },
   //关于我们 ---> 公司简介
   {
    path: 'companyIntro',
    component: companyIntroComponent
   },
   //登录
   {
    path: 'login',
    component: loginComponent
   },
   //404
   {
     path:'404',
     component:page404Component
   },
   //风险评估
   {
     path:'riskTest',
     component:riskTestComponent
   },
   //免责说明
   {
     path:'disclaimer',
     component:DisclaimerComponent
   },
   //注册
   {
     path:'register',
     component:registerComponent
   },
   //风险评估结果
   {
     path:'riskResult/:key',
     component:RiskResultComponent
   },
   //产品
   {
     path:'product',
     component:ProductComponent
   },
   //产品详情
   {
     path:'productDetail/:code',
     component:ProductDetailComponent
   },
   //修改密码
   {
     path:'modifyPwd',
     component:modifyPwdComponent
   },
   //找回密码：第一步
   {
     path:'findPwdStep1',
     component:findPwdStep1Component
   },
   //找回密码：第二步
   {
     path:'findPwdStep2/:mobile',
     component:findPwdStep2Component
   },
   //找回密码：第三步
   {
     path:'findPwdStep3',
     component:findPwdStep3Component
   },
   //注册成功页
   {
     path:'registerSuccess',
     component:registerSuccessComponent
   },
   //修改密码成功页
   {
     path:'modifyPwdSuccess',
     component:modifyPwdSuccessComponent
   },
   //网站服务协议
   {
     path:'webAgreement',
     component:webAgreementComponent
   }


];
