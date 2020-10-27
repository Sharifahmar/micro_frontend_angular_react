import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as alertFunctions from '../../shared/data/sweet-alerts';
import { checkDonationTypeValidator } from '../../helper/custom-validator/donationType-async-validator';
import { DonationTypeService } from '../../service/donationType.service';
import { error } from 'util';
import { DonationType } from '../../helper/model/donationType-model';


@Component({
  selector: 'app-donation-type',
  templateUrl: './donation-type.component.html',
  styleUrls: ['./donation-type.component.scss']
})
export class DonationTypeComponent implements OnInit {


  constructor(private router: Router, private route: ActivatedRoute, private donationTypeService: DonationTypeService) { }
  donationTypeForm: FormGroup;
  value: String = 'Details';
  flag: Boolean = false;
  cancelButtonLabel: string = 'Cancel';
  saveButtonLabel: string = 'Save';
  userProfileRecieve: any = {};
  donationTypeModel:DonationType =new DonationType();

  id: number;
  ngOnInit() {
    this.donationTypeForm = new FormGroup({
      'donationTypeName': new FormControl("", [Validators.required]),
      'donationType': new FormControl("", [Validators.required], [checkDonationTypeValidator(this.donationTypeService)]),
      'status': new FormControl(true)
    }, { updateOn: 'blur' });

    this.loadDetails();
  }

  cancelDonar(): void {
    this.donationTypeForm.reset();
    this.router.navigate(['/master/DonationTypeGrid']);
  }

  registerDonationType(): void {
    if (this.id !== undefined && this.id !== null) {
      this.donationTypeModel.setDonationTypeId(this.id);
      var copy = Object.assign(this.donationTypeModel, this.donationTypeForm.value);
      this.donationTypeService.updateDonationType(copy).subscribe(
        response => {
          response.status === true ? alertFunctions.customtypeSuccess("Congratulations.!!", "Donation Name Update Successfully..!!") : null
          this.donationTypeForm.reset();
        },
        error => {
          alertFunctions.custometypeError("Oops.!!", "Something went wrong..")
        });
    }
    else {

      this.donationTypeService.donationType(this.donationTypeForm.value).subscribe(response => {
        alertFunctions.customtypeSuccess("Congratulations.!!", "Donation Type Registeration Done")
        this.donationTypeForm.reset();

      },
        error => {
          alertFunctions.custometypeError("Oops.!!", "Something went wrong")
        })

    }

  }

  loadDetails(): void {
    this.route.params.subscribe(param => {
      this.flag = param['data'] == 'View' ? true : false;
      switch (param['data']) {
        case 'View':
          this.cancelButtonLabel = 'Back';
          this.donationTypeForm.disable();
          break;
        case 'Edit':
          this.donationTypeForm.get('donationType').disable();
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
        this.donationTypeService.getDonationTypeByIdAndStatus(this.id).subscribe(data => {
          this.userProfileRecieve = data;
          this.donationTypeForm.patchValue(this.userProfileRecieve);
        });
      }
    });
  }

  get donationTypeName() { return this.donationTypeForm.get('donationTypeName'); }
  get donationType() { return this.donationTypeForm.get('donationType'); }

}
