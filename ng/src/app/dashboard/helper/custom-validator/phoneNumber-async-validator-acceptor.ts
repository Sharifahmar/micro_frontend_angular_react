import { AsyncValidatorFn, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS, AsyncValidator } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { Directive } from '@angular/core';
import { AcceptorService } from '../../service/acceptor.service';
import { AcceptorModel } from '../model/acceptor-model';


@Directive({
  selector: '[phoneNumber][formControlName],[phoneNumber][formControl],[phoneNumber][ngModel]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: checkPhoneNumberValidatorDirectiveAcceptor, multi: true }]
})
export class checkPhoneNumberValidatorDirectiveAcceptor implements AsyncValidator {
  constructor(private acceptorService: AcceptorService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return checkPhoneNumberValidatorAcceptor(this.acceptorService)(control);
  }
  
}

export function checkPhoneNumberValidatorAcceptor(acceptorService: AcceptorService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    var obj = new AcceptorModel();
    obj.setPhoneNumber(control.value);
    return acceptorService.getPhoneNumberExist(obj).map(
      res => (res && res.available === false) ? { "phoneNumberExist": true } : null
    );
  };
}
