import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard1Component } from "./dashboard1/dashboard1.component";
import { Dashboard2Component } from "./dashboard2/dashboard2.component";
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DTFilterComponent } from './data-tables-donar/dt-filter.component';
import { DonarComponent } from './donars/donar.component';
import { AcceptorComponent } from './acceptors/acceptor.component';
import { DTFilterAcceptorComponent } from './data-tables-acceptor/dt-filter-acceptor.component';
import { DTFilterStudentComponent } from './data-tables-students/dt-filter-student.component';
import { DonationTypeComponent } from './masters/donation-type/donation-type.component';
import { AuthGuard } from './helper/guards/auth-guard';
import { DTFilterDonationTypeComponent } from './data-tables-donationType/dt-filter-donationType.component';
import { StudentComponent } from './students/student.component';

import { DataTablesAcceptorDonationComponent } from './data-tables-acceptordonation/data-tables-acceptordonation.component';
import { AcceptorsDonationComponent } from './acceptors/acceptors-donation/acceptors-donation.component';
import { DataTablesDonarsMonthlyContributionComponent } from './donars/data-tables-donors-monthlycontribution/data-tables-donors-monthlycontribution';
import { DonarsMonthlyContributionComponent } from './donars/donors-monthly-contribution/donors-monthly-contribution.component';
import { GeneralDonorComponent } from './donars/data-tables-general-donor/data-tables-generaldonor.component';
import { GeneralDonorContributionComponent } from './donars/general-donor-contribution/general-donor-contribution.component';
const routes: Routes = [
  {
    path: 'ng',
    children: [
      {
        path: 'dashboard',
        component: Dashboard1Component,
        canActivate: [AuthGuard],
      },
      {
        path: 'dashboard2',
        component: Dashboard2Component,
        canActivate: [AuthGuard],
      },
      {
        path: 'UserProfile',
        component: UserProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'DonorRecordsGrid',
        component: DTFilterComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'Donar/:id/:data',
        component: DonarComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'AddDonor',
        component: DonarComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'AddAcceptor',
        component: AcceptorComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'AcceptorRecordsGrid',
        component: DTFilterAcceptorComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'StudentRecordsGrid',
        component: DTFilterStudentComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'master/DonationType',
        component: DonationTypeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'master/DonationTypeGrid',
        component: DTFilterDonationTypeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'master/DonationType/:id/:data',
        component: DonationTypeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'Acceptor/:id/:data',
        component: AcceptorComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'AddStudent',
        component: StudentComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'Student/:id/:data',
        component: StudentComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'AddMonthlyContribution',
        component: DonarsMonthlyContributionComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'MonthlyContribution/:id/:data',
        component: DonarsMonthlyContributionComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'MonthlyDonorContributionRecordsGrid',
        component: DataTablesDonarsMonthlyContributionComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'AcceptorDonationRecordsGrid',
        component: DataTablesAcceptorDonationComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'Donation/:id/:data',
        component: AcceptorsDonationComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'AddDonation',
        component: AcceptorsDonationComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'GeneralDonorContributionRecordsGrid',
        component: GeneralDonorComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'AddDonorContribution',
        component: GeneralDonorContributionComponent,
        canActivate: [AuthGuard],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
