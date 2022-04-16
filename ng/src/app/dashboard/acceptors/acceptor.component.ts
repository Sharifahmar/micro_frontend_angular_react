import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as alertFunctions from '../../shared/data/sweet-alerts';
import { checkPhoneNumberValidatorAcceptor } from '../helper/custom-validator/phoneNumber-async-validator-acceptor';
import { AcceptorModel } from '../helper/model/acceptor-model';
import { AcceptorService } from '../service/acceptor.service';
import { LoaderComponentService } from '../shared/behavior-subject-service/loader-component-interaction.service';

@Component({
  selector: 'app-acceptor',
  templateUrl: './acceptor.component.html',
  styleUrls: ['./acceptor.component.scss']
})
export class AcceptorComponent implements OnInit {

  constructor(private acceptorService: AcceptorService, private router: Router,
    private route: ActivatedRoute, private modalService: NgbModal, private loaderComponentService: LoaderComponentService) { }
  acceptorForm: FormGroup;
  cities = ['Amravati'];
  states = ['Maharashtra'];
  country = ['India'];
  value: String = 'Details';
  flag: Boolean = false;
  cancelButtonLabel: string = 'Cancel';
  saveButtonLabel: string = 'Save';
  userProfileRecieve: any = {};
  id: number;
  imgUpload: boolean = false;
  popupBtn: boolean = true;
  url: string | ArrayBuffer = '';
  uploadImageBtn: Boolean = false;
  fileData: File;
  progress: number;
  responseStatus: number;
  profileUrl = '';
  acceptorModel: AcceptorModel = new AcceptorModel();
  ngOnInit() {
    this.acceptorForm = new FormGroup({
      'fullName': new FormControl(null, [Validators.required]),
      //'email': new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")], [checkEmailValidatorAcceptor(this.acceptorService)]),
      'phoneNumber': new FormControl(null, [Validators.required, Validators.pattern("^[0-9]{10}$")], [checkPhoneNumberValidatorAcceptor(this.acceptorService)]),
      'address': new FormControl(null, [Validators.required]),
      'zipCode': new FormControl(null, [Validators.required]),
      'city': new FormControl(null, [Validators.required]),
      'state': new FormControl(null, [Validators.required]),
      'country': new FormControl(null, [Validators.required]),
      'status': new FormControl(true)
    });

    this.loadDetails();
  }

  cancelAcceptor(): void {
    this.acceptorForm.reset();
    this.router.navigate(['ng/AcceptorRecordsGrid']);
  }

  registerAcceptor(): void {
    if (this.id !== undefined && this.id !== null) {
      this.acceptorModel.setAcceptorId(this.id)
      var copy = Object.assign(this.acceptorModel, this.acceptorForm.value);
      this.acceptorService.updateAcceptor(copy).subscribe(
        response => {
          response.status === true ? alertFunctions.customtypeSuccess("Congratulations.!!", "Acceptor Update Successfully..!!") : null
          this.acceptorForm.reset(response.data);
        },
        error => {
          alertFunctions.custometypeError("Oops.!!", "Something went wrong..")
        });
    }
    else {
      this.acceptorService.registerAcceptor(this.acceptorForm.value).subscribe(
        response => {
          alertFunctions.customtypeSuccess("Congratulations.!!", "Acceptor Register Successfully..!!")
          this.acceptorForm.reset();
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
          this.acceptorForm.disable();
          this.imgUpload = true;
          this.popupBtn = false;
          break;
        case 'Edit':
          this.acceptorForm.get('phoneNumber').clearAsyncValidators();
          this.acceptorForm.get('phoneNumber').disable();
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
        this.acceptorService.getAcceptorsByIdAndStatus(this.id).subscribe(data => {
          this.userProfileRecieve = data._embedded.acceptorEntities[0];
          this.profileUrl = this.userProfileRecieve.profilePictureUrl;
          this.acceptorForm.patchValue(this.userProfileRecieve);
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
    this.acceptorService.uploadImage(formData, this.id).subscribe((event: any) => {
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

  get phoneNumber() { return this.acceptorForm.get('phoneNumber'); }


}
