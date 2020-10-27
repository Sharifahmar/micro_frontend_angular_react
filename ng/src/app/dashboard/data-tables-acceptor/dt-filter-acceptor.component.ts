import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import swal from 'sweetalert2';
import * as alertFunctions from '../../shared/data/sweet-alerts';
import { AcceptorModel } from '../helper/model/acceptor-model';
import { AcceptorService } from '../service/acceptor.service';
import { PdfgenerateService } from '../service/pdfgenerate.service';
import { LoaderComponentService } from '../shared/behavior-subject-service/loader-component-interaction.service';



@Component({
    selector: 'app-dt-filter',
    templateUrl: './dt-filter-acceptor.component.html',
    styleUrls: ['./dt-filter-acceptor.component.scss']
})

export class DTFilterAcceptorComponent implements OnInit {

    @ViewChild('editTmpl', { static: true }) editTmpl: TemplateRef<any>;
    @ViewChild('hdrTpl', { static: true }) hdrTpl: TemplateRef<any>;
    rows = [];
    columns = [];
    temp = [];
    acceptorModel: AcceptorModel = new AcceptorModel();
    acceptorFormSearchCriteria: FormGroup;
    gridAddBtn: boolean = false;
    fullNameArr = [];
    constructor(private acceptorService: AcceptorService, private router: Router, private loaderComponentService: LoaderComponentService, private pdfgenerateService: PdfgenerateService) { }

    ngOnInit() {

        this.acceptorFormSearchCriteria = new FormGroup({
            'fullName': new FormControl(null),
            'phoneNumber': new FormControl(null)
        });
        // Table Column Titles
        this.columns = [
            { name: 'Full Name', prop: 'fullName', headerTemplate: this.hdrTpl },
            { name: 'Mobile Number', prop: 'phoneNumber', headerTemplate: this.hdrTpl },
            { name: 'City', prop: 'city', headerTemplate: this.hdrTpl },
            { name: 'Actions', cellTemplate: this.editTmpl, headerTemplate: this.hdrTpl }
        ];
        this.loadAllAcceptors();
    }

    filterReset(): void {
        this.acceptorFormSearchCriteria.reset();
    }

    doSearch(): void {
        this.loaderComponentService.emitChange(true);
        this.acceptorFormSearchCriteria.get('fullName').value === "" || this.acceptorFormSearchCriteria.get('fullName').value === null ? this.acceptorModel.setFullName(null) : this.acceptorModel.setFullName(this.acceptorFormSearchCriteria.get('fullName').value);
        this.acceptorFormSearchCriteria.get('phoneNumber').value === "" || this.acceptorFormSearchCriteria.get('phoneNumber').value === null ? this.acceptorModel.setPhoneNumber(null) : this.acceptorModel.setPhoneNumber(this.acceptorFormSearchCriteria.get('phoneNumber').value);
        this.acceptorModel.setStatus(true);
        this.acceptorService.acceptorSearchCriteria(this.acceptorModel).subscribe(
            response => {
                this.loaderComponentService.emitChange(false);
                response.status === true ? this.rows = response.data : alertFunctions.custometypeError("Oops.!!", "Something went wrong..");
            },
            error => {
                alertFunctions.custometypeError("Oops.!!", "Something went wrong..")
            });

    }

    loadAllAcceptors(): void {
        this.loaderComponentService.emitChange(true);
        this.acceptorService.getAllAcceptor().subscribe(response => {
            response._embedded.acceptorEntities.length > 0 ? this.gridAddBtn = false : this.gridAddBtn = true;
            this.loaderComponentService.emitChange(false);
            this.rows = response._embedded.acceptorEntities;
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
        this.router.navigate(['/AddAcceptor']);

    }

    editView(data: any): void {
        this.router.navigate(['/Acceptor', data.acceptorId, 'Edit']);
    }

    view(data: any): void {
        this.router.navigate(['/Acceptor', data.acceptorId, 'View']);
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
                this.acceptorModel.setAcceptorId(data.acceptorId);
                this.acceptorService.deleteAcceptor(this.acceptorModel).subscribe(response => {
                    if (response.status === true) {
                        swal('Congratulations.!!', 'Record Deleted Successfully!!');
                        this.loadAllAcceptors();
                    }
                },
                    (error: any) => {
                        swal('Oops.!!', 'Something went wrong..');

                    })
            }
        }).catch(swal.noop);

    }

    getAcceptorListDetails(rows) {
        return {
            table: {
                widths: ['*', '*', '*', '*'],
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
                            { text: ed.city, alignment: 'center', fontSize: 11 },
                            { text: ed.zipCode, alignment: 'center', fontSize: 11 }
                        ];
                    })
                ]
            }
        };
    }

    getDocumentDefinition() {
        return {
            content: [
                {
                    text: 'AL-HUDA BAITULMAAL, BADNERA [ACCEPTOR LIST]',
                    bold: true,
                    fontSize: 13,
                    alignment: 'center',
                    margin: [0, 0, 0, 10],
                    style: 'header'
                },

                this.getAcceptorListDetails(this.rows),

            ],
            info: {
                title: 'Acceptors List PDF',
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


    generatePdf(action = 'open') {
        const documentDefinition = this.getDocumentDefinition();
        this.pdfgenerateService.setDocumentDefinition(documentDefinition);
        this.pdfgenerateService.setDownloadParameter('acceptorList.pdf');
        this.pdfgenerateService.generatePdfSwitch(action);
    }

    callAddRoute(): void {
        this.router.navigate(['/AddAcceptor']);
    }
}