import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { LoginAuthService } from '../service/login-auth.service';
import { LoginModel } from '../../../helper/model/login-model';
import { NGXToastrService } from '../../../components/extra/toastr/toastr.service';
@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {
    loginForm: FormGroup;
    loginModel: LoginModel = new LoginModel();
    loading: boolean = false;
    constructor(private router: Router,
        private route: ActivatedRoute, private loginAuthService: LoginAuthService, private toastService: NGXToastrService) { }

    ngOnInit() {
        this.loginForm = new FormGroup({
            'email': new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
            'password': new FormControl("", [Validators.required]),
        });

        sessionStorage.clear();
    }
    //  ,[checkEmailValidator(this.loginAuthService)]
    login(): void {
        this.loading = true;
        this.loginModel.setEmail(this.email.value);
        this.loginModel.setPassword(this.password.value);
        this.loginAuthService.getToken(this.loginModel).subscribe(response => {
            this.loading = false;
            sessionStorage.setItem('token', response.accessToken);
            this.router.navigate(['/dashboard']);
        },
            error => {
                this.loading = false;
                if (error.message.includes("Invalid Credentials")) {
                    this.toastService.incorrectCredentialsError();
                }
                // console.log("*****error**" + error);
                // if (error.status === 401) {
                //     this.router.navigate(['pages/error']);
                // }

            });

    }

    // On registration link click
    onRegister() {
        sessionStorage.removeItem('token');
        this.router.navigate(['/pages/register']);

    }

    get email() { return this.loginForm.get('email'); }

    get password() { return this.loginForm.get('password'); }
}