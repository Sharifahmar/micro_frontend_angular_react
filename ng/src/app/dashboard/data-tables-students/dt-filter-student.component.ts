import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import * as alertFunctions from '../../shared/data/sweet-alerts';
import { StudentModel } from '../helper/model/student-model';
import { DonarService } from '../service/donar.service';
import { StudentService } from '../service/students.service';
import { LoaderComponentService } from '../shared/behavior-subject-service/loader-component-interaction.service';



@Component({
    selector: 'app-dt-student',
    templateUrl: './dt-filter-student.component.html',
    styleUrls: ['./dt-filter-student.component.scss']
})

export class DTFilterStudentComponent implements OnInit {

    @ViewChild('editTmpl', { static: false }) editTmpl: TemplateRef<any>;
    @ViewChild('hdrTpl', { static: false }) hdrTpl: TemplateRef<any>;
    rows = [];
    columns = [];
    temp = [];
    student: StudentModel = new StudentModel();
    studentFormSearchCriteria: FormGroup;
    constructor(private studentService: StudentService, private donarService: DonarService, private loaderComponentService: LoaderComponentService, private router: Router) {

    }

    ngOnInit() {

        this.studentFormSearchCriteria = new FormGroup({
            'firstName': new FormControl(""),
            'aadhaarNumber': new FormControl(""),
            'phoneNumber': new FormControl(""),
        });

        // Table Column Titles
        this.columns = [
            { name: 'First Name', prop: 'firstName', headerTemplate: this.hdrTpl },
            { name: 'Last Name ', prop: 'lastName', headerTemplate: this.hdrTpl },
            { name: 'Mobile Number', prop: 'phoneNumber', headerTemplate: this.hdrTpl },
            { name: 'City', prop: 'city', headerTemplate: this.hdrTpl },
            { name: 'Actions', cellTemplate: this.editTmpl, headerTemplate: this.hdrTpl }
        ];

        this.loadAllStudents();
    }

    doSearch(): void {
        this.loaderComponentService.emitChange(true);
        this.studentFormSearchCriteria.get('firstName').value === "" ? this.student.setFirstName(null) : this.student.setFirstName(this.studentFormSearchCriteria.get('firstName').value);
        this.studentFormSearchCriteria.get('phoneNumber').value === "" ? this.student.setPhoneNumber(null) : this.student.setPhoneNumber(this.studentFormSearchCriteria.get('phoneNumber').value);
        this.studentFormSearchCriteria.get('aadhaarNumber').value === "" ? this.student.setAadhaarNumber(null) : this.student.setAadhaarNumber(this.studentFormSearchCriteria.get('aadhaarNumber').value);
        this.student.setStatus(true);
        this.studentService.studentSearchCriteria(this.student).subscribe(
            response => {
                this.loaderComponentService.emitChange(false);
                response.status === true ? this.rows = response.data : alertFunctions.custometypeError("Oops.!!", "Something went wrong..");
            },
            error => {
                alertFunctions.custometypeError("Oops.!!", "Something went wrong..")
            });

    }

    // @ViewChild(DatatableComponent) table: DatatableComponent;


    // updateFilter(event) {
    //     const val = event.target.value.toLowerCase();

    //     // filter our data
    //     const temp = this.temp.filter(function (d) {
    //         return d.firstName.toLowerCase().indexOf(val) !== -1 || !val;
    //     });

    //     // update the rows
    //     this.rows = temp;
    //     // Whenever the filter changes, always go back to the first page
    //     this.table.offset = 0;
    // }

    loadAllStudents(): void {
        this.loaderComponentService.emitChange(true);
        this.studentService.getAllStudents().subscribe(response => {
            this.loaderComponentService.emitChange(false);
            this.rows = response._embedded.studentsRepo;
            this.temp = this.rows;
        },
            error => {

            });
    }
    addView(): void {
        this.router.navigate(['/AddStudent']);
    }

    editView(data: any): void {
        this.router.navigate(['/Student', data.studentId, 'Edit']);
    }

    view(data: any): void {
        this.router.navigate(['/Student', data.studentId, 'View']);
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
                this.student.setStudentId(data.studentId);
                this.studentService.deleteStudent(this.student).subscribe(response => {
                    if (response.status === true) {
                        swal('Congratulations.!!', 'Record Deleted Successfully!!');
                        this.loadAllStudents();
                    }
                },
                    (error: any) => {
                        swal('Oops.!!', 'Something went wrong..');

                    })
            }
        }).catch(swal.noop);

    }
}