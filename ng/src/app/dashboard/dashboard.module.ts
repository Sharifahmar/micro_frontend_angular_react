import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDateAdapter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChartistModule } from 'ng-chartist';
import { NgxLoadingModule } from 'ngx-loading';
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { AcceptorComponent } from './acceptors/acceptor.component';
import { AcceptorsDonationComponent } from './acceptors/acceptors-donation/acceptors-donation.component';
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { Dashboard1Component } from "./dashboard1/dashboard1.component";
import { Dashboard2Component } from "./dashboard2/dashboard2.component";
import { DTFilterAcceptorComponent } from './data-tables-acceptor/dt-filter-acceptor.component';
import { DataTablesAcceptorDonationComponent } from './data-tables-acceptordonation/data-tables-acceptordonation.component';
import { DTFilterComponent } from './data-tables-donar/dt-filter.component';
import { DataTablesDonarcontributionComponent } from './data-tables-donarcontribution/data-tables-donarcontribution.component';
import { DTFilterDonationTypeComponent } from './data-tables-donationType/dt-filter-donationType.component';
import { DTFilterStudentComponent } from './data-tables-students/dt-filter-student.component';
import { DonarComponent } from './donars/donar.component';
import { DonarsContributionComponent } from './donars/donars-contribution/donars-contribution.component';
import { checkAadharNumberValidatorDirective } from './helper/custom-validator/aadharNumber-async-validator';
import { checkDonationTypeDirectiveDonar } from './helper/custom-validator/donationType-async-validator';
import { checkEmailValidatorDirective } from './helper/custom-validator/email-async-validator';
import { checkEmailValidatorDirectiveAcceptor } from './helper/custom-validator/email-async-validator -acceptor';
import { checkEmailValidatorDirectiveDonar } from './helper/custom-validator/email-async-validator-donar';
import { checkPhoneNumberValidatorDirective } from './helper/custom-validator/phoneNumber-async-validator';
import { checkPhoneNumberValidatorDirectiveAcceptor } from './helper/custom-validator/phoneNumber-async-validator-acceptor';
import { checkPhoneNumberValidatorDirectiveDonar } from './helper/custom-validator/phoneNumber-async-validator-donar';
import { CustomAdapterDatepicker } from './helper/datePicker-formatter/CustomAdapterDatepicker';
import { DonationTypeComponent } from './masters/donation-type/donation-type.component';
import { StudentComponent } from './students/student.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ChartistModule,
        NgbModule,
        MatchHeightModule,
        ReactiveFormsModule,
        FormsModule,
        NgxDatatableModule,
        NgSelectModule,
        NgxLoadingModule.forRoot({
            primaryColour: '#ffffff',
            backdropBorderRadius: '3px'
        })
    ],
    exports: [],
    declarations: [
        Dashboard1Component,
        Dashboard2Component,
        UserProfileComponent,
        UserProfileComponent,
        checkEmailValidatorDirective,
        checkPhoneNumberValidatorDirective,
        checkPhoneNumberValidatorDirectiveDonar,
        checkEmailValidatorDirectiveDonar,
        checkDonationTypeDirectiveDonar,
        DTFilterComponent,
        DonarComponent,
        AcceptorComponent,
        DTFilterAcceptorComponent,
        StudentComponent,
        DTFilterStudentComponent,
        DonationTypeComponent,
        DTFilterDonationTypeComponent,
        checkEmailValidatorDirectiveAcceptor,
        checkPhoneNumberValidatorDirectiveAcceptor,
        checkAadharNumberValidatorDirective,
        DonarsContributionComponent,
        DataTablesDonarcontributionComponent,
        DataTablesAcceptorDonationComponent,
        AcceptorsDonationComponent

    ],
    providers: [],
})
export class DashboardModule { }
