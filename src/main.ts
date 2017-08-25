///<reference path="./../typings/globals/es6-shim/index.d.ts"/>
import { BrowserModule }    from '@angular/platform-browser';
import { FormsModule }      from '@angular/forms';
import { HttpModule }       from '@angular/http';
import { platformBrowserDynamic }    from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import {HTTP_PROVIDERS, Http, Request, RequestOptionsArgs, Response, XHRBackend, RequestOptions, ConnectionBackend, Headers} from '@angular/http';
import {Router} from '@angular/router';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { Observable } from 'rxjs/Observable';
import {NgModule,provide} from '@angular/core';
import { Routes,RouterModule }  from '@angular/router';

import { IndexComponent } from './index.component';
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
import{ riskTestComponent } from './pages/risk_assessment/riskTest.component';
import { DisclaimerComponent } from './pages/risk_assessment/disclaimer.component';
import { registerComponent } from './pages/user/register.component';
import { RiskResultComponent } from './pages/risk_assessment/riskResult.component';
import { ProductComponent } from './pages/product/product.list';
import { ProductDetailComponent } from './pages/product/product.detail';
import { modifyPwdComponent } from './pages/user/modifyPwd.component';
import { findPwdStep1Component } from './pages/user/findPwdStep1.component';
import { findPwdStep2Component } from './pages/user/findPwdStep2.component';
import { findPwdStep3Component } from './pages/user/findPwdStep3.component';
import { NewsComponent } from './pages/cyan_news/news.list';
import { NewsInfoComponent } from './pages/cyan_news/news.info';
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
   //资讯
   {
     path:'news/:type',
     component:NewsComponent
   },
   //资讯详情
   {
     path:'newsInfo/:key',
     component:NewsInfoComponent
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


/**
 * 对http请求进行扩充
 * 1. 全局使用form表单提交方式
 */
class HttpInterceptor extends Http {
    
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private _router: Router) {
        super(backend, defaultOptions);
    }

    post(url: string, body: Object, options?: RequestOptionsArgs): Observable<Response> {   
        return super.post(url, this.asFormPost(body), this.getRequestOptionArgs(options))
          .map((result) => result.json()) ;
    }

    getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        options.headers.set('Content-Type','application/x-www-form-urlencoded; charset=utf-8');
        return options;
    }

    asFormPost(data:Object) {
        if (void 0 === data) return data;
        var buffer = new Array();
        for (var name in data) {
            if (data.hasOwnProperty(name)) {
                var value = data[name];
                buffer.push(encodeURIComponent(name) + "=" + encodeURIComponent(null == value ? "" : value)) 
            }
        }
        var source = buffer.join("&").replace(/%20/g, "+");
        return source;
    }
}

/*
bootstrap(IndexComponent, [
  IndexRouterProviders,
  HTTP_PROVIDERS,
  disableDeprecatedForms(),
  provideForms(),
  provide(LocationStrategy, {useClass: HashLocationStrategy}),
  provide(Http, {
        useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions, router: Router) => 
            new HttpInterceptor(xhrBackend, requestOptions, router),
        deps: [XHRBackend, RequestOptions, Router]
    })
]); 
 */

/**
 * RC5以上版本需通过NgModule标签定义应用的加载
 * 
 * 1.支持新的form处理方式
 * 2.使用HashLocation路由方式（通过#来路由）
 * 3.扩展Http默认支持form表单提交方式
 */
@NgModule({
    imports: [
        BrowserModule, 
        FormsModule, 
        HttpModule,
         RouterModule.forRoot(routes, {useHash: true})
    ],
    declarations: [
        IndexComponent,
        riskTestComponent
    ],
    providers:[
        HTTP_PROVIDERS,
        disableDeprecatedForms(),
        provideForms(),
        provide(Http, {
            useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions, router: Router) => 
                new HttpInterceptor(xhrBackend, requestOptions, router),
                deps: [XHRBackend, RequestOptions, Router]
        })
    ],
    exports: [ IndexComponent ],
    bootstrap: [ IndexComponent ]
})
export class AppModule{};

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));

//bootloader(main);