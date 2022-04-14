import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { DonationTypeService } from "../../service/donationType.service";
import * as alertFunctions from "../../shared/data/sweet-alerts";
import { DonationAmountService } from "../../service/donation-amount.service";
import { DonarService } from 'app/dashboard/service/donar.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: "app-donors-monthlycontribution",
  templateUrl: "./donors-monthly-contribution.component.html",
  styleUrls: ["./donors-monthly-contribution.component.scss"],
})
export class DonarsMonthlyContributionComponent implements OnInit {
  donarContributionForm: FormGroup;
  cancelButtonLabel: string = "";
  saveButtonLabel: string = "";
  donationTypes = [];
  donarDetails = [];
  fullNameArr = [];
  flag: boolean = false;
  viewForm: boolean = false;
  id: number;
  disableSubmitBtn : boolean = false;
  constructor(
    private router: Router,
    private donationTypeSvc: DonationTypeService,
    private donationAmountService: DonationAmountService,
    private route: ActivatedRoute,
    private donarSerivce: DonarService
  ) { }

  ngOnInit() {
    this.donarContributionForm = new FormGroup({
      receiptNumber: new FormControl("", [Validators.required]),
      fullName: new FormControl("", [Validators.required]),
      phoneNumber: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]{10}$"),
      ]),
      donationAmount: new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9]+(.[0-9][0-9]?)?"),
      ]),
      donationTypeId: new FormControl("", [Validators.required]),
      status: new FormControl(true),
    });

    this.loadAllDonationType();
    this.loadDetails();
    this.loadAllDonars();
  }

  cancelDoContribution(): void {
    this.donarContributionForm.reset();
    this.router.navigate(["ng/MonthlyDonorContributionRecordsGrid"]);
  }

  registerDonationAmount(): void {
    if (this.id !== undefined && this.id !== null) {
      const request = {
        donationAmountId: this.id,
        receiptNumber: this.donarContributionForm.get("receiptNumber").value,
        donationTypeId: this.donarContributionForm.get("donationTypeId").value,
        donationAmount: this.donarContributionForm.get("donationAmount").value,
        phoneNumber: this.donarContributionForm.get("phoneNumber").value,
      };

      this.donationAmountService.updateDonationAmount(request).subscribe(
        (response) => {
          if (response.status === true) {
            alertFunctions.customtypeSuccess(
              "Congratulations.!!",
              "Donation Contribution Record Update Successfully..!!"
            );
            this.donarContributionForm.reset();
          } else {
            alertFunctions.custometypeError(response.message);
          }
        },
        (error) => {
          alertFunctions.custometypeError("Oops.!!", error.error.message);
        }
      );
    } else {
      const request = {
        donars: {
          fullName: this.donarContributionForm.get("fullName").value,
        },
        donationAmount: this.donarContributionForm.get("donationAmount").value,
        receiptNumber: this.donarContributionForm.get("receiptNumber").value,
        donationTypeModel: {
          donationTypeId: this.donarContributionForm.get("donationTypeId")
            .value,
        },
      };

      this.donationAmountService.registerDonationAmount(request).subscribe(
        (response) => {
          if (response.status === true) {
            alertFunctions.customtypeSuccess(
              "Congratulations.!!",
              "Donation Amount Added Successfully..!!"
            );
            this.donarContributionForm.reset();
          } else {
            alertFunctions.custometypeError(response.message);
          }
        },
        (error) => {
          alertFunctions.custometypeError("Oops.!!", error.error.message);
        }
      );
    }
  }

  loadAllDonationType(): void {
    this.donationTypeSvc.getAllDonartionType().subscribe(
      (response) => {
        this.donationTypes = response._embedded.donationTypeEntities;
      },

      (error) => {
        alertFunctions.custometypeError("Oops.!!", "Something went wrong..");
      }
    );
  }

  loadDetails(): void {
    this.route.params.subscribe((param) => {
      this.flag = param["data"] == "View" ? true : false;
      switch (param["data"]) {
        case "View":
          this.cancelButtonLabel = "Back";
          this.donarContributionForm.disable();
          this.viewForm = true;
          break;
        case "Edit":
          this.donarContributionForm.get("phoneNumber").disable();
          this.donarContributionForm.get("fullName").disable();
          this.cancelButtonLabel = "Cancel";
          this.saveButtonLabel = "Update";
          this.viewForm = true;
          break;

        default:
          this.donarContributionForm.removeControl("phoneNumber");
          this.cancelButtonLabel = "Cancel";
          this.saveButtonLabel = "Save";
          break;
      }

      this.id = param["id"];
      if (this.id !== undefined && this.id !== null) {
        this.donationAmountService
          .getDonarsContributionDetailsById(this.id)
          .subscribe((data) => {
            this.donarContributionForm.patchValue(data.data);
          });
      }
    });
  }

  loadAllDonars(): void {
    this.donarSerivce.getAllDonars().subscribe(
      (response) => {
        this.donarDetails = response._embedded.donarsEntities;
        this.fullNameArr = this.donarDetails.map(item => item.fullName);
      },

      (error) => {
        alertFunctions.custometypeError("Oops.!!", "Something went wrong..");
      }
    );
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

  get phoneNumber() {
    return this.donarContributionForm.get("phoneNumber");
  }

  getSelectedItem(value:string):void{
    if(!this.fullNameArr.includes(value)){
      this.donarContributionForm.get("fullName").setErrors({incorrect:true});
    }
  }

}
