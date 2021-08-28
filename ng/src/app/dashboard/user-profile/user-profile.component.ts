import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventEmitter } from 'events';
import { checkEmailValidator } from '../helper/custom-validator/email-async-validator';
import { checkPhoneNumberValidator } from '../helper/custom-validator/phoneNumber-async-validator';
import { LoginAuthService } from '../service/login-auth.service';
import { UserProfileService } from '../service/user-profile.service';
import { ComponentInteractionService } from '../shared/behavior-subject-service/component-interaction.service';
import { LoaderComponentService } from '../shared/behavior-subject-service/loader-component-interaction.service';
import * as alertFunctions from '../shared/data/sweet-alerts';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private loginAuthService: LoginAuthService, private componentInteractionService: ComponentInteractionService, private router: Router, private userProfileService: UserProfileService, private modalService: NgbModal, private loaderComponentService: LoaderComponentService) { }
  userProfileForm: FormGroup;
  cities = ['Amravati'];
  states = ['Maharashtra'];
  country = ['India'];

  userProfileRecieve: any = {};
  profileUrl = '';
  url: string | ArrayBuffer = '';
  uploadImageBtn: Boolean = false;
  fileData: File;
  progress: number;
  responseStatus: number;

  ngOnInit() {
    this.userProfileForm = new FormGroup({
      'firstName': new FormControl("", [Validators.required]),
      'lastName': new FormControl("", [Validators.required]),
      'email': new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")], [checkEmailValidator(this.loginAuthService)]),
      'phoneNumber': new FormControl("", [Validators.required, Validators.pattern("^[0-9]{10}$")], [checkPhoneNumberValidator(this.loginAuthService)]),
      'address': new FormControl("", [Validators.required]),
      'zipCode': new FormControl("", [Validators.required]),
      'city': new FormControl("", [Validators.required]),
      'state': new FormControl("", [Validators.required]),
      'country': new FormControl("", [Validators.required]),
    }, { updateOn: 'blur' });

    this.loadUserProfileDetails();

  }

  updateUser(): void {
    this.loaderComponentService.emitChange(true);
    this.userProfileService.updateUserDetails(this.userProfileForm.getRawValue()).subscribe(
      response => {
        this.userProfileForm.patchValue(response);
        this.userProfileRecieve = response;
        this.componentInteractionService.getResponseObject(response);
        this.loaderComponentService.emitChange(false);
        alertFunctions.customtypeSuccess("Congratulations.!!", "User Update Successfully..!!")
      },
      error => {
        alertFunctions.custometypeError("Oops.!!", "Something went wrong..")
      });
  }

  cancelUser(): void {
    this.userProfileForm.reset();
    this.router.navigate(['ng/dashboard']);
  }

  loadUserProfileDetails(): void {
    this.loaderComponentService.emitChange(true);
    this.userProfileForm.controls['email'].disable();
    this.userProfileForm.controls['phoneNumber'].disable();

    this.componentInteractionService.currentMessage.subscribe(response => {
      setTimeout(() => {
        console.log("settimeout called")
        if (typeof response === "object") {
          this.userProfileRecieve = response
          this.profileUrl = this.userProfileRecieve.profilePictureUrl;
          this.userProfileForm.patchValue(this.userProfileRecieve);
          this.loaderComponentService.emitChange(false);
        }
      }, 100);
    },
      error => {
        alertFunctions.custometypeError("Oops.!!", "Something went wrong..!!");
      }
    )

    // this.userProfileService.userDetails({ "status": true }).subscribe(responseObj => {
    //   if (typeof responseObj === "object") {
    //     this.userProfileRecieve = responseObj
    //     this.profileUrl = this.userProfileRecieve.profilePictureUrl;
    //     this.userProfileForm.patchValue(this.userProfileRecieve);
    //     this.componentInteractionService.getResponseObject(responseObj);
    //     this.loaderComponentService.emitChange(false);
    //   }
    // });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
      this.url = '';
      this.uploadImageBtn = false;
    });
  }

  onSelectFile(event): void {
    if (event.target.files && event.target.files[0]) {
      const imagesExt: Array<string> = ['image/png', 'image/jpg', 'image/jpeg'];
      if (imagesExt.indexOf(event.target.files[0].type) === -1) {
        alertFunctions.custometypeError("Oops.!!", "Please upload image only..!!");
        this.uploadImageBtn = false;
      } else {
        const reader = new FileReader();
        this.fileData = event.target.files[0];
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = event => {
          this.url = reader.result;
        };
        this.uploadImageBtn = true;
      }
    }
  }

  uploadImage(): void {
    this.responseStatus = 0;
    const formData = new FormData();
    formData.append('image', this.fileData);
    this.userProfileService.uploadImage(formData, this.userProfileRecieve.id).subscribe((event: any) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          console.log('Upload % ' + this.progress);
          break;
        case HttpEventType.Response:
          event.status === 200 ? this.responseStatus = event.status : alertFunctions.custometypeError("Oops.!!", "Something went wrong..!!")
          this.profileUrl = event.body.data.profilePictureUrl;
          break;
      }
    },
      (errorResp) => {
        if (errorResp.error.message.includes("Maximum upload size exceeded")) {
          alertFunctions.custometypeError("Oops.!!", "Image Size Exceeded");
        }
      });

    setTimeout(() => {
      this.progress = 0;
      if (this.responseStatus === 200) {
        alertFunctions.customtypeSuccess("Congratulations.!!", "User Image Upload Successfully..!!");
        this.modalService.dismissAll();
      }
    }, 1500);
  }


  get email() { return this.userProfileForm.get('email'); }
  get phoneNumber() { return this.userProfileForm.get('phoneNumber'); }

}
