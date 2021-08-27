import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DonarService } from 'app/dashboard/service/donar.service';
import { DonationTypeService } from 'app/dashboard/service/donationType.service';
import { LoaderComponentService } from 'app/dashboard/shared/behavior-subject-service/loader-component-interaction.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import * as alertFunctions from '../../shared/data/sweet-alerts';

@Component({
  selector: 'app-monthly-donor',
  templateUrl: './monthly-donor.component.html',
  styleUrls: ['./monthly-donor.component.scss']
})
export class MonthlyDonorComponent implements OnInit {

  rows = [];
  columns = [];
  temp = [];
  donationTypes = [];
  @ViewChild('hdrTpl', { static: true }) hdrTpl: TemplateRef<any>;
  @ViewChild('editTmpl', { static: true }) editTmpl: TemplateRef<any>;
  monthlyDonorGridSearchCriteria: FormGroup;
  gridAddBtn: boolean = false;
  fullNameArr = [];
  constructor(private donationTypeSvc: DonationTypeService,
    private loaderComponentService: LoaderComponentService,
    private donarService: DonarService) { }

  ngOnInit() {

    this.monthlyDonorGridSearchCriteria = new FormGroup({
      'fullName': new FormControl(null),
      'donationType': new FormControl(null),
      'fromDate': new FormControl(null),
      'toDate': new FormControl(null)
    });

    this.columns = [
      { name: 'Receipt Number', prop: 'receiptNumber', headerTemplate: this.hdrTpl },
      { name: 'Full Name', prop: 'fullName', headerTemplate: this.hdrTpl },
      { name: 'Donation Type', prop: 'donationType', headerTemplate: this.hdrTpl },
      { name: 'Amount', prop: 'donationAmount', headerTemplate: this.hdrTpl },
      { name: 'Date', prop: 'dateString', headerTemplate: this.hdrTpl },
      { name: 'Actions', cellTemplate: this.editTmpl, headerTemplate: this.hdrTpl }
    ];

    this.loadAllDonationType();
    this.loadAllDonars();

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

  loadAllDonars(): void {
    this.loaderComponentService.emitChange(true);
    this.donarService.getAllDonars().subscribe(response => {
      response._embedded.donarsEntities.length > 0 ? this.gridAddBtn = false : this.gridAddBtn = true;
      this.loaderComponentService.emitChange(false);
      this.temp = response._embedded.donarsEntities;
      this.fullNameArr = this.temp.map(item => item.fullName);
    },
      error => {
        alertFunctions.custometypeError("Oops.!!", "Something went wrong..!!");
      });
  }

  formatter = (result: string) => result;
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.fullNameArr.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  filterReset(): void {
    this.monthlyDonorGridSearchCriteria.reset();
  }

}
