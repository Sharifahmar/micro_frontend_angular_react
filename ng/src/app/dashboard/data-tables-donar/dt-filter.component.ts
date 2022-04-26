import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import swal from 'sweetalert2';
import * as alertFunctions from '../../shared/data/sweet-alerts';
import { DonarModel } from '../helper/model/donar-model';
import { DonarService } from '../service/donar.service';
import { DonationAmountService } from '../service/donation-amount.service';
import { DonationTypeService } from '../service/donationType.service';
import { PdfgenerateService } from '../service/pdfgenerate.service';
import { LoaderComponentService } from '../shared/behavior-subject-service/loader-component-interaction.service';



@Component({
    selector: 'app-dt-filter',
    templateUrl: './dt-filter.component.html',
    styleUrls: ['./dt-filter.component.scss']
})

export class DTFilterComponent implements OnInit {

    donarFormSearchCriteria: FormGroup;
    @ViewChild('editTmpl', { static: true }) editTmpl: TemplateRef<any>;
    @ViewChild('hdrTpl', { static: true }) hdrTpl: TemplateRef<any>;
    rows = [];
    columns = [];
    fullNameArr = [];
    donar: DonarModel = new DonarModel();
    gridAddBtn: boolean = false;
    SelectionType = SelectionType;
    selected = [];
    ColumnMode = ColumnMode;
    constructor(private donarService: DonarService, private donationAmountService: DonationAmountService, private donationTypeSvc: DonationTypeService, private router: Router, private loaderComponentService: LoaderComponentService, private pdfgenerateService: PdfgenerateService) { }

    ngOnInit() {

        this.donarFormSearchCriteria = new FormGroup({
            'fullName': new FormControl(null),
            'phoneNumber': new FormControl(null)
        });

        // Table Column Titles
        this.columns = [
            { name: 'Full Name', prop: 'fullName', headerTemplate: this.hdrTpl },
            { name: 'Mobile Number', prop: 'phoneNumber', headerTemplate: this.hdrTpl },
            { name: 'Amount', prop: 'donationAmount', headerTemplate: this.hdrTpl }
        ];

        this.loadAllDonars();
    }

    filterReset(): void {
        this.donarFormSearchCriteria.reset();
    }

    doSearch(): void {
        this.loaderComponentService.emitChange(true);
        this.donarFormSearchCriteria.get('fullName').value === "" || this.donarFormSearchCriteria.get('fullName').value === null ? this.donar.setFullName(null) : this.donar.setFullName(this.donarFormSearchCriteria.get('fullName').value);
        this.donarFormSearchCriteria.get('phoneNumber').value === "" || this.donarFormSearchCriteria.get('phoneNumber').value === null ? this.donar.setPhoneNumber(null) : this.donar.setPhoneNumber(this.donarFormSearchCriteria.get('phoneNumber').value);
        this.donar.setStatus(true);
        this.donarService.donarSearchCriteria(this.donar).subscribe(
            response => {
                this.loaderComponentService.emitChange(false);
                response.status === true ? this.rows = response.data : alertFunctions.custometypeError("Oops.!!", "Something went wrong..");
            },
            error => {
                alertFunctions.custometypeError("Oops.!!", "Something went wrong..")
            });

    }
    loadAllDonars(): void {
        this.loaderComponentService.emitChange(true);
        this.donarService.getAllDonars().subscribe(response => {
            response._embedded.donarsEntities.length > 0 ? this.gridAddBtn = false : this.gridAddBtn = true;
            this.loaderComponentService.emitChange(false);
            this.rows = response._embedded.donarsEntities;
            this.fullNameArr = this.rows.map(item => item.fullName);
        },
            error => {

            });
    }

    formatter = (result: string) => result;
    // Default Search
    search = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(term => term === '' ? []
                : this.fullNameArr.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
        );


    addView(): void {
        this.router.navigate(['ng/AddDonor']);
    }

    editView(data: any): void {
        this.router.navigate(['ng/Donar', data.donarId, 'Edit']);
    }

    view(data: any): void {
        this.router.navigate(['ng/Donar', data.donarId, 'View']);
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
            cancelButtonText: "Cancel"
        }).then((isConfirm) => {
            if (isConfirm.value === true) {
                this.donar.setDonarId(data.donarId);
                this.donarService.deleteDonar(this.donar).subscribe(response => {
                    if (response.status === true) {
                        swal('Congratulations.!!', 'Record Deleted Successfully!!');
                        this.loadAllDonars();
                    }
                },
                    (error: any) => {
                        swal('Oops.!!', 'Something went wrong..');

                    })
            }
        }).catch(swal.noop);

    }

    getDocumentDefinition() {
        return {
            content: [
                {
                    text: 'AL-HUDA BAITULMAAL, BADNERA [DONAR LIST]',
                    bold: true,
                    fontSize: 13,
                    alignment: 'center',
                    margin: [0, 0, 0, 10],
                    style: 'header'
                },

                this.getDonarListDetails(this.selected),

            ],
            info: {
                title: 'Donars List PDF',
            },
            styles: {
                tableHeader: {
                    bold: true,
                    fontSize: 12,
                    alignment: 'center',
                }
            }
        };
    }

    getDonarListDetails(rows) {
        return {
            table: {
                widths: ['*', '*', '*', '*', '*'],
                body: [
                    [
                        {
                            text: 'NAME',
                            style: 'tableHeader'
                        },
                        {
                            text: 'MOBILE NUMBER',
                            style: 'tableHeader'
                        },
                        {
                            text: 'AMOUNT',
                            style: 'tableHeader'
                        },
                        {
                            text: 'CITY',
                            style: 'tableHeader'
                        },
                        {
                            text: 'PINCODE',
                            style: 'tableHeader'
                        }
                    ],
                    ...rows.map(ed => {
                        return [
                            { text: ed.fullName, alignment: 'center', fontSize: 11 },
                            { text: ed.phoneNumber, alignment: 'center', fontSize: 11 },
                            { text: ed.donationAmount, alignment: 'center', fontSize: 11 },
                            { text: ed.city, alignment: 'center', fontSize: 11 },
                            { text: ed.zipCode, alignment: 'center', fontSize: 11 }
                        ];
                    })
                ]
            }
        };
    }

    generatePdf(action = 'open') {
        const documentDefinition = this.getDocumentDefinition();
        this.pdfgenerateService.setDocumentDefinition(documentDefinition);
        this.pdfgenerateService.setDownloadParameter('donorList.pdf');
        this.pdfgenerateService.generatePdfSwitch(action);
    }

    callAddRoute(): void {
        this.router.navigate(['ng/AddDonor']);
    }

    onSelect({ selected }) {
      //  console.log('Select Event', selected, this.selected);
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
      }

      bulkRecordTransfer(): void {
        this.donationAmountService.generateReceiptPdfApi(this.selected).subscribe(response => {
            if (response.status === true) {
                swal('Congratulations.!!', 'Receipt has been generated successfully!!');
                this.loaderComponentService.emitChange(false);
            }
        },
            (error: any) => {
                swal('Oops.!!', 'Something went wrong..!!');
                this.loaderComponentService.emitChange(false);
            })
    }
    
}