import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import * as alertFunctions from '../../shared/data/sweet-alerts';
import { AcceptorModel } from '../helper/model/acceptor-model';
import { AcceptorAmountService } from '../service/acceptor-amount.service';
import { AcceptorService } from '../service/acceptor.service';
import { DonationTypeService } from '../service/donationType.service';
import { PdfgenerateService } from '../service/pdfgenerate.service';
import { LoaderComponentService } from '../shared/behavior-subject-service/loader-component-interaction.service';


@Component({
    selector: 'app-data-tables-acceptordonation',
    templateUrl: './data-tables-acceptordonation.component.html'
})
export class DataTablesAcceptorDonationComponent implements OnInit {
    acceptorFormSearchCriteria: FormGroup;
    @ViewChild('editTmpl', { static: true }) editTmpl: TemplateRef<any>;
    @ViewChild('hdrTpl', { static: true }) hdrTpl: TemplateRef<any>;
    rows = [];
    columns = [];
    temp = [];
    acceptor: AcceptorModel = new AcceptorModel();
    donationTypes = [];
    amtCount: number;

    constructor(private accService: AcceptorService, private router: Router, private loaderComponentService: LoaderComponentService, private acceptorAmountService: AcceptorAmountService, private donationTypeSvc: DonationTypeService, private pdfgenerateService: PdfgenerateService) { }

    ngOnInit() {

        this.acceptorFormSearchCriteria = new FormGroup({
            'fullName': new FormControl(),
            'phoneNumber': new FormControl(),
            'donationType': new FormControl(),
            'fromDate': new FormControl(),
            'toDate': new FormControl()
        });

        // Table Column Titles
        this.columns = [
            { name: 'Token Number', prop: 'tokenNumber', headerTemplate: this.hdrTpl },
            { name: 'Full Name', prop: 'fullName', headerTemplate: this.hdrTpl },
            { name: 'Mobile Number', prop: 'phoneNumber', headerTemplate: this.hdrTpl },
            { name: 'Amount', prop: 'acceptorAmount', headerTemplate: this.hdrTpl },
            { name: 'Date', prop: 'dateString', headerTemplate: this.hdrTpl },
            { name: 'Actions', cellTemplate: this.editTmpl, headerTemplate: this.hdrTpl }
        ];

        this.loadAllAcceptorContributionList();
        this.loadAllDonationType();

    }

    doSearch(): void {

        let donationTypeObj = null;
        let fromDate = null;
        let toDate = null;
        this.acceptorFormSearchCriteria.get('donationType').value ? donationTypeObj = this.acceptorFormSearchCriteria.get('donationType').value.donationTypeId : null;// null check pls
        this.acceptorFormSearchCriteria.get('fromDate').value ? fromDate = this.acceptorFormSearchCriteria.get('fromDate').value.year + '-' + this.acceptorFormSearchCriteria.get('fromDate').value.month + '-' + this.acceptorFormSearchCriteria.get('fromDate').value.day : null;
        this.acceptorFormSearchCriteria.get('toDate').value ? toDate = this.acceptorFormSearchCriteria.get('toDate').value.year + '-' + this.acceptorFormSearchCriteria.get('toDate').value.month + '-' + this.acceptorFormSearchCriteria.get('toDate').value.day : null;
        this.loaderComponentService.emitChange(true);

        const request = {

            "status": true,
            "fromDate": fromDate,
            "phoneNumber": this.acceptorFormSearchCriteria.get('phoneNumber').value,
            "toDate": toDate,
            "donationTypeId": donationTypeObj

        }

        this.acceptorAmountService.getAllAcceptorContributionDetailsJoin(request).subscribe(
            response => {
                this.loaderComponentService.emitChange(false);
                response.status === true ? this.rows = response.data : alertFunctions.custometypeError("Oops.!!", "Something went wrong..");
                this.amtCount = this.rows.map(x => parseInt(x.acceptorAmount)).reduce((a, b) => a + b, 0);
            },
            error => {
                this.loaderComponentService.emitChange(false);
                alertFunctions.custometypeError("Oops.!!", error.error.message);
            });

    }

    loadAllAcceptorContributionList(): void {

        this.doSearch();
    }

    loadAllDonationType(): void {
        this.donationTypeSvc.getAllDonartionType().subscribe(response => {
            this.donationTypes = response._embedded.donationTypeEntities;
        },

            error => {

                alertFunctions.custometypeError("Oops.!!", "Something went wrong..")

            });
    }
    addView(): void {
        this.router.navigate(['ng/AddDonation']);
    }

    editView(data: any): void {
        this.router.navigate(['ng/Donation', data.acceptorAmountId, 'Edit']);
    }

    view(data: any): void {
        this.router.navigate(['ng/Donation', data.acceptorAmountId, 'View']);
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
                this.acceptor.setAcceptorId(data.acceptorAmountId);
                this.accService.deleteAcceptorDonation(this.acceptor).subscribe(response => {
                    if (response.status === true) {
                        swal('Congratulations.!!', 'Record Deleted Successfully!!');
                        this.loadAllAcceptorContributionList();
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
                    text: 'AL-HUDA BAITULMAAL, BADNERA',
                    bold: true,
                    fontSize: 13,
                    alignment: 'center',
                    margin: [0, 0, 0, 10],
                    style: 'header'
                },

                this.getAcceptorDonationDetails(this.rows),

            ],
            info: {
                title: 'Acceptor Donation List PDF',
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

    getAcceptorDonationDetails(rows) {
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
                        text: 'TOKEN NO',
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
                            { text: ed.firstName + " " + ed.lastName, alignment: 'center', fontSize: 11 },
                            { text: ed.tokenNumber, alignment: 'center', fontSize: 11 },
                            { text: ed.acceptorAmount, alignment: 'center', fontSize: 11 },
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
        this.pdfgenerateService.setDownloadParameter('acceptorDonationList.pdf');
        this.pdfgenerateService.generatePdfSwitch(action);
    }

}
