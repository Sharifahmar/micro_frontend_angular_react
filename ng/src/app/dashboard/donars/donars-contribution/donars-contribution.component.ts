import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { DonationTypeService } from "../../service/donationType.service";
import * as alertFunctions from "../../shared/data/sweet-alerts";
import { DonationAmountService } from "../../service/donation-amount.service";

@Component({
  selector: "app-donars-contribution",
  templateUrl: "./donars-contribution.component.html",
  styleUrls: ["./donars-contribution.component.scss"],
})
export class DonarsContributionComponent implements OnInit {
  donarContributionForm: FormGroup;
  cancelButtonLabel: string = "";
  saveButtonLabel: string = "";
  donationTypes = [];
  flag: Boolean = false;
  id: number;
  constructor(
    private router: Router,
    private donationTypeSvc: DonationTypeService,
    private donationAmountService: DonationAmountService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.donarContributionForm = new FormGroup({
      receiptNumber: new FormControl("", [Validators.required]),
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
      ]),
      phoneNumber: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]{10}$"),
      ]),
      donationAmount: new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9]+(.[0-9][0-9]?)?"),
      ]),
      donationTypeId: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      status: new FormControl(true),
    });

    this.loadAllDonationType();
    this.loadDetails();
  }

  cancelDoContribution(): void {
    this.donarContributionForm.reset();
    this.router.navigate(["/DonarContributionRecordsGrid"]);
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
          phoneNumber: this.donarContributionForm.get("phoneNumber").value,
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
          break;
        case "Edit":
          this.donarContributionForm.get("email").clearAsyncValidators();
          this.donarContributionForm.get("phoneNumber").clearAsyncValidators();
          this.donarContributionForm.controls["phoneNumber"].disabled;
          this.donarContributionForm.controls["email"].disabled;
          this.cancelButtonLabel = "Cancel";
          this.saveButtonLabel = "Update";
          break;

        default:
          this.donarContributionForm.removeControl("firstName");
          this.donarContributionForm.removeControl("lastName");
          this.donarContributionForm.removeControl("address");
          this.donarContributionForm.removeControl("email");
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

  get email() {
    return this.donarContributionForm.get("email");
  }
  get phoneNumber() {
    return this.donarContributionForm.get("phoneNumber");
  }
}
