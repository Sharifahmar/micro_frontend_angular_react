import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContentPagesRoutingModule } from "./content-pages-routing.module";

import { ComingSoonPageComponent } from "./coming-soon/coming-soon-page.component";
import { ErrorPageComponent } from "./error/error-page.component";
import { ForgotPasswordPageComponent } from "./forgot-password/forgot-password-page.component";
import { LockScreenPageComponent } from "./lock-screen/lock-screen-page.component";
import { LoginPageComponent } from "./login/login-page.component";
import { MaintenancePageComponent } from "./maintenance/maintenance-page.component";
import { RegisterPageComponent } from "./register/register-page.component";
import { HttpClientModule } from '@angular/common/http';
import { checkEmailValidatorDirective } from '../../helper/custom-validator/email-async-validator';
import { checkPhoneNumberValidatorDirective } from '../../helper/custom-validator/phoneNumber-async-validator';
import { NgxLoadingModule } from 'ngx-loading';


@NgModule({
    imports: [
        CommonModule,
        ContentPagesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxLoadingModule.forRoot({
            primaryColour: '#ffffff',
            backdropBorderRadius: '3px'
        })
    ],
    declarations: [
        ComingSoonPageComponent,
        ErrorPageComponent,
        ForgotPasswordPageComponent,
        LockScreenPageComponent,
        LoginPageComponent,
        MaintenancePageComponent,
        RegisterPageComponent,
        checkEmailValidatorDirective,
        checkPhoneNumberValidatorDirective


    ]
})
export class ContentPagesModule { }
