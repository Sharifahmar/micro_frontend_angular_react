import { AsyncValidatorFn, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS, AsyncValidator } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { Directive } from '@angular/core';
import { LoginModel } from '../model/login-model';
import { LoginAuthService } from '../../service/login-auth.service';

@Directive({
  selector: '[email][formControlName],[email][formControl],[email][ngModel]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: checkEmailValidatorDirective, multi: true }]
})
export class checkEmailValidatorDirective implements AsyncValidator {
  constructor(private loginAuth: LoginAuthService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return checkEmailValidator(this.loginAuth)(control);
  }
}


export function checkEmailValidator(loginAuth: LoginAuthService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    var obj = new LoginModel();
    obj.setEmail(control.value);
    return loginAuth.getEmailExist(obj).map(
      res => (res && res.available === false) ? { "emailExist": true } : null
    );
  };
} 
