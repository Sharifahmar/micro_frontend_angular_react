import { AsyncValidatorFn, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS, AsyncValidator } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { Directive } from '@angular/core';
import { AcceptorService } from '../../service/acceptor.service';
import { AcceptorModel } from '../model/acceptor-model';

@Directive({
  selector: '[email][formControlName],[email][formControl],[email][ngModel]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: checkEmailValidatorDirectiveAcceptor, multi: true }]
})
export class checkEmailValidatorDirectiveAcceptor implements AsyncValidator {
  constructor(private acceptorService: AcceptorService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return checkEmailValidatorAcceptor(this.acceptorService)(control);
  }
}


export function checkEmailValidatorAcceptor(acceptorService: AcceptorService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    var obj = new AcceptorModel();
    obj.setEmail(control.value);
    return acceptorService.getEmailExist(obj).map(
      res => (res && res.available === false) ? { "emailExist": true } : null
    );
  };
} 
