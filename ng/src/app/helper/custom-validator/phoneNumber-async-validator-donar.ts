import { AsyncValidatorFn, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS, AsyncValidator } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { Directive } from '@angular/core';
import { LoginModel } from '../model/login-model';
import { checkEmailValidatorDirective } from './email-async-validator';
import { DonarService } from '../../dashboard/service/donar.service';
//import { DonarService } from '../../forms/layouts/service/donar.service';


@Directive({
  selector: '[phoneNumber][formControlName],[phoneNumber][formControl],[phoneNumber][ngModel]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: checkEmailValidatorDirective, multi: true }]
})
export class checkPhoneNumberValidatorDirective implements AsyncValidator {
  constructor(private donarService: DonarService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return checkPhoneNumberValidator(this.donarService)(control);
  }
  
}

export function checkPhoneNumberValidator(donarService: DonarService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    var obj = new LoginModel();
    obj.setPhoneNumber(control.value);
    return donarService.getPhoneNumberExist(obj).map(
      res => (res && res.available === false) ? { "phoneNumberExist": true } : null
    );
  };
}
