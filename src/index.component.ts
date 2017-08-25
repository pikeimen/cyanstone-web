import { Component,Inject } from '@angular/core';
import {Http} from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { CyanstoneService } from './service/cyanstone.service';

@Component({
  selector: 'page',
  directives: [ROUTER_DIRECTIVES],
  template: '<router-outlet></router-outlet>',
  providers: [
    CyanstoneService
  ]
})
export class IndexComponent { 
  constructor(@Inject(Http) http:Http) {
    // http.post('/api/v1/users/current/bind_phone',
    //   {
    //     'phone': '13111911221',
    //     'verify_code': '12'

    //   })
    //   .subscribe((data) => {
    //     console.log(data);
    //   });
  }
 
}