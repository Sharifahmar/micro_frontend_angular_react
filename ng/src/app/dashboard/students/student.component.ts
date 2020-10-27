import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserProfileService } from '../service/user-profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as alertFunctions from '../../shared/data/sweet-alerts';
import { DonarService } from '../service/donar.service';
import { StudentService } from '../service/students.service';
import { StudentModel } from '../helper/model/student-model';
import { checkAadharNumberValidator } from '../helper/custom-validator/aadharNumber-async-validator';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  constructor(private studentService: StudentService, private donarService: DonarService, private router: Router, private userProfileService: UserProfileService, private route: ActivatedRoute) { }
  studentForm: FormGroup;
  cities = ['Amravati'];
  states = ['Maharashtra'];
  country = ['India'];
  value: String = 'Details';
  flag: Boolean = false;
  cancelButtonLabel: string = 'Cancel';
  saveButtonLabel: string = 'Save';
  userProfileRecieve: any = {};
  id: number;
  student: StudentModel = new StudentModel();
  @ViewChild('cardElement', { static: false }) cardElement: ElementRef;
  ngOnInit() {
    this.studentForm = new FormGroup({
      'firstName': new FormControl("", [Validators.required]),
      'lastName': new FormControl("", [Validators.required]),
      'motherName': new FormControl("", [Validators.required]),
      'fatherName': new FormControl("", [Validators.required]),
      'aadhaarNumber': new FormControl("", [Validators.required], [checkAadharNumberValidator(this.studentService)]),
      'phoneNumber': new FormControl("", [Validators.pattern("^[0-9]{10}$")]),
      'className': new FormControl("", [Validators.required]),
      'grade': new FormControl("", [Validators.required]),
      'idNumber': new FormControl("", [Validators.required]),
      'subId': new FormControl(""),
      'address': new FormControl("", [Validators.required]),
      'zipCode': new FormControl("", [Validators.required]),
      'city': new FormControl("", [Validators.required]),
      'state': new FormControl("", [Validators.required]),
      'country': new FormControl("", [Validators.required]),
      'schoolName': new FormControl("", [Validators.required]),
      'status': new FormControl(true)
    }, { updateOn: 'blur' });

    this.loadDetails();
  }

  cancelDonar(): void {
    this.studentForm.reset();
    this.router.navigate(['/StudentRecordsGrid']);
  }

  registerStudent(): void {
    if (this.id !== undefined && this.id !== null) {
      this.student.setStudentId(this.id)
      var copy = Object.assign(this.student, this.studentForm.value);
      this.studentService.updateStudent(copy).subscribe(
        response => {
          response.status === true ? alertFunctions.customtypeSuccess("Congratulations.!!", "Student Update Successfully..!!") : null
          this.studentForm.reset();
        },
        error => {
          alertFunctions.custometypeError("Oops.!!", "Something went wrong..")
        });
    }
    else {
      this.studentService.registerStudent(this.studentForm.value).subscribe(
        response => {
          alertFunctions.customtypeSuccess("Congratulations.!!", "Student Register Successfully..!!")
          this.studentForm.reset();
        },
        error => {
          alertFunctions.custometypeError("Oops.!!", "Something went wrong..")
        });
    }
  }

  loadDetails(): void {
    this.route.params.subscribe(param => {
      this.flag = param['data'] == 'View' ? true : false;
      switch (param['data']) {
        case 'View':
          this.cancelButtonLabel = 'Back';
          this.studentForm.disable();
          break;
        case 'Edit':
          this.studentForm.get('aadhaarNumber').disable();
          this.studentForm.get('phoneNumber').disable();
          this.cancelButtonLabel = 'Cancel';
          this.saveButtonLabel = 'Update';
          this.studentForm.get('aadhaarNumber').clearAsyncValidators();
          break;

        default:
          this.cancelButtonLabel = 'Cancel';
          this.saveButtonLabel = 'Save';
          break;
      }
      this.id = param['id'];
      if (this.id !== undefined && this.id !== null) {
        this.studentService.getStudentsByIdAndStatus(this.id).subscribe(data => {
          this.userProfileRecieve = data._embedded.studentsRepo[0];
          this.studentForm.patchValue(this.userProfileRecieve);
        });
      }
    });
  }

  get aadhaarNumber() { return this.studentForm.get('aadhaarNumber'); }
  get phoneNumber() { return this.studentForm.get('phoneNumber'); }


}
