import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DonationTypeService } from 'app/dashboard/service/donationType.service';
import * as alertFunctions from '../../../shared/data/sweet-alerts';

@Component({
  selector: 'app-monthly-donor-contribution',
  templateUrl: './monthly-donor-contribution.component.html',
  styleUrls: ['./monthly-donor-contribution.component.scss']
})
export class MonthlyDonorContributionComponent implements OnInit {
  monthlyDonorContributionForm: FormGroup;
  donationTypes = [];
  constructor( private router: Router,private donationTypeSvc: DonationTypeService) { }

  ngOnInit() {
    this.monthlyDonorContributionForm = new FormGroup({
      receiptNumber: new FormControl("", [Validators.required]),
      fullName: new FormControl("", [Validators.required]),
      phoneNumber: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]{10}$"),
      ]),
      donationAmount: new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9]+(.[0-9][0-9]?)?"),
      ]),
      donationTypeId: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      status: new FormControl(true),
    });

    this.loadAllDonationType();
  }

  cancelMdContribution():void {
    this.router.navigate(['ng/MonthlyDonorContributionRecordsGrid']);
  }
  
  loadAllDonationType(): void {
    this.donationTypeSvc.getAllDonartionType().subscribe(response => {
      this.donationTypes = response._embedded.donationTypeEntities;
      this.donationTypes.sort((a, b) => (a.donationType.toLowerCase() > b.donationType.toLowerCase() ? 1 : -1));
    },
      error => {
        alertFunctions.custometypeError("Oops.!!", "Something went wrong..!!");
      });
  }

}
