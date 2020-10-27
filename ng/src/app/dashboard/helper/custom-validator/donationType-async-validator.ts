import { AsyncValidatorFn, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS, AsyncValidator } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { Directive } from '@angular/core';
import { DonationTypeService } from '../../service/donationType.service';
import { DonationType } from '../model/donationType-model';



@Directive({
  selector: '[donationType][formControlName],[donationType][formControl],[donationType][ngModel]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: checkDonationTypeDirectiveDonar, multi: true }]
})
export class checkDonationTypeDirectiveDonar implements AsyncValidator {
  constructor(private donationTypeService: DonationTypeService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return checkDonationTypeValidator(this.donationTypeService)(control);
  }
  
}

export function checkDonationTypeValidator(donationTypeService: DonationTypeService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    var obj = new DonationType();
    obj.setDonationType(control.value);
    return donationTypeService.getDonationTypeExists(obj).map(
      res => (res && res.available === false) ? { "donationTypeExist": true } : null
    );
  };
}
