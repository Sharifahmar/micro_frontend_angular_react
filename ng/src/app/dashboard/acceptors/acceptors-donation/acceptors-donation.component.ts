import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { DonationTypeService } from "../../service/donationType.service";
import * as alertFunctions from "../../shared/data/sweet-alerts";
import { AcceptorAmountService } from "../../service/acceptor-amount.service";

@Component({
  selector: "app-acceptors-donation",
  templateUrl: "./acceptors-donation.component.html",
})
export class AcceptorsDonationComponent implements OnInit {
  acceptorDonationForm: FormGroup;
  cancelButtonLabel: string = "";
  saveButtonLabel: string = "";
  donationTypes = [];
  flag: Boolean = false;
  id: number;
  constructor(
    private router: Router,
    private donationTypeSvc: DonationTypeService,
    private acceptorAmountService: AcceptorAmountService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.acceptorDonationForm = new FormGroup({
      tokenNumber: new FormControl("", [Validators.required]),
      fullName: new FormControl("", [Validators.required]),
      phoneNumber: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]{10}$"),
      ]),
      acceptorAmount: new FormControl("", [
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
    this.acceptorDonationForm.reset();
    this.router.navigate(["ng/AcceptorDonationRecordsGrid"]);
  }

  registerDonationAmount(): void {
    if (this.id !== undefined && this.id !== null) {
      const request = {
        acceptorAmountId: this.id,
        tokenNumber: this.acceptorDonationForm.get("tokenNumber").value,
        donationTypeId: this.acceptorDonationForm.get("donationTypeId").value,
        acceptorAmount: this.acceptorDonationForm.get("acceptorAmount").value,
        phoneNumber: this.acceptorDonationForm.get("phoneNumber").value,
      };

      this.acceptorAmountService.updateDonationAmount(request).subscribe(
        (response) => {
          if (response.status === true) {
            alertFunctions.customtypeSuccess(
              "Congratulations.!!",
              "Acceptor Donation Record Update Successfully..!!"
            );
            this.acceptorDonationForm.reset();
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
        acceptor: {
          phoneNumber: this.acceptorDonationForm.get("phoneNumber").value,
        },
        acceptorAmount: this.acceptorDonationForm.get("acceptorAmount").value,
        donationTypeModel: {
          donationTypeId: this.acceptorDonationForm.get("donationTypeId").value,
        },
        tokenNumber: this.acceptorDonationForm.get("tokenNumber").value,
      };

      this.acceptorAmountService.registerDonationAmount(request).subscribe(
        (response) => {
          if (response.status === true) {
            alertFunctions.customtypeSuccess(
              "Congratulations.!!",
              "Acceptor Donation Amount Added Successfully..!!"
            );
            this.acceptorDonationForm.reset();
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
          this.acceptorDonationForm.disable();
          break;
        case "Edit":
          this.acceptorDonationForm.get("phoneNumber").clearAsyncValidators();
          this.acceptorDonationForm.controls["phoneNumber"].disabled;
          this.cancelButtonLabel = "Cancel";
          this.saveButtonLabel = "Update";
          break;

        default:
          // this.acceptorDonationForm.removeControl("fullName");
          // this.acceptorDonationForm.removeControl("address");
          this.cancelButtonLabel = "Cancel";
          this.saveButtonLabel = "Save";
          break;
      }

      this.id = param["id"];
      if (this.id !== undefined && this.id !== null) {
        this.acceptorAmountService
          .getAcceptorDonationDetailsById(this.id)
          .subscribe((data) => {
            this.acceptorDonationForm.patchValue(data.data);
          });
      }
    });
  }


  get phoneNumber() {
    return this.acceptorDonationForm.get("phoneNumber");
  }
}
