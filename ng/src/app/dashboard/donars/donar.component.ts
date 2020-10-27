import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as alertFunctions from '../../shared/data/sweet-alerts';
import { checkPhoneNumberValidator } from '../helper/custom-validator/phoneNumber-async-validator-donar';
import { DonarModel } from '../helper/model/donar-model';
import { DonarService } from '../service/donar.service';
import { UserProfileService } from '../service/user-profile.service';
import { LoaderComponentService } from '../shared/behavior-subject-service/loader-component-interaction.service';

@Component({
  selector: 'app-donar',
  templateUrl: './donar.component.html',
  styleUrls: ['./donar.component.scss']
})
export class DonarComponent implements OnInit {

  constructor(private donarService: DonarService, private router: Router, private userProfileService: UserProfileService, private route: ActivatedRoute, private modalService: NgbModal, private loaderComponentService: LoaderComponentService) { }
  donarForm: FormGroup;
  cities = ['Amravati'];
  states = ['Maharashtra'];
  country = ['India'];
  value: String = 'Details';
  flag: boolean = false;
  cancelButtonLabel: string = 'Cancel';
  saveButtonLabel: string = 'Save';
  userProfileRecieve: any = {};
  id: number;
  donarModel: DonarModel = new DonarModel();
  profileUrl = '';
  url: string | ArrayBuffer = '';
  uploadImageBtn: Boolean = false;
  fileData: File;
  progress: number;
  responseStatus: number;
  imgUpload: boolean = false;
  popupBtn: boolean = true;

  ngOnInit() {
    this.donarForm = new FormGroup({
      'fullName': new FormControl(null, [Validators.required]),
      // 'email': new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")], [checkEmailValidator(this.donarService)]),
      'phoneNumber': new FormControl(null, [Validators.required, Validators.pattern("^[0-9]{10}$")], [checkPhoneNumberValidator(this.donarService)]),
      'address': new FormControl(null, [Validators.required]),
      'zipCode': new FormControl(null, [Validators.required]),
      'city': new FormControl(null, [Validators.required]),
      'state': new FormControl(null, [Validators.required]),
      'country': new FormControl(null, [Validators.required]),
      'status': new FormControl(true)
    }, { updateOn: 'blur' });

    this.loadDetails();
  }

  cancelDonar(): void {
    this.donarForm.reset();
    this.router.navigate(['/DonorRecordsGrid']);
  }

  registerDonar(): void {
    if (this.id !== undefined && this.id !== null) {
      this.donarModel.setDonarId(this.id)
      var copy = Object.assign(this.donarModel, this.donarForm.value);
      this.donarService.updateDonar(copy).subscribe(
        response => {
          response.status === true ? alertFunctions.customtypeSuccess("Congratulations.!!", "Donar Update Successfully..!!") : null
          this.donarForm.reset(response.data);
        },
        error => {
          alertFunctions.custometypeError("Oops.!!", "Something went wrong..")
        });
    }
    else {
      this.donarService.registerDonar(this.donarForm.value).subscribe(
        response => {
          alertFunctions.customtypeSuccess("Congratulations.!!", "Donar Register Successfully..!!")
          this.donarForm.reset();
        },
        error => {
          alertFunctions.custometypeError("Oops.!!", "Something went wrong..")
        });
    }
  }

  loadDetails(): void {
    this.loaderComponentService.emitChange(true);
    this.route.params.subscribe(param => {
      this.flag = param['data'] == 'View' ? true : false;
      switch (param['data']) {
        case 'View':
          this.cancelButtonLabel = 'Back';
          this.donarForm.disable();
          this.imgUpload = true;
          this.popupBtn = false;
          break;
        case 'Edit':
          this.donarForm.get('phoneNumber').clearAsyncValidators();
          this.donarForm.get('phoneNumber').disable();
          this.cancelButtonLabel = 'Cancel';
          this.saveButtonLabel = 'Update';
          this.imgUpload = true;
          this.popupBtn = true;
          break;

        default:
          this.cancelButtonLabel = 'Cancel';
          this.saveButtonLabel = 'Save';
          this.imgUpload = false;
          this.loaderComponentService.emitChange(false);
          break;
      }
      this.id = param['id'];
      if (this.id !== undefined && this.id !== null) {
        this.donarService.getDonarsByIdAndStatus(this.id).subscribe(data => {
          this.userProfileRecieve = data;
          this.profileUrl = this.userProfileRecieve.profilePictureUrl;
          this.donarForm.patchValue(this.userProfileRecieve);
          this.loaderComponentService.emitChange(false);
        });
      }
    });
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
    this.donarService.uploadImage(formData, this.id).subscribe((event: any) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          break;
        case HttpEventType.Response:
          event.status === 200 ? this.responseStatus = event.status : alertFunctions.custometypeError("Oops.!!", "Something went wrong..!!")
          this.profileUrl = event.body.data.profilePictureUrl;
          break;
      }
    },
      (errorResp) => {
        if (errorResp.error.message.includes("Maximum upload size exceeded")) {
          alertFunctions.custometypeError("Oops.!!", "Image Size should be max 300KB");
        } else {
          alertFunctions.custometypeError("Oops.!!", "Something went wrong..!!")
        }
      });

    setTimeout(() => {
      this.progress = 0;
      if (this.responseStatus === 200) {
        alertFunctions.customtypeSuccess("Congratulations.!!", "Donor Image Upload Successfully..!!");
        this.modalService.dismissAll();
      }
    }, 1500);
  }

  get phoneNumber() { return this.donarForm.get('phoneNumber'); }


}
