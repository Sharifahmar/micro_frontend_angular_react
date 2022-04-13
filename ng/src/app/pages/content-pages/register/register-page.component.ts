import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { checkEmailValidator } from '../../../helper/custom-validator/email-async-validator';
import { checkPhoneNumberValidator } from '../../../helper/custom-validator/phoneNumber-async-validator';
import { RegistrationService } from '../service/registeration.service';
import { LoginAuthService } from '../service/login-auth.service';
import * as alertFunctions from '../../../shared/data/sweet-alerts';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent implements OnInit {
    registerForm: FormGroup;
    loading: boolean = false;
    constructor(private registrationService: RegistrationService, private loginAuthService: LoginAuthService, private router: Router) { }

    ngOnInit() {
        this.registerForm = new FormGroup({
            'firstName': new FormControl("", [Validators.required]),
            'lastName': new FormControl("", [Validators.required]),
            'email': new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")], [checkEmailValidator(this.loginAuthService)]),
            'phoneNumber': new FormControl("", [Validators.required, Validators.pattern("^[0-9]{10}$")], [checkPhoneNumberValidator(this.loginAuthService)]),
            'password': new FormControl("", [Validators.required, Validators.minLength(4)]),
            //'confirmpassword': new FormControl("", [Validators.required]),
        });

        sessionStorage.clear();

    }
    register(): void {
        this.loading = true;
        this.registrationService.registerUser(this.registerForm.value).subscribe(
            response => {
                this.loading = false;
                response.status === true ? alertFunctions.customtypeSuccess("Congratulations.!!", "User Registeration Done") : alertFunctions.custometypeError("Oops.!!", "Something went wrong")
                this.registerForm.reset();
                this.router.navigate(['ng/pages/login']);
            },
            error => {


            }
        )
    }

    //  On submit click, reset field value
    onSubmit() {
        this.registerForm.reset();

    }

    get email() { return this.registerForm.get('email'); }
    get phoneNumber() { return this.registerForm.get('phoneNumber'); }
    get password() { return this.registerForm.get('password'); }
    //  get confirmpassword() { return this.registerForm.get('confirmpassword'); }

}