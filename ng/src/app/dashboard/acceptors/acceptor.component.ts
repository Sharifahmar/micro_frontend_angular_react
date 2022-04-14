import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserProfileService } from '../service/user-profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as alertFunctions from '../../shared/data/sweet-alerts';
import { AcceptorService } from '../service/acceptor.service';
import { AcceptorModel } from '../helper/model/acceptor-model';
import { checkEmailValidatorAcceptor } from '../helper/custom-validator/email-async-validator -acceptor';
import { checkPhoneNumberValidatorAcceptor } from '../helper/custom-validator/phoneNumber-async-validator-acceptor';

@Component({
  selector: 'app-acceptor',
  templateUrl: './acceptor.component.html',
  styleUrls: ['./acceptor.component.scss']
})
export class AcceptorComponent implements OnInit {

  constructor(private acceptorService: AcceptorService, private router: Router, private userProfileService: UserProfileService, private route: ActivatedRoute) { }
  acceptorForm: FormGroup;
  cities = ['Amravati'];
  states = ['Maharashtra'];
  country = ['India'];
  value: String = 'Details';
  flag: Boolean = false;
  cancelButtonLabel: string = 'Cancel';
  saveButtonLabel: string = 'Save';
  userProfileRecieve: any = {};
  id: number;
  acceptorModel: AcceptorModel = new AcceptorModel();
  ngOnInit() {
    this.acceptorForm = new FormGroup({
      'fullName': new FormControl(null, [Validators.required]),
      //'email': new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")], [checkEmailValidatorAcceptor(this.acceptorService)]),
      'phoneNumber': new FormControl(null, [Validators.required, Validators.pattern("^[0-9]{10}$")], [checkPhoneNumberValidatorAcceptor(this.acceptorService)]),
      'address': new FormControl(null, [Validators.required]),
      'zipCode': new FormControl(null, [Validators.required]),
      'city': new FormControl(null, [Validators.required]),
      'state': new FormControl(null, [Validators.required]),
      'country': new FormControl(null, [Validators.required]),
      'status': new FormControl(true)
    });

    this.loadDetails();
  }

  cancelAcceptor(): void {
    this.acceptorForm.reset();
    this.router.navigate(['ng/AcceptorRecordsGrid']);
  }

  registerAcceptor(): void {
    if (this.id !== undefined && this.id !== null) {
      this.acceptorModel.setAcceptorId(this.id)
      var copy = Object.assign(this.acceptorModel, this.acceptorForm.value);
      this.acceptorService.updateAcceptor(copy).subscribe(
        response => {
          response.status === true ? alertFunctions.customtypeSuccess("Congratulations.!!", "Acceptor Update Successfully..!!") : null
          this.acceptorForm.reset(response.data);
        },
        error => {
          alertFunctions.custometypeError("Oops.!!", "Something went wrong..")
        });
    }
    else {
      this.acceptorService.registerAcceptor(this.acceptorForm.value).subscribe(
        response => {
          alertFunctions.customtypeSuccess("Congratulations.!!", "Acceptor Register Successfully..!!")
          this.acceptorForm.reset();
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
          this.acceptorForm.disable();
          break;
        case 'Edit':
          this.acceptorForm.get('phoneNumber').clearAsyncValidators();
          this.acceptorForm.get('phoneNumber').disable();
          this.cancelButtonLabel = 'Cancel';
          this.saveButtonLabel = 'Update';
          break;

        default:
          this.cancelButtonLabel = 'Cancel';
          this.saveButtonLabel = 'Save';
          break;
      }
      this.id = param['id'];
      if (this.id !== undefined && this.id !== null) {
        this.acceptorService.getAcceptorsByIdAndStatus(this.id).subscribe(data => {
          this.userProfileRecieve = data._embedded.acceptorEntities[0];
          this.acceptorForm.patchValue(this.userProfileRecieve);
        });
      }
    });
  }

  get phoneNumber() { return this.acceptorForm.get('phoneNumber'); }


}
