import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";
import { Router } from '@angular/router';
import { DonarModel } from '../helper/model/donar-model';
import swal from 'sweetalert2';
import { DonationTypeService } from '../service/donationType.service';
import { DonationType } from '../helper/model/donationType-model';
import { LoaderComponentService } from '../shared/behavior-subject-service/loader-component-interaction.service';



@Component({
    selector: 'app-dt-donationType',
    templateUrl: './dt-filter-donationType.component.html',
    styleUrls: ['./dt-filter-donationType.component.scss']
})

export class DTFilterDonationTypeComponent implements OnInit {

    @ViewChild('editTmpl', { static: false }) editTmpl: TemplateRef<any>;
    @ViewChild('hdrTpl', { static: false }) hdrTpl: TemplateRef<any>;
    rows = [];
    columns = [];
    temp = [];
    donationType: DonationType = new DonationType();

    constructor(private donationTypeSvc: DonationTypeService, private router: Router, private loaderComponentService: LoaderComponentService) {

    }

    ngOnInit() {
        // Table Column Titles
        this.columns = [
            { name: 'Donation Name', prop: 'donationTypeName', headerTemplate: this.hdrTpl },
            { name: 'Donation Type ', prop: 'donationType', headerTemplate: this.hdrTpl },
            { name: 'Actions', cellTemplate: this.editTmpl, headerTemplate: this.hdrTpl }
        ];

        this.loadAllDonationType();
    }

    @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;


    updateFilter(event) {
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function (d) {
            return d.donationType.toLowerCase().indexOf(val) !== -1 || !val;
        });

        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    }

    loadAllDonationType(): void {
        this.loaderComponentService.emitChange(true);
        this.donationTypeSvc.getAllDonartionType().subscribe(response => {
            this.loaderComponentService.emitChange(false);
            this.rows = response._embedded.donationTypeEntities;
            this.temp = this.rows;
        },
            error => {

            });
    }
    addView(): void {
        this.router.navigate(['/master/DonationType']);
    }

    editView(data: any): void {
        this.router.navigate(['/master/DonationType', data.donationTypeId, 'Edit']);
    }

    view(data: any): void {
        this.router.navigate(['/master/DonationType', data.donationTypeId, 'View']);
    }

    deleteView(data: any): void {
        swal({
            title: 'Are you sure?',
            text: "You want to delete this record ?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0CC27E',
            cancelButtonColor: '#FF586B',
            confirmButtonText: 'Delete',
            cancelButtonText: "cancel"
        }).then((isConfirm) => {
            if (isConfirm.value === true) {
                this.donationType.setDonationTypeId(data.donationTypeId);
                this.donationTypeSvc.deleteDonationType(this.donationType).subscribe(response => {
                    if (response.status === true) {
                        swal('Congratulations.!!', 'Record Deleted Successfully!!');
                        this.loadAllDonationType();
                    }
                },
                    (error: any) => {
                        swal('Oops.!!', 'Something went wrong..');

                    })
            }
        }).catch(swal.noop);

    }
}