export class ValidationService {
    
    //手机号
    static mobileValidator(control:any) {
        //长度11位
        if (control.value.match(/^(1[3-9][0-9])\d{8}$/)) {
            return null;
        } else {
            return { "invalidMobile": true };
        }
    }
    
    //密码校验
    static passwordValidator(control:any) {
        //密码必须为：6-20位数字、字母、下划线中的两种
        if (control.value.match(/^((?=\w*\d)(?=\w*\D)|(?=\w*[a-zA-Z])(?=\w*[^a-zA-Z]))^\w{6,20}$/)) {
            return null;
        } else {
            return { "invalidPassword": true };
        }
    }
    
}
