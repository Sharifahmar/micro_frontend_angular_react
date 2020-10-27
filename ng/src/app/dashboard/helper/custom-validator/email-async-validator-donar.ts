import { AsyncValidatorFn, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS, AsyncValidator } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { Directive } from '@angular/core';
import { LoginModel } from '../model/login-model';
import { DonarService } from '../../service/donar.service';

@Directive({
  selector: '[email][formControlName],[email][formControl],[email][ngModel]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: checkEmailValidatorDirectiveDonar, multi: true }]
})
export class checkEmailValidatorDirectiveDonar implements AsyncValidator {
  constructor(private donarService: DonarService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return checkEmailValidator(this.donarService)(control);
  }
}


export function checkEmailValidator(donarService: DonarService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    var obj = new LoginModel();
    obj.setEmail(control.value);
    return donarService.getEmailExist(obj).map(
      res => (res && res.available === false) ? { "emailExist": true } : null
    );
  };
} 
