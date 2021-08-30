import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import swal from 'sweetalert2';
import * as alertFunctions from '../../shared/data/sweet-alerts';
import { DonarModel } from '../../helper/model/donar-model';
import { DonationAmountService } from '../../service/donation-amount.service';
import { DonationTypeService } from '../../service/donationType.service';
import { PdfgenerateService } from '../../service/pdfgenerate.service';
import { LoaderComponentService } from '../../shared/behavior-subject-service/loader-component-interaction.service';

@Component({
    selector: 'app-data-tables-donarmonthlycontribution',
    templateUrl: './data-tables-donors-monthlycontribution.html',
    styleUrls: ['./data-tables-donors-monthlycontribution.scss']
})
export class DataTablesDonarsMonthlyContributionComponent implements OnInit {
    donarFormSearchCriteria: FormGroup;
    @ViewChild('editTmpl', { static: true }) editTmpl: TemplateRef<any>;
    @ViewChild('hdrTpl', { static: true }) hdrTpl: TemplateRef<any>;
    rows = [];
    columns = [];
    temp = [];
    donar: DonarModel = new DonarModel();
    donationTypes = [];
    amtCount: number;
    fullNameArr = [];

    constructor(private pdfgenerateService: PdfgenerateService, private router: Router, private loaderComponentService: LoaderComponentService, private donationAmountService: DonationAmountService, private donationTypeSvc: DonationTypeService) { }

    ngOnInit() {

        this.donarFormSearchCriteria = new FormGroup({
            'fullName': new FormControl(null),
            'phoneNumber': new FormControl(null),
            'donationType': new FormControl(null),
            'fromDate': new FormControl(null),
            'toDate': new FormControl(null)
        });

        // Table Column Titles
        this.columns = [
            { name: 'Receipt Number', prop: 'receiptNumber', headerTemplate: this.hdrTpl },
            { name: 'Full Name', prop: 'fullName', headerTemplate: this.hdrTpl },
            { name: 'Donation Type', prop: 'donationType', headerTemplate: this.hdrTpl },
            { name: 'Amount', prop: 'donationAmount', headerTemplate: this.hdrTpl },
            { name: 'Date', prop: 'dateString', headerTemplate: this.hdrTpl },
            { name: 'Actions', cellTemplate: this.editTmpl, headerTemplate: this.hdrTpl }
        ];

        this.loadAllDonarsContributionList();
        this.loadAllDonationType();

    }


    doSearch(): void {
        let donationTypeObj = null;
        let fromDate = null;
        let toDate = null;
        this.donarFormSearchCriteria.get('donationType').value ? donationTypeObj = this.donarFormSearchCriteria.get('donationType').value.donationTypeId : null;// null check pls
        this.donarFormSearchCriteria.get('fromDate').value ? fromDate = this.donarFormSearchCriteria.get('fromDate').value : null;
        this.donarFormSearchCriteria.get('toDate').value ? toDate = this.donarFormSearchCriteria.get('toDate').value : null;
        this.loaderComponentService.emitChange(true);

        const request = {

            "status": true,
            "fromDate": fromDate,
            "fullName": this.donarFormSearchCriteria.get('fullName').value,
            "toDate": toDate,
            "donationTypeId": donationTypeObj

        }

        this.donationAmountService.getAllDonarsContributionDetailsJoin(request).subscribe(
            response => {
                this.loaderComponentService.emitChange(false);
                response.status === true ? this.rows = response.data : alertFunctions.custometypeError("Oops.!!", "Something went wrong..");
                this.amtCount = this.rows.map(x => parseInt(x.donationAmount)).reduce((a, b) => a + b, 0);
                this.fullNameArr = this.rows.map(item => item.fullName);
            },
            error => {
                this.loaderComponentService.emitChange(false);
                alertFunctions.custometypeError("Oops.!!", error.error.message);
            });

    }
    loadAllDonarsContributionList(): void {

        this.doSearch();
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
    addView(): void {
        this.router.navigate(['ng/AddMonthlyContribution']);
    }

    editView(data: any): void {
        this.router.navigate(['ng/MonthlyContribution', data.donationAmountId, 'Edit']);
    }

    view(data: any): void {
        this.router.navigate(['ng/MonthlyContribution', data.donationAmountId, 'View']);
    }

    deleteView(data: any): void {

        const req = {
            donationAmountId: data.donationAmountId
        }

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
                this.donationAmountService.deleteDonationAmount(req).subscribe(response => {
                    if (response.status === true) {
                        swal('Congratulations.!!', 'Record Deleted Successfully!!');
                        this.loadAllDonarsContributionList();
                    }
                },
                    (error: any) => {
                        swal('Oops.!!', 'Something went wrong..');

                    })
            }
        }).catch(swal.noop);

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

    getDocumentDefinition() {
        return {
            content: [
                {
                    text: 'AL-HUDA BAITULMAAL, BADNERA',
                    bold: true,
                    fontSize: 13,
                    alignment: 'center',
                    margin: [0, 0, 0, 10],
                    style: 'header'
                },

                this.getDonarContributionDetails(this.rows),

            ],
            info: {
                title: 'Donars Contribution List PDF',
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

    getDonarContributionDetails(rows) {
        return {
            table: {
                widths: [65, '*', '*', '*', '*'],
                body: [
                    [{
                        text: 'DATE',
                        style: 'tableHeader',
                    },
                    {
                        text: 'NAME',
                        style: 'tableHeader'
                    },
                    {
                        text: 'RECEIPT NO',
                        style: 'tableHeader'
                    },
                    {
                        text: 'AMOUNT',
                        style: 'tableHeader'
                    },
                    {
                        text: 'REMARK',
                        style: 'tableHeader'
                    }
                    ],
                    ...rows.map(ed => {
                        return [
                            { text: ed.dateString, alignment: 'center', fontSize: 11 },
                            { text: ed.fullName, alignment: 'center', fontSize: 11 },
                            { text: ed.receiptNumber, alignment: 'center', fontSize: 11 },
                            { text: ed.donationAmount, alignment: 'center', fontSize: 11 },
                            { text: ed.donationType, alignment: 'center', fontSize: 11 }
                        ];
                    })
                ]
            }
        };
    }

    generatePdf(action = 'open') {
        const documentDefinition = this.getDocumentDefinition();
        this.pdfgenerateService.setDocumentDefinition(documentDefinition);
        this.pdfgenerateService.setDownloadParameter('donarsContributionList.pdf');
        this.pdfgenerateService.generatePdfSwitch(action);
    }
}
