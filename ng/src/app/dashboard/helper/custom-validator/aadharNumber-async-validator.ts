import { AsyncValidatorFn, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS, AsyncValidator } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { Directive } from '@angular/core';
import { StudentModel } from '../model/student-model';
import { StudentService } from '../../service/students.service';


@Directive({
  selector: '[aadhaarNumber][formControlName],[aadhaarNumber][formControl],[aadhaarNumber][ngModel]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: checkAadharNumberValidatorDirective, multi: true }]
})
export class checkAadharNumberValidatorDirective implements AsyncValidator {
  constructor(private studentService: StudentService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return checkAadharNumberValidator(this.studentService)(control);
  }
  
}

export function checkAadharNumberValidator(studentService: StudentService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    var obj = new StudentModel();
    obj.setAadhaarNumber(control.value);
    return studentService.getAadhaarNumberExist(obj).map(
      res => (res && res.available === false) ? { "aadharNumberExist": true } : null
    );
  };
}
